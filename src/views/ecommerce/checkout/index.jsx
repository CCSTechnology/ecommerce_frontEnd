import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Typography } from '@mui/material';
import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartViewServices, checkOutWithGuest, checkOutWithUser } from '../../../redux/api/public/cartServices';
import { useForm } from 'react-hook-form';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import CustomBreadcrumbs from '../../../components/ecommerce/Breadcrumps';
import StyledContainer from '../../../components/ecommerce/StyledContainer';
import { publicGetMe } from '../../../redux/api/public/authService';
import OrderSummary from './OrderSummary';
import BillingAddressForm from './addressForm';
import { toast } from 'react-toastify';
import { errorAlert } from '../../../helpers/globalFunctions';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup"

const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    phone_number: yup.string().required("Phone number is required"),
    email: yup.string().email().required("Emai is required"),
    country: yup.string().required("Country is required"),
    state: yup.string().required("State is required"),
    city: yup.string().required("City is required"),
    street_name: yup.string().required("Addres is required"),
    line1: yup.string().required("Address is required"),
    zipcode: yup.string().required("Pincode is required"),
    address: yup.string(),
});

export default memo(function GetLoginCheckout() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [popUp, setPopup] = useState(false)
    const { data: cartData } = useSelector((state) => state.cart.cartViewServices)
    const [cartList, setCartList] = useState(null)
    const [user, setUser] = useState(null)
    const [guest, setGuest] = useState(null)
    const breadcrumbs = [{
        label: "Home",
        link: '/',
    }, {
        label: "Cart",
        link: "/cart"
    }, {
        label: "Checkout"
    }]

    const cartId = localStorage.getItem('cart_id') || null
    const [guestAllow, setGuestAllow] = useState(null)

    async function getCartList() {
        try {
            const response = await dispatch(cartViewServices({
                cart_id: cartId
            })).unwrap()
            setCartList(response || null)
        } catch (error) {
            setCartList(null)
        }

    }

    const { handleSubmit } = useForm({
        defaultValues: {

        }
    })

    const { ...formHook } = useForm({
        defaultValues: {
        },
        resolver: yupResolver(schema)
    })




    async function handleCheckOut() {
        try {
            //Valid User
            if (user) {
                const response = await dispatch(checkOutWithUser({
                    billing_address_id: user?.id,
                    shipping_address_id: user?.id,
                    delivery_charges: 0,
                    cart_id: ""
                })).unwrap()
                window.location.href = response.payment_details
            }
            //Expries Token
            else {
                setPopup(true)
            }


        } catch (error) {
            errorAlert(error?.error)
        }
    }

    async function handleCheckOutGuest(values) {
        try {
            const { trigger, formState: { isValid } } = formHook

            if (isValid) {
                const response = await dispatch(checkOutWithGuest({
                    billing_address_id: guestAllow?.billing_id,
                    shipping_address_id: guestAllow?.billing_id,
                    cart_id: cartId,
                    delivery_charges: 0,
                    guest_id: guestAllow?.billing_id
                })).unwrap()
                window.location.href = response.payment_details
            } else {
                trigger()
                toast.info("Please Add Address")
            }

        } catch (error) {
            errorAlert(error?.error)
        }
    }



    async function getMe() {
        try {
            const response = await dispatch(publicGetMe()).unwrap()
            const { email, mobile, first_name, last_name, addresses } = response
            const address = {}
            addresses?.forEach((addres) => {
                if (addres.is_default === 1) {
                    for (const [key, value] of Object.entries(addres)) {
                        address[key] = value
                    }
                }
            })
            const dat = {
                id: address?.id || null,
                name: first_name + last_name ? ` ${last_name}` : "",
                phone_number: mobile,
                same_address: 0,
                email: email,
                country: address?.country || "",
                state: address?.state || "",
                city: address?.city || "",
                street_name: address?.street_name || "",
                line1: address?.line1 || "",
                zipcode: address?.zipcode || "",
                address: address?.address || "",
            }
            setUser(dat)
        } catch (error) {
        }
    }

    useEffect(() => {
        getMe()
    }, [])

    useEffect(() => {
        getCartList()
    }, [user])


    useEffect(() => {
        if (cartData) {
            setCartList(cartData)
        }
    }, [cartData])


    return (
        <StyledContainer>
            <CustomBreadcrumbs breadcrumbs={breadcrumbs} />
            <CardTitle>Check Out</CardTitle>
            <Grid container spacing={2} >
                <Grid item lg={6}>
                    <BillingAddressForm
                        formHook={formHook}
                        user={user}
                        setUser={setUser}
                        setGuestAllow={setGuestAllow} />
                </Grid>
                <Grid item lg={6} sx={{
                    height: "100%",
                    display: 'flex',
                    justifyContent: "space-between",
                    alignItems: 'flex-start'
                }}>
                    <OrderSummary
                        loading={formHook.formState.isSubmitting}
                        valid={formHook.formState.isValid}
                        checkout={cartList} guest={guest}
                        handleSubmit={handleSubmit}
                        handleCheckOut={handleCheckOut}
                        handleCheckOutGuest={handleCheckOutGuest} />
                </Grid>
            </Grid>
            {
                popUp ? <Dialog title='Please Login' aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description" open={popUp}>
                    <DialogTitle id="alert-dialog-title">
                        {"Please Login"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            You are not Logged In, Please Login!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {
                            const path = cartId ? `/login?callBackUrl=/checkout&cart_id=${cartId}` : "/login?callBackUrl=/checkout"
                            navigate(path)
                        }}>Login</Button>
                        <Button onClick={() => {
                            setPopup(false)
                            setGuest(true)
                        }}>Guest Login</Button>
                    </DialogActions>

                </Dialog>
                    : null
            }
        </StyledContainer>

    )
})


const CardTitle = styled(Typography)`
    color: var(--gray-scale-gray-900, #1A1A1A);
text-align: center;

/* Heading 05/Heading 05 — 600 */
font-family: Poppins;
font-size: 32px;
font-style: normal;
font-weight: 600;
line-height: 120%; /* 38.4px */
`