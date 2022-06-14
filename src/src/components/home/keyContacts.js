import { Link } from 'react-router-dom';
import { callApi } from '../../utils/call-api';
import { PageLoader } from '../generic/pageLoader';
import { useEffect, useState } from 'react';
import { useSessionHook } from '../../hooks';
import { T } from '../translation/index';

const KeyContacts = () => {
  const sessionHelpers = useSessionHook();
  const { token, status } = sessionHelpers.getStatusAndToken();
  const [accountData, setAccountData] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    async function fetchAccountData() {
      const response = await callApi('account', { token, status });
      let accountDataLocal;

      const {
        body: { result }
      } = response;

      if (response.error) {
        accountDataLocal = {
          error: response.error
        };
      } else {
        if (result && result.keyAccountContacts) {
          accountDataLocal = result.keyAccountContacts;
        } else {
          accountDataLocal = {
            error: true
          };
        }
      }

      setAccountData(accountDataLocal);
    }

    if (token && !hasFetched) {
      setHasFetched(true);
      fetchAccountData();
    }
  }, [token, status, hasFetched]);

  if (!accountData) {
    return <PageLoader isLoading={true} isSmall={true} />;
  }

  return accountData.error ? (
    <p className="text-error">There has been a problem loading the data</p>
  ) : (
    <>
      {accountData.map((item) => {
        const typeToLower = item.type.toLowerCase();

        return (
          <div className="card key-contacts" key={item.type}>
            <div className="key-contacts__info">
              <img
                src="spacer.gif"
                aria-hidden="true"
                alt=""
                width="51px"
                height="51px"
                className="dummy-image"
              />
              <div className="key-contact__person">
                <p>
                  <T strProp={`keycontacts${typeToLower}title`} />
                  <b className="key-contact__name">{item.name}</b>
                </p>
                <p className="key-contact__tel">
                  <svg className="svg-phone">
                    <use href="#svg-phone" />
                  </svg>
                  {item.contactNumber}
                </p>
              </div>
              <Link to="#" className="btn key-contact__btn">
                <T strProp="contactForm" />
              </Link>
            </div>
            <p className="key-contacts__text">
              <T strProp={`keycontacts${typeToLower}text`} />
            </p>
          </div>
        );
      })}
    </>
  );
};

export { KeyContacts };
