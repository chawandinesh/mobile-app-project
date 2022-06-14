
const AppConfig =() => {
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const b2cClientId = process.env.REACT_APP_AZURE_B2C_CLIENTID;
  const currentEnvironment = process.env.NODE_ENV;
  const signUpSignInAuthority = process.env.REACT_APP_B2C_SIGNUP_SIGNIN_AUTHORITY_BASE;
  const forgotPasswordAuthority = process.env.REACT_APP_B2C_FORGOT_PASSWORD_AUTHORITY;
  const loginScopes = process.env.REACT_APP_B2C_LOGIN_SCOPES
  const authorityDomain = process.env.REACT_APP_B2C_AUTHORITY_DOMAIN;
  const authAppUrl = process.env.REACT_APP_AUTH_APP_URL;

  return {
    ApiBaseUrl: apiBaseUrl,
    AzureB2cClientId: b2cClientId,
    CurrentEnvironment: currentEnvironment,
    B2cConfig: () => ({
      SignUpSignInAuthority: signUpSignInAuthority,
      ForgotPasswordAuthority: forgotPasswordAuthority,
      LoginScopes: loginScopes,
      AuthorityDomain: authorityDomain,
      AuthAppUrl: authAppUrl
    }),
    GetApiUrl:(url) => apiBaseUrl + url,
    IsDevelopment: ()=> currentEnvironment === "development",
    IsProduction: ()=> currentEnvironment === "production",
    CurrentUser: (accounts) => ({
      first_name: accounts[0].idTokenClaims?.given_name,
      last_name: accounts[0].idTokenClaims?.family_name,
      email: accounts[0].username
    })
  };
}
export default AppConfig;