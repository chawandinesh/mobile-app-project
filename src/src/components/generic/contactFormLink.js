import { Link } from 'react-router-dom';

const ContactFormLink = ({ children, cssClass, cssLinkClass }) => {
  return (
    <span className={cssClass}>
      <Link className={cssLinkClass} to="/contactform">
        {children}
      </Link>
    </span>
  );
};

export { ContactFormLink };
