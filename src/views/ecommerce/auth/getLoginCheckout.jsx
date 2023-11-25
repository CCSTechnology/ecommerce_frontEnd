import React, { useEffect, useState } from 'react'
import { Box, Button, Dialog, Grid } from '@mui/material';
import GuestLoginForm from './getLoginPopUp';
import { useDispatch, useSelector } from 'react-redux';
import { cartViewServices, checkOutWithGuest, checkOutWithUser } from '../../../redux/api/public/cartServices';

import { useForm } from 'react-hook-form';
import { CheckOutProduct } from '../../../components/CheckoutProduct';
import { publicGetMe } from '../../../redux/api/public/authService';
import { useNavigate } from 'react-router-dom';


export default function GetLoginCheckout() {
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

	const { reset, handleSubmit } = useForm({
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
				console.log(user, "user")
				const response = await dispatch(checkOutWithUser({
					billing_address_id: 1,
					shipping_address_id: 1,
					delivery_charges: 0,
					cart_id: ""
				})).unwrap()
				console.log(response, "response")
				window.location.href = response.payment_details
			}
			//Expries Token
			else {

				setPopup(true)
				// navigate('/login=callBackUrl=/checkout')
			}


		} catch (error) {
			console.log(error, "error")
		}
	}

	async function handleCheckOutGuest(values) {
		try {
			const { trigger, formState: { isValid } } = AddressForm
			
			if (isValid) {
				const response = await dispatch(checkOutWithGuest({
					billing_address_id : guestAllow?.billing_id,
					shipping_address_id : guestAllow?.billing_id,
					cart_id : cartId,
					delivery_charges : 0,
					guest_id : 10
				})).unwrap()
				console.log(response, "response")
				window.location.href = response.payment_details
			}else {
				trigger()
				// setGuest(true)
			}

		} catch (error) {
			console.log(error, "error")
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
			// reset(dat)
		} catch (error) {
			// setGuest(true)
			console.log(error, "error")
		}
	}

	useEffect(() => {
		getMe()
		getCartList()
	}, [])



	return (
		<Grid container spacing={2} alignItems={'center'}>
			<Grid item lg={6}>
				<GuestLoginForm user={user} getMe={getMe} formHook={AddressForm} setGuestAllow={setGuestAllow} />
			</Grid>
			<Grid item lg={6}>
				{
					cartList?.map((cart, index) => {
						return <CheckOutProduct product={cart} key={index} />
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
				{/* <form onSubmit={handleSubmit(handleCheckOut)}>
					
					<Button type='submit' variant='contained' >
						{
							!guest ? "Check Out" : "Guest Check Out"
						}
					</Button>
				</form> */}
				{
					popUp ? <Dialog open={popUp}>
						<Button onClick={() => {
							const path = cartId ? `/login?callBackUrl=/checkout&cart_id=${cartId}` : "/login?callBackUrl=/checkout"
							navigate(path)
						}}>Login</Button>
						<Button onClick={() => {
							setGuest(true)
							setPopup(false)
						}}>Guest Login</Button>
					</Dialog> : null
				}


			</Grid>
		</Grid>
	)
}