import React from "react";
import StyledContainer from "../../../components/ecommerce/StyledContainer";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "../../../components/ecommerce/ProductCard";
import { useDispatch } from "react-redux";
import {
  addCartServices,
  cartViewServices,
  guestAddCartServices,
} from "../../../redux/api/public/cartServices";
import { toast } from "react-toastify";
import { errorAlert } from "../../../helpers/globalFunctions";
import { Container, styled } from "@mui/material";
import { Autoplay } from "swiper/modules";
import HomeTitle from "../../../components/ecommerce/HomeTitle";

export default function RelatedProduct({ relatedProduct }) {
  const dispatch = useDispatch();
  const token = localStorage.getItem("public_token") || null;
  const cart_id = localStorage.getItem("cart_id") || null;
  const addToCart = async (type = "add", product, quantity = 1) => {
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
  };
  return (
    <StyledContainer>
      <HomeTitle
        featured={{
          title: "Related Products",
        }}
        link={false}
      />
      <RelatedProductWrapper
        spaceBetween={30}
        slidesPerView={4}
        autoplay={{
          waitForTransition: 2000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        // breakpoints={{
        //   // when window width is >= 320px
        //   320: {
        //     slidesPerView: 1,
        //     spaceBetween: 30,
        //   },
        //   // when window width is >= 480px
        //   480: {
        //     slidesPerView: 2,
        //     spaceBetween: 30,
        //   },
        //   // when window width is >= 640px
        //   640: {
        //     slidesPerView: 3,
        //     spaceBetween: 40,
        //   },
        //   // when window width is >= 720px
        //   720: {
        //     slidesPerView: 4,
        //     spaceBetween: 40,
        //   },
        //   // when window width is >= 1200px
        //   1200: {
        //     slidesPerView: 4,
        //     spaceBetween: 40,
        //   },
        // }}
        // onSlid
        loop
        modules={[Autoplay]}
      >
        <Container>
          {relatedProduct.map((product) => {
            return (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} addToCart={addToCart} />
              </SwiperSlide>
            );
          })}
        </Container>
      </RelatedProductWrapper>
    </StyledContainer>
  );
}

const RelatedProductWrapper = styled(Swiper)(({}) => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "center",
  gap: "16px",
  padding: "30px 20px",
  width: "100%",
  marginBottom: "20px",
}));
