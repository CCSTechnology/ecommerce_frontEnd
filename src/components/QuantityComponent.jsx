import { Box, styled } from "@mui/material"

export default function QuantityComponent(){
    return <QuantityComponentWrapper>
        <ADDMINUS>-</ADDMINUS>
        <Input>1</Input>
        <ADDMINUS>+</ADDMINUS>
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