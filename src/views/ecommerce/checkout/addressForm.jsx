import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm } from "react-hook-form";
import { FormInputText } from "../../../components/formField/TextField";
import MobileField from "../../../components/reusableFormFields/TextField/mobileField";
import { useDispatch } from "react-redux";
import { getAddressServices } from "../../../redux/api/public/cartServices";
import { LoadingButton } from "@mui/lab";
import { Box, Grid, Typography } from "@mui/material";
import {
    guestAddAddress,
    publicAddAddress,
    publicGetMe,
} from "../../../redux/api/public/authService";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { errorAlert } from "../../../helpers/globalFunctions";
import { toast } from "react-toastify";

export default function BillingAddressForm({
    user,
    getMe,
    formHook,
    setGuestAllow,
}) {
    const ref = React.useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [popUp, setPopup] = React.useState(false);

    const inputs = React.useMemo(() => {
        return [
            {
                name: "name",
                label: "Name",
                show: true,
            },
            {
                name: "cart_id",
                label: "Cart Id",
                show: false,
            },
            {
                name: "phone_number",
                label: "Phone Number",
                type: "number",
                show: true,
            },
            {
                name: "same_address",
                label: "Same Address",
                type: "switch",
                show: false,
            },
            {
                name: "email",
                type: "email",
                label: "Email",
                show: true,
            },
            {
                name: "country",
                label: "Country",
                show: true,
            },
            {
                name: "state",
                label: "State",
                show: true,
            },
            {
                name: "city",
                label: "City",
                show: true,
            },
            {
                name: "street_name",
                label: "Area",
                show: true,
            },
            {
                name: "line1",
                label: "Street Details",
                show: true,
            },
            {
                name: "zipcode",
                label: "Pincode",
                show: true,
            },
            {
                name: "address",
                label: "Address",
                show: false,
            },
        ];
    }, []);

    const {
        control,
        handleSubmit,
        errors,
        watch,
        reset,
        formState: { isSubmitting },
    } = formHook;

    const onSubmit = async (values) => {
        try {
            const value = {
                cart_id: "9ab1fa94-d73c-4ceb-a678-f7fb0f331d09",
                name: "Name",
                phone_number: "1234567859",
                same_address: 1,
                email: "test@gmail.com",
                address_details: [
                    {
                        country: "Canada",
                        state: "Barrhaven",
                        city: "Citigate Drive",
                        street_name: "iuyt",
                        line1: "kjgj",
                        zipcode: "M5J 0B6",
                        address: "222 Citigate Drive, Barrhaven, ON, Canada",
                    },
                ],
            };
            const response = await dispatch(getAddressServices(value)).unwrap();
            console.log(response, "response");
        } catch (error) { }
    };
    
    async function handleCheckOut() {
        try {
            //Valid User
            if (user) {
                const response = await dispatch(
                    checkOutWithUser({
                        billing_address_id: 1,
                        shipping_address_id: 1,
                        delivery_charges: 0,
                        cart_id: "",
                    })
                ).unwrap();
                console.log(response, "response");
                window.location.href = response.payment_details;
            }
            //Expries Token
            else {
                setPopup(true);
                // navigate('/login=callBackUrl=/checkout')
            }
        } catch (error) {
            console.log(error, "error");
        }
    }

    async function AddAddress(values) {
        values.is_default = 1;
        (values.address = "222 Citigate Drive, Barrhaven, ON, Canada"),
            (values.type = "Shipping Address");
        try {
            if (user) {
                const response = await dispatch(publicAddAddress(values)).unwrap();
                await getMe();
                console.log(response, "res");
                toast.success("Address Added")
            } else {
                const details = {};
                values.same_address = true;
                values.cart_id = localStorage.getItem("cart_id") || null;
                const array = [
                    "country",
                    "state",
                    "city",
                    "street_name",
                    "line1",
                    "zipcode",
                    "address",
                ];
                for (const [key, value] of Object.entries(values)) {
                    if (array.includes(key)) {
                        details[key] = value;
                        delete values[key];
                    }
                }
                values.address_details = [details];
                const response = await dispatch(guestAddAddress(values)).unwrap();
                setGuestAllow(response);
                toast.success("Address Added")
            }
        } catch (error) {
            console.log(error);
            errorAlert(error?.error)
        }
    }

    // async function getMe() {
    //     try {
    //         const response = await dispatch(publicGetMe()).unwrap()
    //         const { email, mobile, first_name, last_name } = response
    //         const dat = {
    //             name: first_name + last_name ? ` ${last_name}` : "",
    //             phone_number: mobile,
    //             same_address: 0,
    //             email: email,
    //             country: "Canada",
    //             state: "Barrhaven",
    //             city: "Citigate Drive",
    //             street_name: "iuyt",
    //             line1: "kjgj",
    //             zipcode: "M5J 0B6",
    //         }
    //         setUser(dat)
    //         reset(dat)
    //     } catch (error) {
    //         console.log(error, "error")
    //     }
    // }

    React.useEffect(() => {
        if (user) {
            reset({
                cart_id: localStorage.getItem("cart_id"),
                ...user,
            });
        }else {
            reset({
                cart_id : localStorage.getItem("cart_id"),
            })
        }
    }, [user]);

    return (
        <Box>
            <Box  >
                <Title>Billing Address</Title>
                <form onSubmit={handleSubmit(AddAddress)}>
                    <Grid container spacing={3}>
                        {inputs.map((input, index) => {
                            const { type, name, show, label } = input;
                            switch (type) {
                                case "phone":
                                    return (
                                        <Grid item span={6} key={index}>
                                            <MobileField
                                                name={name}
                                                control={control}
                                                label="Mobile"
                                                error={errors?.phone_number?.message}
                                            // InputProps={{
                                            //     startAdornment: <InputAdornment position="start">+61</InputAdornment>,
                                            // }}
                                            />
                                        </Grid>
                                    );
                                default:
                                    console.log(errors)
                                    return (
                                        <Grid item lg={6} key={index}>
                                            <FormInputText control={control} name={name} label={label} error={formHook.formState.errors?.[name]?.message} />
                                        </Grid>
                                    );
                            }
                        })}

                        <Box sx={{ my: 1, display: 'flex', alignItems: "flex-end", justifyContent: "flex-end" }}>
                            <LoadingButton
                                loadingPosition="center"
                                loading={isSubmitting}
                                variant="contained"
                                type="submit"
                                fullWidth
                                // className="Submitbtn"
                                sx={{ backgroundColor: "#951e76" }}
                            >
                                Add Address
                            </LoadingButton>
                        </Box>
                    </Grid>
                </form>
            </Box>
        </Box>
    );
}


