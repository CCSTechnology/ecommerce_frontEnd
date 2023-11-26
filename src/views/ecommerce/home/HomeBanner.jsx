import { styled } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ImagePath } from '../../../utils/helpers';
import { Autoplay } from 'swiper/modules';


const HomeBanner = () => {
  const { data: BannerData } = useSelector((state) => state.home.homeDataService)
  const banners = BannerData?.banner || []
  return (
    <BannerWrapper>
      <Swiper
        slidesPerView={1}
        autoplay={{
          delay : 1000,
          // waitForTransition : 2000,
          disableOnInteraction: false,
          pauseOnMouseEnter : true
      }}
      loop
      modules={[Autoplay]}
      // onSlideChange={() => console.log('slide change')}
      // onSwiper={(swiper) => console.log(swiper)}
      >
        {
          banners.map((banner) => {
            const { image, id } = banner
            return <BannerSlide key={id}>
              <BannerImg src={ImagePath + image} />
            </BannerSlide>
          })
        }
      </Swiper>
    </BannerWrapper>
  )
}

export default HomeBanner


const BannerWrapper = styled('div')`
  height: 100%;
  `


const BannerSlide = styled(SwiperSlide)`
height: 600px;
display: flex;
align-items: center;
justify-content: center;
`

const BannerImg = styled('img')`
  height: 100%;
  width: 100%;
  object-fit: cover;
`



