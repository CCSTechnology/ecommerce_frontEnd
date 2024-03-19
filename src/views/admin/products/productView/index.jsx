import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Skeleton,
  Stack,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { authEndPoints } from "../../../../helpers/endpoints";
import { useDispatch, useSelector } from "react-redux";
import { errorAlert } from "../../../../helpers/globalFunctions";
import { useParams } from "react-router-dom";
import "./style.css";
import TopBreaccrumb from "../../../../components/TopBreadcrumb";
import { viewProductData } from "../../../../redux/api/admin/productService";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import Container from "@mui/material/Container";

function MediaCard({ products }) {
  const imageUrl = import.meta.env.REACT_APP_IMG_URL;
  console.log(products);
  return (
    <Card
      sx={{
        maxWidth: 345,
        marginBlock: 4,
        marginInline: "auto",
        borderRadius: "5px",
      }}
    >
      <CardMedia
        sx={{ height: 180 }}
        image={imageUrl + products?.file_name}
        title={products?.product_name}
      />

      <CardContent>
        <Box
          gutterBottom
          variant="h5"
          component="div"
          sx={{
            display: "flex",
          }}
        >
          <Box
            component={"span"}
            sx={{
              overflow: "hidden",
              maxWidth: "120px",
              textOverflow: "ellipsis",
              "& span": {
                whiteSpace: "nowrap",
              },
            }}
          >
            <span>{products?.product_name}</span>
          </Box>
          {/* {products.gram && (
            <Box>
              | {"  "}
              {products.gram}
            </Box>
          )} */}
        </Box>
        <Typography variant="body2" color="text.secondary">
          Rs: {products?.cost}/-
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          maring: 0,
          padding: 0,
        }}
      >
        <Button
          fullWidth
          sx={{
            height: "100%",
            borderRadius: "none",
          }}
          variant="contained"
          size="small"
        >
          Add To Cart
        </Button>
      </CardActions>
    </Card>
  );
}

