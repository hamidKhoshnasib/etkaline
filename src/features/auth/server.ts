// ورودی مخصوص سرور؛ هرگز از کامپوننت Client یا Pages Router import نشود.
export { auth, handlers, signIn, signOut } from "./lib/auth";
export { requestEtkalaAuth, refreshAuthTokens, verifyCode } from "./api/etkala-auth-server";
