import { useEffect, useState } from 'react';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../config/authConfig';
import AppConfig from '../config/appConfig';

const useSessionHook = () => {
  const { instance, accounts } = useMsal();
  let b2cConfig = AppConfig().B2cConfig();
  const requestAccessToken = async (account) => {
    const request = {
      ...loginRequest,
      account
    };
    const userflow = localStorage.getItem('userflow');
    instance.config.auth.authority = `${b2cConfig.SignUpSignInAuthority}${userflow}`;
    var authResult = await instance.acquireTokenSilent(request);
    return authResult.accessToken;
  };
  const [authStatus, setAuthStatus] = useState({
    token: null,
    status: 'unauthenticated'
  });

  useEffect(async () => {
    const token = await requestAccessToken(accounts[0]);
    setAuthStatus({
      token,
      status: 'authenticated'
    });
  }, []);

  return {
    getStatusAndToken: () => authStatus
  };
};

export { useSessionHook };
