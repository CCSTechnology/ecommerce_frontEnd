import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { ImagePath } from '../utils/helpers';

export function CheckOutProduct({ product }) {
	const { products, quantity, total_amount } = product
	const { file_name, product_name, } = products
	return <CheckOutProductWrapper >
		<CheckOutProductImg>

			<img loading='lazy' src={ImagePath + file_name}></img>
		</CheckOutProductImg>
		<ProductDetails>
			<div>{product_name}</div>
			<div>Quantity : {quantity}</div>
			<div>Amount: ₹ {Number(total_amount).toFixed(2)}</div>
		</ProductDetails>
	</CheckOutProductWrapper>
}


const CheckOutProductWrapper = styled(Box)`
	display: flex;
	align-items: center;
	gap: 10px;

`

const CheckOutProductImg = styled(Box)`
	height: 150px;
	width: 150px;
	
	img {
		height: 100%;
		width: 100%;
		object-fit: contain;

	}
`

const ProductDetails = styled(Box)`
display: flex;
flex-direction: column;
justify-content: space-evenly;
height: 150px;

`