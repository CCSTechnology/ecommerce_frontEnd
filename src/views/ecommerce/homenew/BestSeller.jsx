import {
  Box,
  Container,
  styled,
  Stack,
  Grid,
  Card,
  Button,
} from "@mui/material";
import React, { useCallback, useEffect } from "react";
import {
  best_seller1,
  best_seller2,
  best_seller3,
  best_seller4,
  product_1,
  product_2,
  product_3,
} from "../../../helpers/images";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import {
  addCartServices,
  cartViewServices,
  guestAddCartServices,
} from "../../../redux/api/public/cartServices";
import { toast } from "react-toastify";
import { errorAlert } from "../../../helpers/globalFunctions";
import { ImagePath } from "../../../utils/helpers";

const BestSeller = () => {
  const { data: HomeFeaturedData } = useSelector(
    (state) => state.home.homeDataService
  );

  const products = HomeFeaturedData?.products || null;
  const productList = products?.product_details || [];
  console.log(productList, "ggg");

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
        <Grid md={12}>
          <Stack direction={"column"}>
            {/* <p className="our-products-new">Lorem ipsum dolor</p> */}
            <p className="our-products-new1">BEST SELLERS</p>
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
            slidesPerView: 4,
          },
        }}
        modules={[Autoplay]}
      >
        {" "}
        <Container maxWidth={"lg"}>
          <Grid container pt={7} display={"flex"} pb={4}>
            {productList?.map((item, index) => (
              <SwiperSlide key={item.id}>
                {" "}
                <Grid item md={3} pl={2}>
                  <Box>
                    <img
                      src={ImagePath + item.file_name}
                      className="our-products-image"
                    ></img>
                    <Stack direction={"column"} textAlign={"center"} gap={1}>
                      <p className="best_seller1" style={{ marginTop: "20px" }}>
                        {item?.product_name}
                      </p>
                      <p className="best_seller2">{item?.categoryname}</p>
                      <p className="best_seller3">SKU:{item?.sku}</p>
                      <p className="best_seller4">₹ {item?.cost}</p>
                    </Stack>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        sx={{
                          background: "#951e76",
                          color: "white",
                          borderRadius: "24px",
                          px: 3,
                          mt: 2,
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart("add", item, 1);
                        }}
                      >
                        Add to Cart
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              </SwiperSlide>
            ))}
          </Grid>
        </Container>
      </HomeFeaturedList>
    </Box>
  );
};

export default BestSeller;
const HomeFeaturedList = styled(Swiper)(({}) => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "center",
  gap: "16px",
  padding: "30px 20px",
  width: "100%",
}));
