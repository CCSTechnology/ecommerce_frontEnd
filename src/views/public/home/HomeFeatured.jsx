import Box from '@mui/material/Box'
import React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Autoplay } from 'swiper/modules';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { ImagePath } from '../../../utils/helpers';




function MediaCard({ products }) {
    return (
        <Card sx={{ maxWidth: 345, marginBlock: 4, marginInline: "auto", borderRadius: "5px" }}>
            <CardMedia
                sx={{ height: 180 }}
                image={ImagePath + products.file_name}
                title={products.product_name}
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
                            {products.product_name}
                        </span>
                    </Box>
                    {
                        products.gram && <Box>
                            | {'  '}
                            {products.gram}
                        </Box>
                    }


                </Box>
                <Typography variant="body2" color="text.secondary">
                   Rs: {products.cost}/-
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



export default function HomeFeatured({ products }) {

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
                {products.subtitle && <Typography color={'#951e76'} sx={{
                    borderLeft: "4px solid",
                    fontWeight: "600",
                    paddingLeft: "10px"
                }} variant='h5'>{products.subtitle}</Typography>}

            </Box>
            <Box component={'p'} sx={{
                fontSize: "24px",
                fontWeight: "700",
                fontFamily: "Barlow",
                "& span": {
                    color: "#9f4103",

                }
            }}>{String(products?.title || '').split(' ').map((titles, index, array) => {
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
            {products.product_details?.map((products, index) => {
                return (
                    <SwiperSlide key={index}>
                        <MediaCard products={products} />
                    </SwiperSlide>
                )
            })}
        </Swiper>
    </Container >

}

