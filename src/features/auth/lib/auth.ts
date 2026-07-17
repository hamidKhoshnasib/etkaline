import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { refreshAuthTokens, verifyCode } from "@/features/auth/api/etkala-auth-server";

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
          superMarketStoreTitle: user.superMarketStoreTitle,
          applianceStoreTitle: user.applianceStoreTitle,
          passwordIsChanged: user.passwordIsChanged,
          accessToken,
          refreshToken,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.backendId = user.backendId;
        token.username = user.username;
        token.type = user.type;
        token.superMarketStoreTitle = user.superMarketStoreTitle;
        token.applianceStoreTitle = user.applianceStoreTitle;
        token.passwordIsChanged = user.passwordIsChanged;
        token.accessToken = user.accessToken.token;
        token.refreshToken = user.refreshToken.token;
        token.accessTokenExpires = new Date(user.accessToken.expireDate).getTime();
        token.error = undefined;
        return token;
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
          superMarketStoreTitle: refreshedUser.superMarketStoreTitle,
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
      session.user.superMarketStoreTitle = token.superMarketStoreTitle ?? "";
      session.user.applianceStoreTitle = token.applianceStoreTitle ?? "";
      session.user.passwordIsChanged = token.passwordIsChanged ?? false;
      session.accessToken = token.accessToken;
      session.error = token.error;
      return session;
    },
  },
  session: { strategy: "jwt" },
});
