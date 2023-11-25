import React from 'react'
import Topbar from './Topbar'
import Header from './Header'
import Navbar from './Navbar'
import StyledContainer from '../../components/ecommerce/StyledContainer'

const PublicHeader = () => {
  return (
    <StyledContainer>
      {/* <Topbar /> */}
      <Header />
      <Navbar />
    </StyledContainer>
  )
}

export default PublicHeader