export interface ApiResponse<T> {
  value: T;
  isSuccess: boolean;
  errors: string[];
  message: string;
}

export interface CaptchaValue {
  img: string;
  cpCode: string;
}

export interface EtkalaUser {
  id: number;
  name: string;
  username: string;
  type: number;
  superMarketStoreId: number;
  superMarketStoreTitle: string;
  applianceStoreId: number;
  applianceStoreTitle: string;
  passwordIsChanged: boolean;
}

export interface AuthToken {
  token: string;
  expireDate: string;
  expireDateFa: string;
}

export interface AuthValue {
  user: EtkalaUser;
  accessToken: AuthToken;
  refreshToken: AuthToken;
}
