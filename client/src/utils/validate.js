export const validateSchema = values => {
  const errors = {};
  const requiredFields = Object.keys(values);
  console.log(requiredFields);
  console.log(values);
  console.log(values["country"]);
  console.log(values["telephoneNumber"]);
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = "Invalid email address";
  }
  if (values.password && values.password.length < 8) {
    errors.password = "Password must be 8 or more characters";
  }
  if (values.telephoneNumber && isNaN(values.telephoneNumber)) {
    errors.telephoneNumber = "Must be a number";
  }
  const isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(values.zipCode);
  if (values.zipCode && !isValidZip) {
    errors.zipCode = "Invalid zip code";
  }
  return errors;
};
