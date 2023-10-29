import Box from '@mui/material/Box'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';



export default function HomeBanner({ banners = [] }) {

    return <Box sx={{
        height: "100%",
        width: "100%",
    }}>
        <Swiper
            // spaceBetween={50}
            slidesPerView={1}
            pagination={{
                clickable: true
            }}
            loop={true}
            navigation={true}
            modules={[Pagination, Navigation]}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
        >
            {
                banners.map((banner, index) => {
                    return <SwiperSlide key={index}>
                        <Box sx={{
                            "& img": {
                                height: "100%",
                                width: "100%"
                            }
                        }}>
                            <img src={banner.image} alt="" />
                        </Box>
                    </SwiperSlide>
                })
            }
        </Swiper>
    </Box>


}

