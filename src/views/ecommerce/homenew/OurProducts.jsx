import { Box, Container, styled, Stack, Grid } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import {
  CartBag,
  product_1,
  product_2,
  product_3,
} from "../../../helpers/images";
import { useDispatch, useSelector } from "react-redux";
import { ImagePath } from "../../../utils/helpers";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import {
  addCartServices,
  cartViewServices,
  guestAddCartServices,
} from "../../../redux/api/public/cartServices";
import { toast } from "react-toastify";
import { errorAlert } from "../../../helpers/globalFunctions";
import { Link } from "react-router-dom";
const OurProducts = () => {
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
    <Box sx={{ background: "white" }}>
      <Grid container pt={5}>
        <Grid xs={12}>
          <Stack
            direction={"column"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            {/* <p className="our-products-new">Lorem ipsum dolor</p> */}
            <p className="our-products-new1">Our Products</p>
          </Stack>
        </Grid>
      </Grid>
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
            slidesPerView: 3,
          },
        }}
        modules={[Autoplay]}
      >
        {" "}
        <Container maxWidth={"xl"}>
          <Grid container pt={5}>
            {productList?.map((item) => {
              return (
                <SwiperSlide key={item.id}>
                  <Grid
                    item
                    md={4}
                    xs={12}
                    sx={{
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}

                    // onClick={() => addToCart("add", item)}
                  >
                    <Link to={"/product/" + item.unique_label}>
                      <img
                        src={ImagePath + item?.file_name}
                        className="our-products-image"
                      ></img>
                      <CartImgWrapper
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart("add", item, 1);
                        }}
                      >
                        <img loading="lazy" srcSet={CartBag} />
                      </CartImgWrapper>
                    </Link>
                  </Grid>
                </SwiperSlide>
              );
            })}
          </Grid>
        </Container>
      </HomeFeaturedList>
    </Box>
  );
};

export default OurProducts;
const HomeFeaturedList = styled(Swiper)(({}) => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "center",
  gap: "16px",
  padding: "30px 20px",
  width: "100%",
}));

const CartImgWrapper = styled(Box)(({ theme }) => ({
  background: "rgba(242, 242, 242, 1)",
  borderRadius: "50%",
  height: "40px",
  width: "40px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: `1px solid rgba(242, 242, 242, 1)`,
  ":hover": {
    border: `1px solid ${theme.palette.primary.main}`,
  },
  position: "absolute",
  right: "51px",
  bottom: "15px",
  img: {
    objectFit: "contain",
  },
}));
