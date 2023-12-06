import { Container, styled } from '@mui/material'
import React from 'react'

const StyledContainer = ({children}) => {
  return (
    <MuiContainer maxWidth="xl" disableGutters>
        {children}
    </MuiContainer>
  )
}

export default StyledContainer


const MuiContainer = styled(Container)`
  /* overflow: hidden; */
`