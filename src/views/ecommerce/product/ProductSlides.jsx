import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
// import "./slide.css"
import { ImagePath } from "../../../utils/helpers";
import { Box, Typography, styled } from "@mui/material";
import imageUrl from "../../../assets/images/images_offer2.png";
export default function ProductSlides({ product }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <ProductSlidesWrapper>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs]}
      >
        <SwiperSlide className="main-image">
          <img
            loading="lazy"
            style={{
              objectFit: "contain",
            }}
            src={ImagePath + product?.file_name}
          />
        </SwiperSlide>
        {product?.promotion && (
          <Box
            sx={{
              // background: "#f5eded",
              position: "relative",
              bottom: "450px",
              left: "520px",
              width: "70px",
              borderRadius: "40px",
              height: "65px",
              backgroundImage: `url(${imageUrl})`, // Use template literals to insert the URL
              backgroundSize: "cover", // Optional: Adjust background size
              backgroundPosition: "center", // Optional: Adjust background position
              zIndex: 100,
            }}
          >
            <Typography
              sx={{
                position: "absolute",
                top: "11px",
                left: "23px",
                fontWeight: 600,
                color: "white",
              }}
            >
              {product.promotion.percentage} % OFF
            </Typography>
          </Box>
        )}
        {product?.secondary_image && (
          <SwiperSlide>
            <img loading="lazy" src={ImagePath + product?.secondary_image} />
          </SwiperSlide>
        )}
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
        <SwiperSlide className="thumbnail-img">
          <img loading="lazy" src={ImagePath + product?.file_name} />
        </SwiperSlide>
        {product?.secondary_image && (
          <SwiperSlide className="thumbnail-img">
            <img loading="lazy" src={ImagePath + product?.secondary_image} />
          </SwiperSlide>
        )}
      </Swiper>
    </ProductSlidesWrapper>
  );
}

const ProductSlidesWrapper = styled(Box)`
  margin-bottom: 20px;
  .main-image {
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
`;
