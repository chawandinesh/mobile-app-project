/* eslint-disable */
import PropTypes from 'prop-types';
import { Input } from '../formElements/input';
import { Select } from '../formElements/select';
import { ButtonWithSvg } from '../buttons';
import { T, STR } from '../translation/index';
import { useEffect, useState, Fragment } from 'react';
import { buyNowFormMappings } from './buyNowMappings';
import { hasAndGet } from '../../utils/utils';
import { PostCodeLookUp } from './postCodeLookUp';

// needs an abbr in the first dt but can't find a way to just get
// a string from react at the moment
const BuyNowInner = ({ hasError, buyNowData }) => {
  // need to add some values to the mappings
  const [formData, setFormData] = useState(null);
  const [knowAddresses, setKnownAddress] = useState([]);

  // massage the data a little
  useEffect(() => {
    if (!hasError && buyNowData) {
      if (buyNowData?.accountAddress?.contactName) {
        buyNowFormMappings.contact.value =
          buyNowData.accountAddress.contactName;
      }

      let knownAddressesArray = ['accountAddress', 'deliveryAddress'].reduce(
        (acc, key) => {
          const address = hasAndGet(buyNowData, key);
          if (address) {
            const { postCode, street, town } = address;
            acc.push({ text: `${street}, ${town}, ${postCode}`, value: key });
            return acc;
          }
        },
        []
      );

      setKnownAddress(knownAddressesArray);

      setFormData(buyNowFormMappings);
    }
  }, [buyNowData, buyNowFormMappings]);

  if (hasError) {
    return (
      <p className="text-error">
        <T strProp="buyNowError" />
      </p>
    );
  }

  const abbrTitle = STR('buyNowReferenceId');

  return formData ? (
    <div className="buy-now">
      <div className="card card--white">
        <h2 className="heading-alt heading-alt__icon">
          <svg className="svg-product-buynow buy-now__icon">
            <use href="#svg-product-buynow" />
          </svg>
          <span className="heading-alt__text">
            <T strProp="buyNowOrderDetails" />
          </span>
        </h2>
        <dl className="buy-now__dl">
          <dt className="buy-now__dt">
            <abbr title={abbrTitle}>
              <T strProp="buyNowReferenceIdShort" />
            </abbr>
          </dt>
          <dd className="buy-now__dd">{buyNowData.reference}</dd>
          <dt className="buy-now__dt">
            <T strProp="buyNowType" />
          </dt>
          <dd className="buy-now__dd">{buyNowData.description}</dd>
        </dl>

        <form id="buyNowForm">
          <fieldset>
            <legend className="buy-now__legend">
              <T strProp="buyNowMoreInfo" />
            </legend>
            {Reflect.ownKeys(formData).map((key, i) => {
              const curr = formData[key];
              const { type } = curr;
              const Comp = type === 'text' ? Input : Select;
              return (
                <Fragment key={curr.labelStrProp}>
                  <Comp {...curr} />
                </Fragment>
              );
            })}
          </fieldset>
          <PostCodeLookUp knownAddressArray={knowAddresses} />
        </form>
      </div>
      <div className="buy-now__buttons">
        <ButtonWithSvg
          form="buyNowForm"
          strProp="confirmOrder"
          type="submit"
          svgClasses={['svg-product-basket', 'svg__button']}
          svgHref="svg-product-basket"
        />
      </div>
    </div>
  ) : null;
};

BuyNowInner.propTypes = {
  hasError: PropTypes.bool.isRequired,
  buyNowData: PropTypes.object
};

export { BuyNowInner };
