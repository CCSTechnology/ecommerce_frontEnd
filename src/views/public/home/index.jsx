import React, { useEffect } from 'react'
import { Stack } from "@mui/material"
import HomeBanner from './HomeBanner'
import homeData from '../../../db/home'
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
  const categories = useSelector((state) => state.home.homeDataService.data)
  function fetchHomeContent() {
    Promise.all([dispatch(homeDataService())])
  }


  useEffect(() => {
    fetchHomeContent()
  }, [])

  return (
    <Stack gap={5}>
      <HomeBanner banners={homeData.banner} />
      {
        categories && <>
          <HomeCategorySlide categories={categories} title="Our Products" subtitle={"WHAT WE DO"} />
          <HomeFeatured categories={categories} title="Our Products" subtitle={"WHAT WE DO"} />
        </>
      }

      <HomeAboutUs />



    </Stack>
  )
}

export default Home