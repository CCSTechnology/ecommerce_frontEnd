import { Box, styled } from '@mui/material'
import React, { useEffect } from 'react'
import StyledContainer from '../../../components/ecommerce/StyledContainer'
import HomeBanner from './HomeBanner'
import { useDispatch } from 'react-redux'
import { homeDataService } from '../../../redux/api/public/homeService'
import HomeDelivery from './HomeDelivery'
import HomeCategory from './HomeCategory'
import HomeFeatured from './HomeFeatured'

const Home = () => {
  const dispatch = useDispatch()
  const HomeApi = () => {
    dispatch(homeDataService())
  }
  useEffect(() => {
    HomeApi()
  }, [])

  return (
    <StyledContainer>
      <HomeWrapper>
        <HomeBanner />
        <HomeDelivery />
        <HomeCategory />
        <HomeFeatured />
      </HomeWrapper>
    </StyledContainer>
  )
}

export default Home

const HomeWrapper = styled(Box)(({ }) => ({
}))