import React from 'react';
import ReactDOM from 'react-dom';
import { useReducer } from 'react';
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate
} from '@azure/msal-react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { GlobalContext } from './contexts/globalContext';
import { Il8Context, createContextValue } from './contexts/i18context';
import { globalReducer, initialGlobalState } from './hooks/globalReducer';
import { PageRoutes } from './pageRoutes';
import reportWebVitals from './reportWebVitals';
import { msalConfig } from './config/authConfig';
import './index.css';

export const msalInstance = new PublicClientApplication(msalConfig);

const RouterAndContext = () => {
  const [state, dispatch] = useReducer(globalReducer, initialGlobalState);
  // to show a different language put one of the language packs values in
  // createContextValue eg 'en-ZA or 'ar-AE'
  const i18Value = createContextValue();

  return (
    <HelmetProvider>
      <Il8Context.Provider value={i18Value}>
        <GlobalContext.Provider value={{ state, dispatch }}>
          <BrowserRouter>
            <AuthenticatedTemplate>
              <PageRoutes loggedIn={true} />
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
              <PageRoutes loggedIn={false} />
            </UnauthenticatedTemplate>
          </BrowserRouter>
        </GlobalContext.Provider>
      </Il8Context.Provider>
    </HelmetProvider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <RouterAndContext />
    </MsalProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
