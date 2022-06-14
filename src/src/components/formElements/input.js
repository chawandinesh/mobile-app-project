import PropTypes from 'prop-types';
import { Label } from './label';
import { STR } from '../translation';

/**
 * THIS is an uncontrolled component at the moment
 * just creating like this as we aren't using them
 * for inputs yet but just for display.
 *
 * Intended use is to have a callback and send the target back to the
 * callback and deal with it in the parent component
 *
 * returns an input and label
 * does not work for checkboxes or radios
 * name must be unique in a page
 *
 * haven't done it but we can extend this to take extra classes etc
 *
 *
 * NB placeHolder must be strProp for translations
 */
const Input = ({ name, labelStrProp, id, type, placeHolder, value }) => {
  const localId = id ? id : name;
  const placeHolderText = placeHolder ? STR(placeHolder) : '';

  return (
    <div className="form-item">
      <Label strProp={labelStrProp} isFor={localId} />
      <input
        className="input"
        type={type}
        name={name}
        id={localId}
        placeholder={placeHolderText}
        defaultValue={value}
      />
    </div>
  );
};
Input.propTypes = {
  name: PropTypes.string.isRequired,
  labelStrProp: PropTypes.string.isRequired,
  id: PropTypes.string,
  type: PropTypes.string,
  placeHolder: PropTypes.string,
  defaultValue: PropTypes.string
};

Input.defaultProps = {
  type: 'text',
  value: ''
};

export { Input };
