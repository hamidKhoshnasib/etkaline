import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type { JWT } from "@auth/core/jwt";

import { refreshAuthTokens, verifyCode } from "@/features/auth/api/etkala-auth-server";

interface SessionAddressUpdate {
  accessToken?: unknown;
  user?: unknown;
}

function getString(value: unknown) {
  return typeof value === "string" ? value : "";
}

function getNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function applyAddressUpdate(token: JWT, session: unknown) {
  if (!session || typeof session !== "object") {
    return token;
  }

  const update = session as SessionAddressUpdate;
  const user = update.user;
  const accessToken = update.accessToken;

  if (!user || typeof user !== "object" || !accessToken || typeof accessToken !== "object") {
    return token;
  }

  const nextUser = user as Record<string, unknown>;
  const nextAccessToken = accessToken as Record<string, unknown>;
  const accessTokenValue = getString(nextAccessToken.token);
  const expireDate = getString(nextAccessToken.expireDate);
  const expiresAt = new Date(expireDate).getTime();

  if (!accessTokenValue || !Number.isFinite(expiresAt)) {
    return token;
  }

  token.backendId = getNumber(nextUser.id);
  token.name = getString(nextUser.name) || getString(nextUser.username);
  token.username = getString(nextUser.username);
  token.type = getNumber(nextUser.type);
  token.superMarketStoreId = getNumber(nextUser.superMarketStoreId);
  token.superMarketStoreTitle = getString(nextUser.superMarketStoreTitle);
  token.applianceStoreId = getNumber(nextUser.applianceStoreId);
  token.applianceStoreTitle = getString(nextUser.applianceStoreTitle);
  token.passwordIsChanged = nextUser.passwordIsChanged === true;
  token.accessToken = accessTokenValue;
  token.accessTokenExpires = expiresAt;
  token.error = undefined;
  return token;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret:
    process.env.AUTH_SECRET ??
    (process.env.NODE_ENV === "development" ? "etkaline-local-development-secret" : undefined),
  providers: [
    Credentials({
      credentials: {
        mobile: { label: "شماره موبایل", type: "tel" },
        code: { label: "کد تأیید", type: "text" },
      },
      async authorize(credentials) {
        const mobile = typeof credentials.mobile === "string" ? credentials.mobile : "";
        const code = typeof credentials.code === "string" ? credentials.code : "";

        if (!mobile || !code) {
          return null;
        }

        const response = await verifyCode(mobile, code);
        if (!response.isSuccess || !response.value) {
          return null;
        }

        const { user, accessToken, refreshToken } = response.value;

        return {
          id: String(user.id),
          backendId: user.id,
          name: user.name || user.username,
          username: user.username,
          type: user.type,
          superMarketStoreId: user.superMarketStoreId,
          superMarketStoreTitle: user.superMarketStoreTitle,
          applianceStoreId: user.applianceStoreId,
          applianceStoreTitle: user.applianceStoreTitle,
          passwordIsChanged: user.passwordIsChanged,
          accessToken,
          refreshToken,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.backendId = user.backendId;
        token.username = user.username;
        token.type = user.type;
        token.superMarketStoreId = user.superMarketStoreId;
        token.superMarketStoreTitle = user.superMarketStoreTitle;
        token.applianceStoreId = user.applianceStoreId;
        token.applianceStoreTitle = user.applianceStoreTitle;
        token.passwordIsChanged = user.passwordIsChanged;
        token.accessToken = user.accessToken.token;
        token.refreshToken = user.refreshToken.token;
        token.accessTokenExpires = new Date(user.accessToken.expireDate).getTime();
        token.error = undefined;
        return token;
      }

      if (trigger === "update") {
        return applyAddressUpdate(token, session);
      }

      if (token.accessTokenExpires && Date.now() < token.accessTokenExpires - 30_000) {
        return token;
      }

      if (token.error === "RefreshTokenError") {
        return token;
      }

      if (!token.accessToken || !token.refreshToken) {
        return token;
      }

      try {
        const response = await refreshAuthTokens(token.accessToken, token.refreshToken);
        if (!response.isSuccess || !response.value) {
          throw new Error(response.message);
        }

        const { user: refreshedUser, accessToken, refreshToken } = response.value;
        return {
          ...token,
          backendId: refreshedUser.id,
          name: refreshedUser.name || refreshedUser.username,
          username: refreshedUser.username,
          type: refreshedUser.type,
          superMarketStoreId: refreshedUser.superMarketStoreId,
          superMarketStoreTitle: refreshedUser.superMarketStoreTitle,
          applianceStoreId: refreshedUser.applianceStoreId,
          applianceStoreTitle: refreshedUser.applianceStoreTitle,
          passwordIsChanged: refreshedUser.passwordIsChanged,
          accessToken: accessToken.token,
          refreshToken: refreshToken.token,
          accessTokenExpires: new Date(accessToken.expireDate).getTime(),
          error: undefined,
        };
      } catch {
        return { ...token, error: "RefreshTokenError" as const };
      }
    },
    session({ session, token }) {
      session.user.id = String(token.sub ?? token.backendId);
      session.user.backendId = token.backendId ?? 0;
      session.user.username = token.username ?? "";
      session.user.type = token.type ?? 0;
      session.user.superMarketStoreId = token.superMarketStoreId ?? 0;
      session.user.superMarketStoreTitle = token.superMarketStoreTitle ?? "";
      session.user.applianceStoreId = token.applianceStoreId ?? 0;
      session.user.applianceStoreTitle = token.applianceStoreTitle ?? "";
      session.user.passwordIsChanged = token.passwordIsChanged ?? false;
      session.accessToken = token.accessToken;
      session.error = token.error;
      return session;
    },
  },
  session: { strategy: "jwt" },
});
