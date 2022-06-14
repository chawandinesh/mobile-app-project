import { rGet } from '../../utils/utils';

/**
 * creates an address component
 * currently just a wraps everything in spans
 */
const Address = ({ addressObj, mapping }) => {
  return (
    <div className="address">
      {mapping.map((prop) => {
        const value = rGet(addressObj, prop);
        return value ? <span key={prop}>{value} </span> : null;
      })}
    </div>
  );
};

export { Address };
