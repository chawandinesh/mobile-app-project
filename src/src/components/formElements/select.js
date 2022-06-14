import PropTypes from 'prop-types';
import { Label } from './label';
import { rGet } from '../../utils/utils';

/**
 * basic select box, supply an object and what props to use
 * and away you go
 * might have to be fixed up to use translations
 */
const Select = ({
  selectData,
  labelStrProp,
  name,
  valueProp = 'value',
  textProp = 'text',
  id
}) => {
  const localId = id ? id : name;

  return selectData ? (
    <div className="form-item">
      <Label isFor={localId} strProp={labelStrProp} />
      <div className="select-outer">
        <select id={localId} name={name} className="select">
          {selectData.map((opt) => {
            const value = rGet(opt, valueProp);
            return (
              <option className="select__item" key={value} value={value}>
                {rGet(opt, textProp)}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  ) : null;
};

Select.propTypes = {
  selectData: PropTypes.arrayOf(PropTypes.object),
  name: PropTypes.string.isRequired,
  labelStrProp: PropTypes.string.isRequired,
  valueProp: PropTypes.string,
  textProp: PropTypes.string,
  id: PropTypes.string
};

export { Select };
