/* eslint-disable import/no-anonymous-default-export */
import * as yup from "yup";

const productForm = yup.object().shape({
  product_name: yup
    .string()
    .required("Name is required")
    .matches(/^[aA-zZ\s]+$/, "Numbers are not allowed"),
  category: yup
    .string()
    .required("Category Id is required")
    .matches(/^[0-9]{0,9}$/, "Invalid Format"),
  cost: yup
    .string()
    .required("Price is required")
    .matches(/^[0-9]{0,4}$/, "Invalid Format"),
  description: yup
    .string()
    .required("Description is required")
    .matches(/^[aA-zZ\s]+$/, "Numbers are not allowed"),
});

const categoryForm = yup.object().shape({
  label: yup.string().required("Label is required"),
  // .matches(/^[aA-zZ\s]+$/, "Numbers are not allowed"),
  // parent_id: yup
  //   .string()
  //   .required("Parent Id is required")
  //   .matches(/^[0-9]{0,9}$/, "Invalid Format"),
});

const profileForm = yup.object().shape({
  first_name: yup
    .string()
    .required("First Name is required")
    .matches(/^[aA-zZ\s]+$/, "Numbers are not allowed"),
  last_name: yup
    .string()
    .required("Last Name is required")
    .matches(/^[aA-zZ\s]+$/, "Numbers are not allowed"),
  mobile: yup
    .string()
    .required("Mobile Number is required")
    .matches(/^[0-9]{10}$/, "Invalid mobile number"),
});

const passwordForm = yup.object().shape({
  password: yup.string().min(8, "Password is required").max(32),
  new_password: yup.string().min(8, "New Password is required").max(32),
  confirm_password: yup.string().min(8, "Comfirm Password is required").max(32),
});

const addressForm = yup.object().shape({
  // password: yup.string().min(8, "Password is required").max(32),
  // new_password: yup.string().min(8, "New Password is required").max(32),
  // confirm_password: yup.string().min(8, "Comfirm Password is required").max(32),
});

export { productForm, categoryForm, profileForm, passwordForm, addressForm };