const Title = styled(Typography)`
color: var(--gray-scale-gray-900, #1A1A1A);

/* Body XXL/Body XXL, 500 */
font-family: Poppins;
font-size: 24px;
font-style: normal;
font-weight: 500;
line-height: 150%; /* 36px */
`



// import * as React from 'react';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import { Grid , Box} from '@mui/material';
// import MobileField from '../../../components/reusableFormFields/TextField/mobileField';
// import { FormInputText } from '../../../components/formField/TextField';
// import { LoadingButton } from '@mui/lab';

// export default function AddressPopUp({ AddressForm, open, setOpen, submit }) {
//     const { handleSubmit, reset, control, formState: { isSubmitting, errors } } = AddressForm

//     const inputs = React.useMemo(() => {
//         return [{
//             name: "name",
//             label: "Name",
//             show: true,
//         }, {
//             name: "cart_id",
//             label: "Cart Id",
//             show: false,
//         }, {
//             name: "phone_number",
//             label: "Phone Number",
//             type: "number",
//             show: true,
//         },
//         {
//             name: "same_address",
//             label: "Same Address",
//             type: "switch",
//             show: true,
//         },
//         {
//             name: "email",
//             type: "email",
//             label: "Email",
//             show: true,
//         }, {
//             name: "country",
//             label: "Country",
//             show: true,
//         }, {
//             name: "state",
//             label: "state",
//             show: true,
//         }, {
//             name: "city",
//             label: "City",
//             show: true,
//         }, {
//             name: "street_name",
//             label: "Area",
//             show: true,
//         }, {
//             name: "line1",
//             label: "Street Details",
//             show: true,
//         }, {
//             name: "zipcode",
//             label: "pincode",
//             show: true,
//         }, {
//             name: "address",
//             label: "Address",
//             show: false,
//         }]
//     }, [])

//     const handleClickOpen = () => {
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//     };

//     return (
//         <React.Fragment>
//             <Dialog open={open} onClose={handleClose} component={'form'} onSubmit={handleSubmit(submit)}>
//                 <DialogTitle>Please Fill Address</DialogTitle>
//                 <DialogContent>
//                     <Grid container spacing={3}>
//                         {
//                             inputs.map((input, index) => {
//                                 const { type, name, show, label } = input
//                                 switch (type) {
//                                     case 'phone':
//                                         return <Grid item span={6} key={index}>
//                                             <MobileField
//                                                 name={name}
//                                                 control={control}
//                                                 label="Mobile"
//                                                 error={errors?.phone_number?.message}
//                                             // InputProps={{
//                                             //     startAdornment: <InputAdornment position="start">+61</InputAdornment>,
//                                             // }}
//                                             />
//                                         </Grid>
//                                     default:
//                                         return <Grid item lg={6} key={index}>
//                                             <FormInputText control={control} name={name} label={label} />
//                                         </Grid>
//                                 }
//                             })
//                         }
//                     </Grid>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleClose}>Cancel</Button>
//                     <Button onClick={handleClose}>Add Address</Button>
//                 </DialogActions>
//             </Dialog>
//         </React.Fragment>
//     );
// }
