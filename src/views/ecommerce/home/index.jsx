import { Box, styled } from '@mui/material'
import React, { useEffect } from 'react'
import StyledContainer from '../../../components/ecommerce/StyledContainer'
import HomeBanner from './HomeBanner'
import { useDispatch } from 'react-redux'
import { homeDataService } from '../../../redux/api/public/homeService'
import HomeDelivery from './HomeDelivery'
import HomeCategory from './HomeCategory'
import HomeFeatured from './HomeFeatured'
import HomeAboutUs from './HomeAboutUs'
import HomeVideo from './HomeVideo'
import HomeSubBanner from './HomeSubBanner'
import HomeTestimonials from './HomeTestimonials'

export default function Home(){
  const dispatch = useDispatch()
  const HomeApi = async () => {
    try {
     await dispatch(homeDataService()).unwrap()
    } catch (error) {
    }
  }
  useEffect(() => {
    HomeApi()
  }, [])

  return (
    <StyledContainer>
       <HomeWrapper>
        <HomeBanner />
        <HomeDelivery />
        {/* <HomeCategory /> */}
        <HomeFeatured />

        <HomeVideo />
        <HomeTestimonials />
        <HomeAboutUs />
      </HomeWrapper> 
    </StyledContainer>
  )
}

const HomeWrapper = styled(Box)(({ }) => ({
}))