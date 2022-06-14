import { Button } from '../buttons';
import { T } from '../translation';
import { basketAndQuoteActionTypes } from '../../reducers/basketAndQuoteReducer';

const RemoveItemModal = ({ open, dispatch }) => {
  const checkEvent = (evt) => {
    evt.preventDefault();

    const deleteType = evt.currentTarget.dataset.delete;
    dispatch({
      type: basketAndQuoteActionTypes.confirmDelete,
      data: deleteType === 'true'
    });
  };

  return open ? (
    <div className="quote__delete-confirm">
      <div>
        <h2 className="heading-alt">
          <T strProp="quoteDeleteItem" />
        </h2>
        <p>
          <T strProp="quoteAreYouSure" />
        </p>
        <Button
          cssClasses={['quote__delete-confirm-close']}
          onPress={checkEvent}
          dataAttr={{ 'data-delete': 'false' }}
        >
          <span className="visually-hidden">
            <T strProp="close" />
          </span>
        </Button>

        <div className="quote__delete-response">
          <Button
            cssClasses={['quote__delete-response-cancel']}
            onPress={checkEvent}
            dataAttr={{ 'data-delete': 'false' }}
            strProp="cancel"
          />
          <Button
            cssClasses={['quote__delete-response-ok']}
            onPress={checkEvent}
            dataAttr={{ 'data-delete': 'true' }}
            strProp="delete"
          />
        </div>
      </div>
    </div>
  ) : null;
};

export { RemoveItemModal };
