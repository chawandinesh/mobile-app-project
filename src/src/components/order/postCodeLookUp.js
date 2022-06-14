import PropTypes from 'prop-types';
import { Input } from '../formElements/input';
import { Select } from '../formElements/select';
import { Label } from '../formElements/label';
import { T } from '../translation/index';
import { Button } from '../buttons';
import { postCodeLookUpMappings } from './buyNowMappings';

/**
 * postcode look up or select an existing address
 * just dummy component for the moment
 */
const PostCodeLookUp = ({ knownAddressArray }) => {
  const {
    existAddresses,
    postCode,
    selectAddress,
    organisation,
    town,
    street,
    dispatchDate,
    preferredDelivery
  } = postCodeLookUpMappings;

  return (
    <fieldset>
      <legend className="buy-now__legend buy-now__legend--sml">
        <T strProp="buyNowSelectOrLookUp" />
      </legend>
      {knownAddressArray && (
        <Select {...existAddresses} selectData={knownAddressArray} />
      )}

      <div className="but-now__action">
        <Button strProp="buyNowLookUp" cssClasses={['but-now__lookup']} />
        <Input {...postCode} />
      </div>
      <Select {...selectAddress} />
      <Input {...organisation} />
      <div className="buy-now__two-two">
        <Input {...street} />
        <Input {...town} />
      </div>
      <Input {...dispatchDate} />
      <Select {...preferredDelivery} />
      <div className="form-item">
        <Label strProp="buyNowComment" isFor="buyNowComment" />
        <textarea
          className="input"
          id="buyNowComment"
          name="buyNowComment"
          placeholder="Enter comments"
        />
      </div>
    </fieldset>
  );
};

PostCodeLookUp.propTypes = {
  knownAddress: PropTypes.array
};

export { PostCodeLookUp };
