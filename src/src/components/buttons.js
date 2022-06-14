import PropTypes from 'prop-types';
import { T } from './translation';

/**
 * assume that any children will have the translations in them
 * otherwise we have to add it here
 *
 *  dataAttr are in the following format
 *  {'data-somename': 'somevalue' } - somevalue is a string or number
 *
 */
const Button = ({
  cssClasses,
  strProp,
  onPress,
  type,
  children,
  form,
  disabled,
  dataAttr
}) => {
  return (
    <button
      className={cssClasses.join(' ')}
      onMouseUp={onPress}
      type={type}
      form={form}
      disabled={disabled}
      {...dataAttr}
    >
      {children ? children : <T strProp={strProp} />}
    </button>
  );
};

Button.propTypes = {
  cssClasses: PropTypes.arrayOf(PropTypes.string),
  strProp: PropTypes.string,
  onPress: PropTypes.func,
  type: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  form: PropTypes.string,
  disabled: PropTypes.bool,
  dataAttr: PropTypes.object
};

Button.defaultProps = {
  cssClasses: [],
  type: 'button',
  disabled: false,
  dataAttr: {}
};

const buttonClasses = ['btn', 'btn__full', 'btn__hollow', 'btn-hollow--dark'];
const blueButtonClasses = ['btn', 'btn__full'];

/**
 * button with the basket icon
 * can extend this to have more props
 */
const ButtonWithSvg = ({ ...props }) => {
  const { isAlt, strProp, svgClasses, svgHref } = props;
  const classesToAdd = isAlt ? buttonClasses : blueButtonClasses;

  return (
    <Button cssClasses={classesToAdd} {...props}>
      <>
        <svg className={svgClasses.join(' ')}>
          <use href={`#${svgHref}`} />
        </svg>
        <T strProp={strProp} />
      </>
    </Button>
  );
};

ButtonWithSvg.defaultProps = {
  strProp: 'addToBasket',
  isAlt: false
};

export { Button, ButtonWithSvg };
