import React, { useEffect } from 'react'
import { Stack } from "@mui/material"
import HomeBanner from './HomeBanner'
// import homeData from '../../../db/home'
import HomeCategorySlide from './HomeCategorySlide'
import { homeDataService } from '../../../redux/api/public/homeService'
import {
  useDispatch, useSelector
} from "react-redux"
import './home.css'
import HomeFeatured from './HomeFeatured'
import HomeAboutUs from './HomeAboutUs'

const Home = () => {
  const dispatch = useDispatch()
  const homeData = useSelector((state) => state.home.homeDataService.data)
  function fetchHomeContent() {
    Promise.all([dispatch(homeDataService())])
  }


  useEffect(() => {
    fetchHomeContent()
  }, [])

  return (
    <Stack gap={5}>
      {
        homeData && <>
          <HomeBanner banners={homeData.banner || []} />
          <HomeCategorySlide category={homeData?.category || null} />
          <HomeFeatured products={homeData?.products || null} />
          <HomeAboutUs  aboutUs={homeData?.about_us || null}/>
        </>
      }




    </Stack>
  )
}

export default Home