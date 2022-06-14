import { Button } from '../buttons';
import { T } from '../translation';
import { basketAndQuoteActionTypes } from '../../reducers/basketAndQuoteReducer';

const DeleteQuoteOrBasket = ({ dispatch, open }) => {
  const checkEvent = (evt) => {
    evt.preventDefault();

    const deleteType = evt.currentTarget.dataset.delete;

    console.log(deleteType === 'true');
    dispatch({
      type: basketAndQuoteActionTypes.confirmRemoval,
      data: deleteType === 'true'
    });
  };

  return open ? (
    <div className="quote__delete-confirm">
      <div>
        <h2 className="heading-alt">Delete Quote</h2>
        <p>Are you sure you want to delete this quote?</p>
        <Button
          cssClasses={['quote__delete-confirm-close']}
          dataAttr={{ 'data-delete': 'false' }}
          onPress={checkEvent}
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
            strProp="delete"
            dataAttr={{ 'data-delete': 'true' }}
          />
        </div>
      </div>
    </div>
  ) : null;
};

export { DeleteQuoteOrBasket };
