import PropTypes from 'prop-types';
import { T } from '../translation';
import { hasAndGet } from '../../utils/utils';
import { Details } from '../generic/details';
import { Documents } from './additionalInfoItems/documents';
import { Availability } from './additionalInfoItems/availability';
import { Specifications } from './additionalInfoItems/specifications';
import { RelatedParts } from './additionalInfoItems/relatedParts';

// the keys map to the props in product data ie specification
const additionalInfoMappings = {
  productSpecifications: {
    strPropTitle: 'specification',
    component: Specifications,
    checkData: (data) => Array.isArray(data) && data.length > 0
  },
  alternates: {
    strPropTitle: 'alternates',
    component: RelatedParts,
    checkData: (data) => Array.isArray(data) && data.length > 0
  },
  // not from the response but added via a stockStatus.js call
  availability: {
    strPropTitle: 'availability',
    component: Availability,
    checkData: (x) => x
  },
  productDocuments: {
    strPropTitle: 'documents',
    component: Documents,
    checkData: (data) => Array.isArray(data) && data.length > 0
  }
};

const additionalInfoEntries = Object.entries(additionalInfoMappings);

const AdditionalInfo = ({ productData }) => {
  return (
    <div className="card additional__card">
      {additionalInfoEntries.map((arr) => {
        const { strPropTitle, component, checkData } = arr[1];
        // has the prop
        const additionalData = hasAndGet(productData, arr[0]);
        const hasCorrectData = additionalData && checkData(additionalData);

        //to do make the details re-useable
        return (

          <Details
            strProp={`additionalInfoTitle${strPropTitle}`}
            key={strPropTitle}
          >
            <div className="additionalInfo__text additionalInfo__bg">
              {hasCorrectData ? (
                component({ additionalData, productData })
              ) : (
                <p className="additionalInfo__text additionalInfo__text-error">
                  <T strProp={`additionalInfoNoData${strPropTitle}`} />
                </p>
              )}
            </div>
          </Details>
        );
      })}
    </div>
  );
};

AdditionalInfo.propTypes = {
  productData: PropTypes.object
};

export { AdditionalInfo };

/**
 *       <details className="additionalInfo">
 <summary className="additionalInfo__summary">
 <T strProp="specification" />
 </summary>
 <div className="additionalInfo__text">
 <p>
 If you have any technical queries about this product or wish to
 report any issues with the information on this page then please use
 the <Link to="/contactform">Contact Form</Link> to contact us.
 </p>
 <dl className="additionalInfo__dl">
 <dt className="additionalInfo__dt">Supplier Part No:</dt>
 <dd className="additionalInfo__dd">JK01B</dd>
 <dt className="additionalInfo__dt">Weight:</dt>
 <dd className="additionalInfo__dd">0.021 kg</dd>
 </dl>
 </div>
 </details>
 <details className="specification">
 <summary className="additionalInfo__summary">
 <T strProp="documents" />
 </summary>
 <div className="additionalInfo__text">
 <ul className="additionalInfo__list">
 <li>
 <a href="#">Brochure Hager JK01B</a>
 </li>
 <li>
 <a href="#">Data Sheet Hager JK01B</a>
 </li>
 </ul>
 </div>
 </details>
 */
