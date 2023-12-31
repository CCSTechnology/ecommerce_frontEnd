import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartViewServices, checkOutWithGuest, checkOutWithUser } from '../../../redux/api/public/cartServices';

import { useForm } from 'react-hook-form';
// import { CheckOutProduct } from '../../../components/CheckoutProduct';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import CustomBreadcrumbs from '../../../components/ecommerce/Breadcrumps';
import { errorAlert } from '../../../helpers/globalFunctions';
import { publicGetMe } from '../../../redux/api/public/authService';
import CartProductCard from '../cart/CartProductCard';


export default function CheckOutAddressForm() {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [popUp, setPopup] = useState(false)
	const { data: cartData } = useSelector((state) => state.cart.cartViewServices)
	const [user, setUser] = useState(null)
	const [guest, setGuest] = useState(null)
	const cartList = cartData?.details || []
	const cartId = localStorage.getItem('cart_id') || null
	const [guestAllow, setGuestAllow] = useState(null)

	function getCartList() {
		dispatch(cartViewServices({
			cart_id: cartId
		}))
	}

	const {  handleSubmit } = useForm({
		defaultValues: {

		}
	})

	const { ...AddressForm } = useForm({
		defaultValues: {

		}
	})




	async function handleCheckOut() {
		try {
			//Valid User
			if (user) {
				const response = await dispatch(checkOutWithUser({
					billing_address_id: 1,
					shipping_address_id: 1,
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
			const { trigger, formState: { isValid } } = AddressForm

			if (isValid) {
				const response = await dispatch(checkOutWithGuest({
					billing_address_id: guestAllow?.billing_id,
					shipping_address_id: guestAllow?.billing_id,
					cart_id: cartId,
					delivery_charges: 0,
					guest_id: 10
				})).unwrap()
				window.location.href = response.payment_details
			} else {
				trigger()
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
			errorAlert(error?.error)
		}
	}

	useEffect(() => {
		getMe()
		getCartList()
	}, [])



	return (
		<Box sx={{
			padding : "0 0 40px 20px"
		}}>
			 <CustomBreadcrumbs />
      			<CardTitle>Check Out</CardTitle>
			<Grid container spacing={2} alignItems={'center'}>
				<Grid item lg={6}>
					{
						cartList?.map((cart, index) => {
							return <CartProductCard product={cart} key={index} />
						})
					}
					{
						guest === true ? <form onSubmit={handleSubmit(handleCheckOutGuest)}>

							<Button type='submit' variant='contained' >
								Guest Check out
							</Button>
						</form> : <form onSubmit={handleSubmit(handleCheckOut)}>

							<Button type='submit' variant='contained' >
								Check out
							</Button>
						</form>
					}
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


				</Grid>
			</Grid>
		</Box>

	)
}


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