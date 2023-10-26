/* eslint-disable import/no-anonymous-default-export */
import * as yup from 'yup'

const validateQuick = yup.object().shape({
    name: yup.string().required("Job is required"),
    type: yup.string().required("Job Type is required"),
    date: yup.string().required("Date is required"),
    assign_to: yup.mixed().required("Assigned To is required"),
    address: yup.mixed().required("Address is required"),
    form_id: yup.mixed().required("Form Id is required"),
    admin_id: yup.mixed().required("Assigned By is required"),
    supervisor_id: yup.mixed().required("Supervisor is required"),
    amount: yup.string().required("Amount is required"),
})

const validateRecus = yup.object().shape({
    name: yup.string().required("Job is required"),
    type: yup.string().required("Job Type is required"),
    date: yup.string().required("Date is required"),
    is_day: yup.array().required("Day is required").min(1, "Day is required"),
    recurring_type: yup.mixed().required("Task is required"),
    assign_to: yup.mixed().required("Assigned To is required"),
    address: yup.mixed().required("Address is required"),
    form_id: yup.mixed().required("Form Id is required"),
    admin_id: yup.mixed().required("Assigned By is required"),
    supervisor_id: yup.mixed().required("Supervisor is required"),
    amount: yup.string().required("Amount is required")
})

const roleFormValidation = yup.object().shape({
    name: yup.string().required("Role name is required").matches(/^[aA-zZ\s]+$/, "Enter valid role name"),
})

const changePasswordSchema = yup.object().shape({
    old_password: yup.string().required("Current password is required").min(8).max(32),
    new_password: yup.string().required("Change password is required").min(8).max(32),
    confirm_password: yup.string().required("Confirm password is required").oneOf([yup.ref("new_password"), null],
        "Confirm password field must match New password").min(8).max(32),
})

const ProfileUpdateSchema = yup.object().shape({
    first_name: yup.string().required("First Name is required").matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed"),
    last_name: yup.string().required("Last Name is required").matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed  "),
    email: yup.string().email().required("Email is required"),
    mobile: yup.string().required('Mobile Number is required').matches(/^[0-9]{10}$/, 'Invalid mobile number'),
    address: yup.mixed().required("Address is required "),
    country: yup.string().required("country is required").matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed "),
    zip_code: yup.string().required("Zip code is required").matches(/^\d{4,8}$/, "Invalid zip code"),
    role_name: yup.string("role_name is required").required('Select an option'),
});


const editEmployeeform = yup.object().shape({
    first_name: yup.string().required("First Name is required").matches(/^[aA-zZ\s]+$/, "Numbers are not allowed"),
    last_name: yup.string().required("Last Name is required").matches(/^[aA-zZ\s]+$/, "Numbers are not allowed "),
    email: yup.string().email().required("Email is required"),
    mobile: yup.string().required('Mobile Number is required').matches(/^[0-9]{10}$/, 'Invalid mobile number'),
    address: yup.mixed().required("Address is required"),
    zip_code: yup.string().required('Zip code is required').matches(/^\d{4,8}$/, 'Invalid zip code'),
    password: yup.string().min(6,'Password is required').max(32)
})

const vaidateNotification = yup.object().shape({
    recevier_type: yup.string().required('Please Select a Type'),
    title: yup.string().required('Please Enter Title'),
    message: yup.string().required("Please Enter Message"),
    assign_to: yup.mixed("Please Select User's"),
    supervisor_id: yup.mixed("Please Select Supervisor")
    
})

const directoryForm = yup.object().shape({
    first_name: yup
        .string()
        .required("First Name is required")
        .matches(/^[aA-zZ\s]+$/, "Numbers are not allowed"),
    last_name: yup
        .string()
        .required("Last Name is required")
        .matches(/^[aA-zZ\s]+$/, "Numbers are not allowed  "),
    email: yup.string().email().required("Email is required"),
    mobile: yup
        .string()
        .required("Mobile Number is required")
        .matches(/^[0-9]{10}$/, "Invalid mobile number"),
    address: yup.mixed().required("Address is required"),
    // country: yup.string().required().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed "),
    zip_code: yup
        .string()
        .required("Zip code is required")
        .matches(/^\d{4,8}$/, "Invalid zip code"),
    password: yup
        .string()
        .min(6,'Password is required')
        .max(15,)
        ,
    // .required(),
    role: yup.string().required("Select role"),
    // image: yup.mixed().required("File is required"),
});

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
  parent_id: yup
    .string()
    .required("Parent Id is required")
    .matches(/^[0-9]{0,9}$/, "Invalid Format"),
});

const addMiscForm = yup.object().shape({
    expenses: yup.array().of(
        yup.object().shape({
            item: yup.string().required('Item is required').matches(/^[aA-zZ\s]+$/, "Numbers are not allowed  "),
            qty: yup.string()
            .required('Quantity is required')
            .matches(/^[0-9]+$/, "Must be only digits")
           ,
            price: yup.string().required("Price is required").matches(/^[0-9]+$/, "Must be only digits"),
            // receipt: yup.mixed().required("Image is required")
        })
    )
})

export { validateQuick, validateRecus, roleFormValidation, changePasswordSchema,addMiscForm, ProfileUpdateSchema, editEmployeeform, directoryForm, vaidateNotification,productForm,categoryForm }
