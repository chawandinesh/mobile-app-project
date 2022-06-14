import { Button } from './buttons';
import { useRef, useState, useEffect } from 'react';
import { quantityIsInvalid } from '../utils/validations';
import { T } from './translation';

const QuantityIncrement = ({ callback, id, labelClass = 'quantity' }) => {
  const quantityRef = useRef(null);
  const [count, setCount] = useState(1);

  const increment = (evt) => {
    evt.preventDefault();
    let currentValue = parseInt(quantityRef.current.value, 10);

    const incrementType = evt.currentTarget.dataset.increment;
    const newValue = incrementType === '+' ? ++currentValue : --currentValue;

    // don't let the value go below 0
    quantityRef.current.value = newValue < 0 ? 0 : newValue;
    setCount(parseInt(quantityRef.current.value, 10));
  };

  const localId = id ? id : 'quantity';

  useEffect(() => {
    callback(count);
  }, [count]);

  // if the user is using the input rather than the buttons
  // we need to check and reset the value
  const checkIsValid = () => {
    if (quantityIsInvalid(quantityRef.current.value)) {
      quantityRef.current.value = 0;
    }

    setCount(parseInt(quantityRef.current.value, 10));
  };

  return (
    <div className="quantity-increment">
      <label className={labelClass} htmlFor={localId}>
        <T strProp="quantity" />
      </label>
      <div className="quantity-increment__actions">
        <Button
          cssClasses={['btn', 'btn--tiny']}
          onPress={increment}
          dataAttr={{ 'data-increment': '-' }}
          disabled={count === 0}
        >
          <span>-</span>
        </Button>
        <input
          className="quantity-increment__input"
          type="text"
          pattern="[0-9]*"
          inputMode="numeric"
          defaultValue="1"
          id={localId}
          name={localId}
          ref={quantityRef}
          onBlur={checkIsValid}
        />
        <Button
          cssClasses={['btn', 'btn--tiny']}
          onPress={increment}
          dataAttr={{ 'data-increment': '+' }}
        >
          <span>+</span>
        </Button>
      </div>
    </div>
  );
};

export { QuantityIncrement };
