import Box from '@mui/material/Box'
import React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Autoplay } from 'swiper/modules';
import { ImagePath } from '../../../utils/helpers';
import { Link } from 'react-router-dom';



function MediaCard({ category }) {
    return (
        <Box className="services-style-two">
                <div className="services-style-two-item text-center">
                  <div className="info">
                    <div className="thumb">
                      <img src={ImagePath + category.category_image} alt="Image" className="img-fluid" />
                    </div>
                  </div>
                  <div className="content-wrap">
                    <div className="icon-wrap">
                      <div className="master-icon">
                        <img src={'https://truevinefoods.com/wp-content/uploads/2023/07/ready.png'} alt="Image" className="img-fluid" width="40" />
                      </div>
                    </div>
                    <h5 className="title">
                      <Link href={category.link}>{category.label}</Link>
                    </h5>
                  </div>
                </div>
              </Box>
    );
}



export default function HomeFeatured({ categories = [], title = "", subtitle = "" }) {

    return <Container maxWidth="lg">
        <Box sx={{
            textAlign: "center"
        }}>
            <Box sx={{
                display: " flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
            }}>
                <Typography color={'#951e76'} sx={{
                    borderLeft: "4px solid",
                    fontWeight: "600",
                    paddingLeft: "10px"
                }} variant='h5'>{subtitle}</Typography>
            </Box>
            <Box component={'p'} sx={{
                fontSize: "24px",
                fontWeight: "700",
                fontFamily: "Barlow",
                "& span": {
                    color: "#9f4103",

                }
            }}>{String(title).split(' ').map((titles, index, array) => {
                return index === 0 && <>
                    <span>{array[0]}</span>
                    {' '}
                    <>{array[1]}</>
                </>
            })}</Box>

        </Box>
        <Swiper
            speed={3500}
            // navigation={true}
            loop={true}
            // modules={[Autoplay]}

            className="mySwiper"
            // autoplay={{
            //     delay: 2000,
            //     disableOnInteraction: true,
            //     pauseOnMouseEnter: true
            // }}
            breakpoints={{
                // when window width is >= 320px
                320: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                // when window width is >= 480px
                480: {
                    slidesPerView: 2,
                    spaceBetween: 30
                },
                // when window width is >= 640px
                640: {
                    slidesPerView: 3,
                    spaceBetween: 40
                },
                // when window width is >= 720px
                720: {
                    slidesPerView: 3,
                    spaceBetween: 40
                },
                 // when window width is >= 720px
                1200: {
                    slidesPerView: 4,
                    spaceBetween: 40
                },
               
            }
            }
        // onSlideChange={() => console.log('slide change')}
        // onSwiper={(swiper) => console.log(swiper)}
        >
            {categories?.data?.map((category, index) => {
                return (
                    <SwiperSlide key={index}>
                        <MediaCard category={category} />
                    </SwiperSlide>
                )
            })}
            {categories?.data?.map((category, index) => {
                return (
                    <SwiperSlide key={index}>
                        <MediaCard category={category} />
                    </SwiperSlide>
                )
            })}
            {categories?.data?.map((category, index) => {
                return (
                    <SwiperSlide key={index}>
                        <MediaCard category={category} />
                    </SwiperSlide>
                )
            })}
        </Swiper>
    </Container >

}

