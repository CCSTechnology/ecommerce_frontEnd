import { Box, Container, styled } from "@mui/material";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../../../components/ecommerce/ProductCard";
import HomeTitle from "../../../components/ecommerce/HomeTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import {
  addCartServices,
  cartViewServices,
  guestAddCartServices,
} from "../../../redux/api/public/cartServices";
import { toast } from "react-toastify";
import { errorAlert } from "../../../helpers/globalFunctions";

export default function HomeFeatured() {
  const { data: HomeFeaturedData } = useSelector(
    (state) => state.home.homeDataService
  );
  const products = HomeFeaturedData?.products || null;
  const productList = products?.product_details || [];
  const dispatch = useDispatch();

  const addToCart = useCallback(async (type = "add", product, quantity = 1) => {
    const cart_id = localStorage.getItem("cart_id") || null;
    const token = localStorage.getItem("public_token") || null;

    const message = "Product added successfully";
    if (token) {
      try {
        await dispatch(
          addCartServices({
            product_id: product?.id,
            quantity,
            type,
          })
        ).unwrap();

        toast.success(message);
      } catch (error) {
        errorAlert(error?.error);
      } finally {
        dispatch(
          cartViewServices({
            cart_id,
          })
        );
      }
    } else {
      try {
        const response = await dispatch(
          guestAddCartServices({
            cart_id,
            product_id: product?.id,
            quantity,
            type,
          })
        ).unwrap();
        if (response?.cartdetails) {
          localStorage.setItem("cart_id", response?.cartdetails.cart_id);
        }
        toast.success(message);
      } catch (error) {
        errorAlert(error?.error);
      } finally {
        dispatch(
          cartViewServices({
            cart_id,
          })
        );
      }
    }
  }, []);

  return (
    <FeaturedProductWrapper>
      <HomeTitle featured={products} />
      <HomeFeaturedList
        spaceBetween={30}
        // slidesPerView={4}
        autoplay={{
          waitForTransition: 2000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop
        breakpoints={{
          320: {
            slidesPerView: "auto",
          },
          600: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 2,
          },
          900: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 4,
          },
        }}
        modules={[Autoplay]}
      >
        <Container>
          {productList.map((product) => {
            return (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} addToCart={addToCart} />
              </SwiperSlide>
            );
          })}
        </Container>
      </HomeFeaturedList>
    </FeaturedProductWrapper>
  );
}

const FeaturedProductWrapper = styled(Box)`
  padding-inline: 20px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-block: 32px;
`;

const HomeFeaturedList = styled(Swiper)(({}) => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "center",
  gap: "16px",
  padding: "30px 20px",
  width: "100%",
}));
