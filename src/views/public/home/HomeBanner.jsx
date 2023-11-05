import Box from '@mui/material/Box'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { ImagePath } from '../../../utils/helpers';



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
                    const path = ImagePath + banner.image
                    console.log(path)
                    return <SwiperSlide key={index}>
                        <Box sx={{
                            height: "590px",
                            maxHeight : "90vh",
                            backgroundImage :`url(${path})`,
                            backgroundPosition : "center",
                            backgroundSize : "100% 100%",
                            backgroundRepeat : "no-repeat",

                        }}>
                            {/* <img src={ImagePath + banner.image} alt="" /> */}
                        </Box>
                    </SwiperSlide>
                })
            }
        </Swiper>
    </Box>


}

