import styled from "@emotion/styled";
import { LoadingButton } from "@mui/lab";
import { Box, Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import * as React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { FormInputText } from "../../../components/formField/TextField";
import MobileField from "../../../components/reusableFormFields/TextField/mobileField";
import { errorAlert } from "../../../helpers/globalFunctions";
import {
    guestAddAddress,
    publicAddAddress
} from "../../../redux/api/public/authService";
import AddressPopup from "./addressPopup";

export default React.memo(function BillingAddressForm({
    user,
    getMe,
    formHook,
    setGuestAllow,
    setUser
}) {
    const dispatch = useDispatch();
    const [editAddress, setEditAddress] = React.useState(false)

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

    async function AddAddress(values) {
        values.is_default = 1;
        (values.address = "222 Citigate Drive, Barrhaven, ON, Canada"),
            (values.type = "Shipping Address");
        try {
            if (user) {
                await dispatch(publicAddAddress(values)).unwrap();
                await getMe();
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

    function handleEditAddress() {
        setEditAddress((state) => !state)
    }

    React.useEffect(() => {
        if (user) {
            reset({
                cart_id: localStorage.getItem("cart_id"),
                ...user,
            });
        } else {
            reset({
                cart_id: localStorage.getItem("cart_id"),
            })
        }
    }, [user]);

    return (
        <Box>
            <Box  >
                <Title>Billing Address</Title>
                <AddressAction>
                    <Button onClick={handleEditAddress}>Edit</Button>
                    <AddressPopup user={user} setUser={setUser} />
                </AddressAction>
                <form onSubmit={handleSubmit(AddAddress)}>
                    <Grid container spacing={3}>
                        {inputs.map((input, index) => {
                            const { type, name, show, label } = input;
                            if (show) {
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
                                        return (
                                            <Grid item lg={6} key={index}>
                                                <FormInputText
                                                    disabled={!editAddress}
                                                    control={control}
                                                    name={name} label={label}
                                                    error={formHook.formState.errors?.[name]?.message} />
                                            </Grid>
                                        );
                                }
                            }
                        })}
                    </Grid>

                    <Box sx={{ my: 1, display: 'flex', alignItems: "flex-end", justifyContent: "flex-end" }}>
                        {
                            editAddress ? <LoadingButton
                                loadingPosition="center"
                                loading={isSubmitting}
                                variant="contained"
                                type="submit"
                                fullWidth
                                // className="Submitbtn"
                                sx={{ backgroundColor: "#951e76" }}
                            >
                                Edit Address
                            </LoadingButton> :
                                !formHook.formState.isValid ? <LoadingButton
                                    loadingPosition="center"
                                    loading={isSubmitting}
                                    variant="contained"
                                    type="submit"
                                    fullWidth
                                    // className="Submitbtn"
                                    sx={{ backgroundColor: "#951e76" }}
                                >
                                    Add Address
                                </LoadingButton> : null
                        }

                    </Box>
                </form>
            </Box>
        </Box>
    );
})


const Title = styled(Typography)`
    color: var(--gray-scale-gray-900, #1A1A1A);

    /* Body XXL/Body XXL, 500 */
    font-family: Poppins;
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%; /* 36px */
`

const AddressAction = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "flex-end",
    margin: "10px 0",
}))


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
