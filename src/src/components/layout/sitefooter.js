import { LinkWithTranslation } from '../translation/LinkWithTranslation';

const SiteFooter = () => {
  return (
    <footer className="footer-main">
      <LinkWithTranslation
        href="/Home/PrivacyPolicy"
        strProp="privacyPolicy"
        cssClasses="footer-link"
      />
      <LinkWithTranslation
        href="/Reseller/Documents/Page?type=Personal%20Data"
        strProp="personalDataAmend"
        cssClasses="footer-link"
      />
    </footer>
  );
};

export default SiteFooter;
