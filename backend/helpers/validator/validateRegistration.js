const { check } = require("express-validator");

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const zipCodeRegExp = /^[0-9]+$/;
const birthdayDateRegExp = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;

const validateRegistration = () => {
  console.log(131131313);
  return [
    check("firstName")
      .not()
      .isEmpty()
      .withMessage("First Name is required!"),
    check("secondName")
      .not()
      .isEmpty()
      .withMessage("Second Name is required!"),
    check("gender")
      .not()
      .isEmpty()
      .withMessage("Gender is required!"),
    check("email")
      .not()
      .isEmpty()
      .withMessage("Email is required!")
      .isEmail()
      .withMessage("Email is invalid"),
    check("password")
      .not()
      .isEmpty()
      .withMessage("Password is required!")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    check("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password confirmation does not match password");
      }
      return true;
    }),
    check("city")
      .not()
      .isEmpty()
      .withMessage("City is required!"),
    check("telephoneNumber")
      .not()
      .isEmpty()
      .withMessage("Telephone Number is required!")
      .matches(phoneRegExp)
      .withMessage("Telephone Number is not valid!"),
    check("birthdayDate")
      .not()
      .isEmpty()
      .withMessage("BirthDay Date is required!")
      .matches(birthdayDateRegExp)
      .withMessage("BirthDay Date is invalid!"),
    check("country")
      .not()
      .isEmpty()
      .withMessage("Country is required!"),
    check("address")
      .not()
      .isEmpty()
      .withMessage("Address is required!"),
    check("zipCode")
      .not()
      .isEmpty()
      .withMessage("Zip Code is required!")
      .matches(zipCodeRegExp)
      .withMessage("Must be only digits!")
      .isLength({ min: 5, max: 5 })
      .withMessage("Must be exactly 5 digits!")
  ];
};

module.exports = { validateRegistration };
