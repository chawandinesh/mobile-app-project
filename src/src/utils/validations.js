const quantityIsInvalid = (quantity) => {
  let message = false;
  if (quantity.trim() === '' || parseInt(quantity) < 0) {
    message = true;
  } else if (isNaN(quantity)) {
    message = true;
  } else if (quantity.indexOf('.') !== -1) {
    message = true;
  }
  return message;
};

export { quantityIsInvalid };
