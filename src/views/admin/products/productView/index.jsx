import React, { useEffect, useState } from "react";
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { authEndPoints } from "../../../../helpers/endpoints";
import { useDispatch, useSelector } from "react-redux";
import { errorAlert } from "../../../../helpers/globalFunctions";
import { Link, useParams } from "react-router-dom";
import "./style.css";
import TopBreaccrumb from "../../../../components/TopBreadcrumb";
import { viewProductData } from "../../../../redux/api/admin/productService";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import Container from "@mui/material/Container";
import { ImagePath } from "../../../../utils/helpers";
const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);
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

  const handleClick = (event) => {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  };
  useEffect(() => {
    viewProduct();
  }, [unique]);
  return (
    <>
      <Box className="indexBox">
        <div role="presentation" onClick={handleClick}>
          <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3, fontSize: "13px" }}>
            <Link underline="hover" color="inherit" to="/admin/products">
              Products List
            </Link>
          </Breadcrumbs>
        </div>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Box>
              <Grid container>
                <Grid
                  item
                  xs={12}
                  sx={{
                    background: "#951e76",
                    height: "50px",
                    color: "white",
                    pt: 2,
                    pl: 2,
                  }}
                >
                  <Typography sx={{ fontSize: 16 }} gutterBottom>
                    Product General Info
                  </Typography>
                </Grid>
              </Grid>
              <Grid container mt={2}>
                <Grid item xs={12} md={6} sx={{ display: "flex" }}>
                  <span
                    style={{
                      color: "#951e76",
                      fontWeight: 500,
                      paddingRight: "10px",
                    }}
                  >
                    Product Name:
                  </span>
                  <span style={{ flex: 1 }}>
                    {productViewData?.data?.data?.product?.product_name}
                  </span>
                </Grid>
                <Grid item xs={12} md={6} sx={{ display: "flex" }}>
                  <span
                    style={{
                      color: "#951e76",
                      fontWeight: 500,
                      paddingRight: "10px",
                    }}
                  >
                    Category:
                  </span>
                  <span style={{ flex: 1 }}>
                    {productViewData?.data?.data?.product?.categoryname}
                  </span>
                </Grid>
              </Grid>
              <Grid container mt={2}>
                <Grid item xs={12} md={6} sx={{ display: "flex" }}>
                  <span
                    style={{
                      color: "#951e76",
                      fontWeight: 500,
                      paddingRight: "10px",
                    }}
                  >
                    {" "}
                    Cost:
                  </span>

                  <span>{productViewData?.data?.data?.product?.cost}</span>
                </Grid>
                <Grid item xs={12} md={6} sx={{ display: "flex" }}>
                  <span
                    style={{
                      color: "#951e76",
                      fontWeight: 500,
                      paddingRight: "10px",
                    }}
                  >
                    Weight:
                  </span>
                  <span>
                    {productViewData?.data?.data?.product?.weight * 1000}
                  </span>
                </Grid>
              </Grid>
              <Grid container mt={2}>
                <Grid item xs={12} md={6} sx={{ display: "flex" }}>
                  <span
                    style={{
                      color: "#951e76",
                      fontWeight: 500,
                      paddingRight: "10px",
                    }}
                  >
                    Image:
                  </span>
                  <span>
                    <img
                      loading="lazy"
                      width={"80px"}
                      height={"50px"}
                      srcSet={
                        ImagePath +
                        productViewData?.data?.data?.product?.file_name
                      }
                    />
                  </span>
                </Grid>
                <Grid item xs={12} md={6} sx={{ display: "flex" }}>
                  <span
                    style={{
                      color: "#951e76",
                      fontWeight: 500,
                      paddingRight: "10px",
                    }}
                  >
                    Description:
                  </span>
                  <span>
                    {productViewData?.data?.data?.product?.description}
                  </span>
                </Grid>
              </Grid>
              <Box>
                <Grid container mt={3}>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      background: "#951e76",
                      height: "50px",
                      color: "white",
                      pt: 2,
                      pl: 2,
                    }}
                  >
                    <Typography sx={{ fontSize: 16 }} gutterBottom>
                      Nutritional Facts
                    </Typography>
                  </Grid>
                </Grid>
                <TableContainer component={Paper} sx={{ mt: 2 }}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Nutrition Detail</TableCell>
                        <TableCell align="right">Metric</TableCell>
                        <TableCell align="right">Per Serve</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {productViewData?.data?.data?.product?.nutrician_details?.map(
                        (row, i) => (
                          <TableRow
                            key={i}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {row.nutrician_detail}
                            </TableCell>
                            <TableCell align="right">{row.metric}</TableCell>
                            <TableCell align="right">{row.per_serve}</TableCell>
                          </TableRow>
                        )
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
              <Box>
                <Grid container mt={3}>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      background: "#951e76",
                      height: "50px",
                      color: "white",
                      pt: 2,
                      pl: 2,
                    }}
                  >
                    <Typography sx={{ fontSize: 16 }} gutterBottom>
                      Health Benefits
                    </Typography>
                  </Grid>
                </Grid>
                <TableContainer component={Paper} sx={{ mt: 2 }}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Health Benefit</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {productViewData?.data?.data?.product?.health_benifits?.map(
                        (row, i) => (
                          <TableRow
                            key={i}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {row.health_benifit}
                            </TableCell>
                          </TableRow>
                        )
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Box>
          </CardContent>
          {/* <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions> */}
        </Card>
      </Box>
      {/* <Box>
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
                ></Box>
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
                ></Box>
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
      </Box> */}
    </>
  );
};

export default ProductView;
