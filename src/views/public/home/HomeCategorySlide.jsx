import Box from '@mui/material/Box'
import React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Autoplay, Pagination } from 'swiper/modules';
import { ImagePath } from '../../../utils/helpers';



function MediaCard({ category }) {
    return (
        <Card sx={{ maxWidth: 345, marginBlock: 4, marginInline: "auto", borderRadius: "5px" }}>
            <CardMedia
                sx={{ height: 180 }}
                image={ImagePath + category.category_image}
                title={category.label}
            />
            <CardContent>
                <Box gutterBottom variant="h5" component="div" sx={{
                    display: "flex",
                }}>
                    <Box component={'span'} sx={{
                        overflow: "hidden",
                        maxWidth: "120px",
                        textOverflow: "ellipsis",
                        "& span": {
                            whiteSpace: 'nowrap'
                        }
                    }}>
                        <span>
                            {category.label}
                        </span>
                    </Box>
                    {
                        category.gram && <Box>
                            | {'  '}
                            {category.gram}
                        </Box>
                    }


                </Box>
                <Typography variant="body2" color="text.secondary">
                    {category.price || "Rs 250 /-"}
                </Typography>
            </CardContent>
            <CardActions sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                maring: 0,
                padding: 0
            }}>
                <Button fullWidth sx={{
                    height: "100%",
                    borderRadius: "none"
                }} variant="contained" size="small">Add To Cart</Button>
            </CardActions>
        </Card>
    );
}



export default function HomeCategorySlide({ categories = [], title = "", subtitle }) {

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
            spaceBetween={50}
            slidesPerView={4}
            speed={3500}
            // navigation={true}
            loop={true}
            modules={[Autoplay]}

            className="mySwiper"
            autoplay={{
                delay: 2000,
                disableOnInteraction: true,
                pauseOnMouseEnter: true
            }}
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
                    slidesPerView: 4,
                    spaceBetween: 40
                },
                // when window width is >= 1200px
                1200: {
                    slidesPerView: 5,
                    spaceBetween: 40
                }
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

