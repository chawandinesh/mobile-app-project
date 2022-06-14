import Layout from '../components/layout/public/layout';
import { T } from '../components/translation';

function Welcome() {
  function signIn() {
    window.location.href = 'https://snap-auth-app-dev-as.azurewebsites.net/';
  }

  return (
    <Layout
      title="segenSolarPortal"
      h1="segenSolarPortal"
      isHiddenHeading={false}
      pageClassName="welcome"
    >
      <div className="welcome">
        <button className="welcome__sign welcome__sign--up btn">
          <T strProp="signUp" />
        </button>
        <button
          className="welcome__sign welcome__sign--in btn btn--alt"
          onClick={signIn}
        >
          <T strProp="signIn" />
        </button>
        <img className="welcome__main-image" src="/segen-welcome.png" />
        <p className="welcome__title">
          <T strProp="segenSolarPortal" />
        </p>
        <p className="welcome__intro">
          <T strProp="welcomeIntro" />
        </p>
        <ul className="welcome__offering">
          <li>
            <T strProp="welcomeOffering1" />
          </li>
          <li>
            <T strProp="welcomeOffering2" />
          </li>
          <li>
            <T strProp="welcomeOffering3" />
          </li>
          <li>
            <T strProp="welcomeOffering4" />
          </li>
          <li>
            <T strProp="welcomeOffering5" />
          </li>
          <li>
            <T strProp="welcomeOffering6" />
          </li>
        </ul>
        <p className="welcome__info">
          <T strProp="welcomeInfo" />
        </p>
      </div>
    </Layout>
  );
}

export default Welcome;
