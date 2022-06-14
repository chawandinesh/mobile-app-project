import { T, STR } from './translation';
import { DateStr } from './generic/dateStr';
import { basketAndQuoteActionTypes } from '../reducers/basketAndQuoteReducer';
import { QuoteOrBasketItem } from './basket/quoteOrBasketItem';
import { createPriceFromValue } from '../utils/i18utils';
import { ButtonWithSvg, Button } from './buttons';
import { DeleteQuoteOrBasket } from './basket/deleteQuoteOrBasket';
import { RemoveItemModal } from './basket/removeItemModal';
import { Link } from 'react-router-dom';

const QuoteOrBasketInner = ({ dispatch, state }) => {
  const { quote, organisationOpen, modalOpen, removeModalOpen } = state;

  return (
    <div className="quote">
      <div className="quote__reference card card--white">
        <dl>
          <dt>
            <abbr title={<STR strProp="quotereference" />}>
              <T strProp="quotereferenceShort" />
            </abbr>
          </dt>
          <dd>{quote.reference}</dd>
        </dl>
      </div>
      <div className="quote__organisation card card--white">
        <h2 className="heading-alt">
          <T strProp="quoteorganisationDetails" />
        </h2>
        <dl>
          <div>
            <dt>
              <T strProp="quoteaccountCode" />
            </dt>
            <dd>{quote.tasCode}</dd>
          </div>
          <div>
            <dt>
              <T strProp="quoteorganisation" />
            </dt>
            <dd>{quote.account}</dd>
          </div>
          <div>
            <dt>
              <T strProp="quoteaddress" />
            </dt>
            <dd>
              {quote.accountAddress?.contactName || null}
              <address>
                {`
                      ${quote.accountAddress?.street}, 
                      ${quote.accountAddress?.town}, 
                      ${quote.accountAddress?.postCode}, 
                      ${quote.accountAddress?.country}
                    `}
              </address>
            </dd>
          </div>
          {!organisationOpen || (
            <>
              <div>
                <dt>
                  <T strProp="quotetype" />
                </dt>
                <dd>(Type Value)</dd>
              </div>
              <div>
                <dt>
                  <T strProp="quoteprospectStatus" />
                </dt>
                <dd>(Prospect Status Value)</dd>
              </div>
              <div>
                <dt>
                  <T strProp="quotestockLocation" />
                </dt>
                <dd>(Stock Location Value)</dd>
              </div>
              <div>
                <dt>
                  <T strProp="quotedescription" />
                </dt>
                <dd>(Description Value)</dd>
              </div>
              <div>
                <dt>
                  <T strProp="quotecreatedDate" />
                </dt>
                <dd>
                  {quote.createdDate && (
                    <DateStr timestamp={quote.createdDate} />
                  )}
                </dd>
              </div>
              <div>
                <dt>
                  <T strProp="quotepaymentTerms" />
                </dt>
                <dd>(Payment Terms Value)</dd>
              </div>
            </>
          )}
        </dl>
        <button
          className={`btn btn--view-more${organisationOpen ? ' open' : ''}`}
          onClick={() =>
            dispatch({
              type: basketAndQuoteActionTypes.setOrganisationOpen
            })
          }
        >
          <span>{organisationOpen ? 'View Less' : 'View More'}</span>
        </button>
      </div>
      <div className="quote__delivery-address card card--white">
        <h2 className="heading-alt">
          <T strProp="quotedeliveryAddress" />
        </h2>
        <dl>
          <dt>{quote.deliveryAddress?.contactName}</dt>
          <dd>
            <address>
              {`
                      ${quote.deliveryAddress?.street}, 
                      ${quote.deliveryAddress?.town}, 
                      ${quote.deliveryAddress?.postCode}, 
                      ${quote.deliveryAddress?.country}
                    `}
            </address>
          </dd>
        </dl>
      </div>
      <div className="quote__details card card--white">
        <h2 className="heading-alt">
          <T strProp="quotequoteDetails" />
        </h2>
        <dl>
          {quote.purchaseOrder && (
            <div>
              <dt>
                <T strProp="quotecustomerPO" />
              </dt>
              <dd>{quote.purchaseOrder}</dd>
            </div>
          )}
          <div>
            <dt>
              <T strProp="quotedeliveryPreference" />
            </dt>
            <dd>(Delivery Preference Value)</dd>
          </div>
          <div>
            <dt>
              <T strProp="quotedispatchDate" />
            </dt>
            <dd>(Dispatch Date Value)</dd>
          </div>
          {quote.description && (
            <div>
              <dt>
                <T strProp="quotedescription" />
              </dt>
              <dd>{quote.description}</dd>
            </div>
          )}
        </dl>
      </div>
      <div className="quote__items card card--white">
        <h2 className="heading-alt">
          <T strProp="quoteitems" />
        </h2>
        <ol>
          {quote.items.map((item, i) => (
            <li key={`${quote.items.reference}-${item.productCode}`}>
              <QuoteOrBasketItem
                item={item}
                quote={quote}
                i={i}
                dispatch={dispatch}
                modalOpen={modalOpen || removeModalOpen}
              />
            </li>
          ))}
        </ol>
      </div>
      <Link to="/quickadd" className="quote__add-item">
        <T strProp="quoteaddItem" />
      </Link>
      <div className="quote__total-price card card--white">
        <table>
          <tbody>
            <tr>
              <th scope="row">
                <T strProp="quotetotalPrice" />
              </th>
              <td>
                {createPriceFromValue(
                  quote.totalsResponse?.netPrice.amount,
                  quote.totalsResponse?.netPrice.currency
                )}
              </td>
            </tr>
            <tr>
              <th scope="row">
                <T strProp="quotetotalPricePerWP" />
              </th>
              <td>(Per WP Value)</td>
            </tr>
            <tr>
              <th scope="row">
                <T strProp="quoteVAT" /> {quote.totalsResponse?.tax.percentage}%
              </th>
              <td>
                {createPriceFromValue(
                  quote.totalsResponse?.tax.value,
                  quote.totalsResponse?.grossTotal.currency
                )}
              </td>
            </tr>
            <tr className="gross-total">
              <th scope="row">
                <T strProp="quotegrossTotal" />
              </th>
              <td>
                {createPriceFromValue(
                  quote.totalsResponse?.grossTotal.amount,
                  quote.totalsResponse?.grossTotal.currency
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="quote__payment-terms card card--white">
        <h2 className="heading-alt">
          <T strProp="quotepaymentTerms" />
        </h2>
        <p>
          <T strProp="quotepaymentTermsValue" />
        </p>
      </div>
      <div className="quote__terms-and-conditions card card--white">
        <h2 className="heading-alt">
          <T strProp="quotetermsAndConditions" />
        </h2>
        <p>
          <T strProp="quotetermsAndConditionsValue" />
        </p>
      </div>
      <div className="quote__actions">
        <ButtonWithSvg
          form="add-product-form"
          strProp="quotesubmitOrder"
          type="submit"
          svgClasses={['svg-product-basket', 'svg__button']}
          svgHref="svg-product-basket"
        />
        <Button
          strProp="quotedeleteQuote"
          cssClasses={[
            'quote__action',
            'quote__action--delete',
            'btn',
            'btn--alt'
          ]}
          onPress={() =>
            dispatch({
              type: basketAndQuoteActionTypes.setRemovalModal
            })
          }
        />
        <Button
          strProp="quoteeditQuote"
          cssClasses={[
            'quote__action',
            'quote__action--edit',
            'btn',
            'btn--alt'
          ]}
        />
        <Button
          strProp="quoteprintQuote"
          cssClasses={[
            'quote__action',
            'quote__action--print',
            'btn',
            'btn--alt'
          ]}
        />
        <ButtonWithSvg
          svgHref="svg-phone"
          strProp="contactUs"
          svgClasses={['svg-phone svg__button']}
          cssClasses={['btn', 'btn--alt', 'quote__action']}
        />
      </div>
      <DeleteQuoteOrBasket dispatch={dispatch} open={removeModalOpen} />
      <RemoveItemModal open={modalOpen} dispatch={dispatch} />
    </div>
  );
};

export { QuoteOrBasketInner };