const ProductView = (props) => {
  let { id } = useParams();

  const dispatch = useDispatch();
  const productViewData = useSelector(
    (state) => state.adminProduct.viewProduct
  );
  console.log(productViewData);
  const [unique, setUnique] = useState(null);
  const imageUrl = import.meta.env.VITE_APP_IMG_URL;
  //list api
  const viewProduct = async () => {
    const parameters = {
      url: `${authEndPoints.product.productView(id)}`,
    };
    try {
      const res = await dispatch(viewProductData(parameters)).unwrap();
    } catch (errors) {
      errorAlert(errors?.error);
    }
  };
  useEffect(() => {
    viewProduct();
  }, [unique]);
  return (
    <>
      <Box className="indexBox">
        <TopBreaccrumb title={"Product List"} to={`/admin/products`} />
        <Grid
          container
          spacing={2}
          sx={{ my: 4 }}
          justifyContent="center"
          alignItems="center"
        >
          <Grid
            item
            xs={12}
            sm={12}
            md={8}
            lg={6}
            sx={{ backgroundColor: "#951e76", my: 4 }}
          >
            <Stack direction={"column"} gap={1} alignItems={"center"}>
              {!productViewData?.loading ? (
                <Avatar
                  src={
                    imageUrl + productViewData?.data?.data?.product?.file_name
                  }
                  sx={{ width: 60, height: 60 }}
                />
              ) : (
                <Skeleton variant="circular" width={60} height={60} />
              )}
              <Typography sx={{ mb: 2, color: "white" }}>
                {!productViewData?.loading ? (
                  `${productViewData?.data?.data?.product?.product_name}`
                ) : (
                  <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                )}
              </Typography>
            </Stack>
            <Grid container justifyContent="center" alignItems="center">
              <Grid
                item
                xs={12}
                sm={10}
                md={11}
                sx={{ border: "1px solid white", mb: 4 }}
              >
                <Grid container>
                  <Grid item xs={12} sm={5} md={5}>
                    <Box className="viewLeftSide">
                      <Typography sx={{ py: 2, color: "white" }}>
                        Name
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={7} md={7}>
                    <Box className="viewRightSide">
                      <Typography sx={{ py: 2, color: "white" }}>
                        {!productViewData?.loading ? (
                          productViewData?.data?.data?.product?.product_name
                        ) : (
                          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                        )}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12} sm={5} md={5}>
                    <Box className="viewLeftSide">
                      <Typography sx={{ py: 2, color: "white" }}>
                        Cost
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={7} md={7}>
                    <Box className="viewRightSide">
                      <Typography sx={{ py: 2, color: "white" }}>
                        {!productViewData?.loading ? (
                          productViewData?.data?.data?.product?.cost
                        ) : (
                          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                        )}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12} sm={5} md={5}>
                    <Box className="viewLeftSide">
                      <Typography sx={{ py: 2, color: "white" }}>
                        Category
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={7} md={7}>
                    <Box className="viewRightSide">
                      <Typography sx={{ py: 2, color: "white" }}>
                        {!productViewData?.loading ? (
                          productViewData?.data?.data?.product?.categoryname
                        ) : (
                          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                        )}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12} sm={5} md={5}>
                    <Box className="viewLeftSide">
                      <Typography sx={{ py: 2, color: "white" }}>
                        Weight In Grams
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={7} md={7}>
                    <Box className="viewRightSide">
                      <Typography sx={{ py: 2, color: "white" }}>
                        {!productViewData?.loading ? (
                          productViewData?.data?.data?.product?.weight * 1000
                        ) : (
                          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                        )}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12} sm={5} md={5}>
                    <Box className="viewLeftSide" height={100}>
                      <Typography sx={{ py: 2, color: "white" }}>
                        SKU
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={7} md={7}>
                    <Box className="viewRightSide" height={100}>
                      <Typography sx={{ py: 2, color: "white" }}>
                        {!productViewData?.loading ? (
                          productViewData?.data?.data?.product?.sku
                        ) : (
                          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                        )}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12} sm={5} md={5}>
                    <Box className="viewLeftSide">
                      <Typography sx={{ py: 2, color: "white" }}>
                        Description
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={7} md={7}>
                    <Box className="viewRightSide">
                      <Typography sx={{ py: 2, color: "white" }}>
                        {!productViewData?.loading ? (
                          productViewData?.data?.data?.product?.description
                        ) : (
                          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                        )}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Typography
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
            marginBottom: "20px",
          }}
        >
          Related Products
        </Typography>
        <Box>
          <Container maxWidth="lg">
            <Grid>
              <Box
                sx={{
                  textAlign: "center",
                }}
              >
                <Box
                  sx={{
                    display: " flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  {/* {products.subtitle && (
                    <Typography
                      color={"#951e76"}
                      sx={{
                        borderLeft: "4px solid",
                        fontWeight: "600",
                        paddingLeft: "10px",
                      }}
                      variant="h5"
                    >
                      {products.subtitle}
                    </Typography>
                  )} */}
                </Box>
                <Box
                  component={"p"}
                  sx={{
                    fontSize: "24px",
                    fontWeight: "700",
                    fontFamily: "Barlow",
                    "& span": {
                      color: "#9f4103",
                    },
                  }}
                >
                  {/* {String(products?.title || "")
                    .split(" ")
                    .map((titles, index, array) => {
                      return (
                        index === 0 && (
                          <>
                            <span>{array[0]}</span> <>{array[1]}</>
                          </>
                        )
                      );
                    })} */}
                </Box>
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
                  pauseOnMouseEnter: true,
                }}
                breakpoints={{
                  // when window width is >= 320px
                  320: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                  },
                  // when window width is >= 480px
                  480: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                  },
                  // when window width is >= 640px
                  640: {
                    slidesPerView: 3,
                    spaceBetween: 40,
                  },
                  // when window width is >= 720px
                  720: {
                    slidesPerView: 4,
                    spaceBetween: 40,
                  },
                  // when window width is >= 1200px
                  1200: {
                    slidesPerView: 4,
                    spaceBetween: 40,
                  },
                }}
                // onSlideChange={() => console.log('slide change')}
                // onSwiper={(swiper) => console.log(swiper)}
              >
                {productViewData?.data?.data?.related_product?.map(
                  (item, index) => (
                    <SwiperSlide key={index}>
                      {console.log(item)}
                      <MediaCard products={item} />
                    </SwiperSlide>
                  )
                )}
              </Swiper>
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default ProductView;
