import { Box, Typography, styled } from '@mui/material'
import React from 'react'
import StyledContainer from '../../../components/ecommerce/StyledContainer'
import ChangePassword from '../../../components/changePassword'

export default function ChangePasswordPage() {
  return (
    <StyledContainer>
      <Box display={'flex'} justifyContent={'center'} flexDirection={'column'} alignItems={'center'} margin={'auto'} height={'100%'} marginY={10}>
        <ChangePassword />
      </Box>
    </StyledContainer>
  )
}


const Title = styled(Typography)`
  text-align: center;
  font-weight: 500;
  margin-bottom: 30px;
`