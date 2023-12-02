import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
// import "./slide.css"
import { ImagePath } from '../../../utils/helpers';
import { Box, styled } from '@mui/material';


export default function ProductSlides({product}) {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
  
    return (
      <ProductSlidesWrapper>
      
        <Swiper
          style={{
            '--swiper-navigation-color': '#fff',
            '--swiper-pagination-color': '#fff',
          }}
          loop={true}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          modules={[FreeMode, Navigation, Thumbs]}
        >
          <SwiperSlide className='main-image'>
            <img loading='lazy'style={{
              objectFit : "contain"
            }}  src={ ImagePath + product?.file_name} />
          </SwiperSlide>
          {
            product?.secondary_image &&  <SwiperSlide>
            <img loading='lazy' src={ImagePath + product?.secondary_image} />
          </SwiperSlide>
          }
        </Swiper>
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className=""
        >
          <SwiperSlide className='thumbnail-img'>
            <img loading='lazy' src={ ImagePath + product?.file_name} />
          </SwiperSlide>
          {
            product?.secondary_image &&  <SwiperSlide className='thumbnail-img'>
            <img loading='lazy' src={ImagePath + product?.secondary_image} />
          </SwiperSlide>
          }
        </Swiper>
      </ProductSlidesWrapper>
    );
  }


  const ProductSlidesWrapper = styled(Box)`
    .main-image  {
      img {
        height: 450px;
        width: 100%;
      }
    }

    .thumbnail-img {
      img {
        height: 100px;
        width: 100px;
      }
    }
  `



