import { Box, styled } from "@mui/material"
import { useState } from "react"

export default function QuantityComponent({quantity = 1, setQuantity}){
    return <QuantityComponentWrapper>
        <ADDMINUS onClick={(e)=>{
          e.preventDefault()
          if(quantity > 1){
            setQuantity((state)=> state -1)
          }
        }}>-</ADDMINUS>
        <Input>{quantity}</Input>
        <ADDMINUS onClick={(e)=>{
          e.preventDefault()
          setQuantity((state)=>state + 1)
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