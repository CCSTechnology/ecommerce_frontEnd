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
    setUser,
}) {
    const dispatch = useDispatch();
    const [editAddress, setEditAddress] = React.useState(!user ? true : false)

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
                setGuestAllow({
                    ...response ,
                    zipcode : details['zipcode']
                });
                toast.success("Address Added")
            }
        } catch (error) {
            errorAlert(error?.error)
        }
    }

    function handleEditAddress() {
        setEditAddress((state) => !state)
    }

    React.useEffect(() => {
        if (user) {
            formHook.reset({
                cart_id: localStorage.getItem("cart_id"),
                ...user,
            });
        } else {
            formHook.reset({
                cart_id: localStorage.getItem("cart_id"),
            })
        }
    }, [user]);

    return (
        <Box>
            <Box  >
                <Title>Billing Address</Title>
                <>
                    {
                        user && <AddressAction>
                            <Button onClick={handleEditAddress}>Edit</Button>
                            <AddressPopup user={user} setUser={setUser} />
                        </AddressAction>
                    }

                </>
                <form onSubmit={formHook.handleSubmit(AddAddress)}>
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
                                                    control={formHook.control}
                                                    label="Mobile"
                                                    error={formHook.errors?.phone_number?.message}
                                                />
                                            </Grid>
                                        );
                                    default:
                                        return (
                                            <Grid item lg={6} key={index}>
                                                <FormInputText
                                                    disabled={!editAddress}
                                                    control={formHook.control}
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
                                loading={formHook.formState.isSubmitting}
                                variant="contained"
                                type="submit"
                                fullWidth
                                // className="Submitbtn"
                                sx={{ backgroundColor: "#951e76" }}
                            >
                                {
                                    user ? "Edit Address" : "Add Address"
                                }
                            </LoadingButton> :
                                !formHook.formState.isValid ? <LoadingButton
                                    loadingPosition="center"
                                    loading={formHook.formState.isSubmitting}
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
    margin-bottom: 10px;
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

