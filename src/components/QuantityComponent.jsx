import { Box, styled } from "@mui/material"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { addCartServices, cartViewServices, guestAddCartServices } from "../redux/api/public/cartServices"
import { toast } from "react-toastify"
import { errorAlert } from "../helpers/globalFunctions"

export default function QuantityComponent({ product = null, setQuantity, quantity, finishApi = () => { }, cartType }) {
  const token = localStorage.getItem('public_token') || null
  const cart_id = localStorage.getItem('cart_id') || null

  const dispatch = useDispatch()
  const addToCart = async (type = "add") => {
    const message = type === "add" ? "Product added successfully" : "Product reduced successfully"
    if (token) {
      try {
        await dispatch(addCartServices({
          product_id: type === "add" ? product?.product_id : product?.id,
          quantity: 1,
          type,
        })).unwrap()
        finishApi()

        setQuantity((state) => type === "add" ? state + 1 : state - 1)
        toast.success(message)
      } catch (error) {
        errorAlert(error?.error)
      } finally {
        dispatch(cartViewServices({
          cart_id
        }))
      }
    } else {
      try {
        const response = await dispatch(guestAddCartServices({
          cart_id,
          product_id: type === "add" ? product?.product_id : product?.id,
          quantity: 1,
          type
        })).unwrap()
        finishApi()
        setQuantity((state) => type === "add" ? state + 1 : state - 1)
        if (response?.cartdetails) {
          localStorage.setItem('cart_id', response?.cartdetails.cart_id)
        }
        toast.success(message)
      } catch (error) {
        errorAlert(error?.error)
      } finally {
        dispatch(cartViewServices({
          cart_id
        }))
      }
    }
  }
  return <QuantityComponentWrapper>
    <ADDMINUS onClick={(e) => {
      e.preventDefault()
      if (cartType === "product") {
        setQuantity((state) => state - 1)
      } else {
        if (quantity > 1) {
          addToCart('minus')
        }
      }
    }}>-</ADDMINUS>
    <Input>{quantity}</Input>
    <ADDMINUS onClick={(e) => {
      if (cartType === "product") {
        setQuantity((state) => state + 1)
      } else {
        addToCart('add')
      }
    }}>+</ADDMINUS>
  </QuantityComponentWrapper>
}

const QuantityComponentWrapper = styled(Box)`
display: flex;
padding: 8px;
justify-content: center;
align-items: center;
width: 108px;
height: 45px;
padding: 2px;
border-radius: 170px;
border: 1px solid var(--gray-scale-gray-100, #E6E6E6);
background: var(--gray-scale-white, #FFF);

`

const ADDMINUS = styled(Box)`
  background: var(--gray-scale-gray-50, #F2F2F2); 
  width: 34px;
    height: 34px; 
    border-radius: 170px;
    display: flex;
  align-items:  center;
  justify-content: center;
  cursor: pointer;
`
const Input = styled('p')`
outline: none;
border: none;
display: flex;
justify-content: center;
background: transparent;
width: 20px;
`