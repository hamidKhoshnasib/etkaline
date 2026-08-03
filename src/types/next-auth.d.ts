import type { DefaultSession } from "next-auth";
import type { AuthToken } from "@/types/auth";
import type { SiteType } from "@/lib/api-site-type";

interface SessionUserFields {
  backendId: number;
  username: string;
  type: number;
  superMarketStoreId: number;
  superMarketStoreTitle: string;
  applianceStoreId: number;
  applianceStoreTitle: string;
  passwordIsChanged: boolean;
}

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    error?: "RefreshTokenError";
    user: DefaultSession["user"] & SessionUserFields;
  }

  interface User extends SessionUserFields {
    accessToken: AuthToken;
    refreshToken: AuthToken;
    siteType: SiteType;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    backendId?: number;
    username?: string;
    type?: number;
    superMarketStoreId?: number;
    superMarketStoreTitle?: string;
    applianceStoreId?: number;
    applianceStoreTitle?: string;
    passwordIsChanged?: boolean;
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
    error?: "RefreshTokenError";
    siteType?: SiteType;
  }
}
