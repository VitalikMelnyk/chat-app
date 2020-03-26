import * as Yup from "yup";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

// Yup validation
export const PersonalDetailsSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  secondName: Yup.string().required("Second Name is required"),
  gender: Yup.string().oneOf(["male", "female", "other"]),
  email: Yup.string()
    .email("Email is invalid")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required")
});

export const ContactDetailsSchema = Yup.object().shape({
  birthdayDate: Yup.date()
    .nullable()
    .required("Date is required"),
  city: Yup.string().required("City is required"),
  telephoneNumber: Yup.string()
    .required("Telephone Number is required")
    .matches(phoneRegExp, "Phone number is not valid"),
  country: Yup.object().shape({
    label: Yup.string().required("Country is required")
  }),
  address: Yup.string().required("Address is required"),
  zipCode: Yup.string()
    .required("Zip Code is required")
    .matches(/^[0-9]+$/, "Must be only digits!")
    .min(5, "Must be exactly 5 digits")
    .max(5, "Must be exactly 5 digits")
});

export const LoginPageSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email is invalid")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required")
});
