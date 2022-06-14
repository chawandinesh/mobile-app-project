import Layout from '../components/layout/layout';
import { LinkWithTranslation } from '../components/translation/LinkWithTranslation';

/**
 * dummy page for linking at the moment
 * @returns {JSX.Element}
 * @constructor
 */
export default function ContactForm() {
  return (
    <Layout title={'mainHeadingContactForm'} h1={'mainHeadingContactForm'}>
      <LinkWithTranslation href="/" strProp="home" />
    </Layout>
  );
}
