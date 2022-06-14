import { useEffect } from 'react';
import Layout from './components/layout/layout';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from './config/authConfig';
import AppConfig from './config/appConfig';

function Login() {
  const { instance } = useMsal();
  let b2cConfig = AppConfig().B2cConfig();

  useEffect(() => {
    localStorage.removeItem('userflow');
    const queryStringHasLoginHint =
      window.location.search.indexOf('login_hint=') !== -1;
    const queryStringHasUserFlow =
      window.location.search.indexOf('userflow=') !== -1;
    let userFlow = '';
    let loginHint = '';
    if (queryStringHasLoginHint === false && queryStringHasUserFlow === false) {
      // redirect to auth app
      window.location.replace(b2cConfig.AuthAppUrl);
    } else {
      const queryStringAsArray = window.location.search
        .substring(1)
        .split('&')
        .map((keyValueStr) => keyValueStr.split('='))
        .filter((x) => x.length === 2);
      if (queryStringHasLoginHint === true) {
        loginHint = queryStringAsArray.find(
          (keyValueArray) => keyValueArray[0] == 'login_hint'
        )[1];
      } else {
        console.warn('No login hint');
      }
      if (queryStringHasUserFlow === true) {
        userFlow = queryStringAsArray.find(
          (keyValueArray) => keyValueArray[0] == 'userflow'
        )[1];
        if (userFlow === 'email' || userFlow === 'username') {
          localStorage.setItem('userflow', userFlow);
          instance.config.auth.authority = `${b2cConfig.SignUpSignInAuthority}${userFlow}`;
          // redirect to b2C
          instance
            .loginRedirect({ ...loginRequest, loginHint })
            .catch((error) => console.error(error));
        } else {
          console.error('Invalid user flow');
        }
      } else {
        console.error('No user flow');
      }
    }
  }, [instance, loginRequest]);

  return (
    <Layout title="segenWholeSale" h1="segenWholeSale" isHiddenHeading={true}>
      <div style={{ padding: '20px 0' }}>Please wait...</div>
    </Layout>
  );
}

export default Login;
