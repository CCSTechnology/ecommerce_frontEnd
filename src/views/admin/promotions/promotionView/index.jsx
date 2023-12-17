import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  DialogTitle,
  Grid,
  Skeleton,
  Stack,
  IconButton,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableRow,
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
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Container from "@mui/material/Container";
import { viewPromotion } from "../../../../redux/api/admin/promotionService";
import AddPromotionForm from "../addPromotionform";
import AddProductPromotionForm from "./addProductPromotionForm";
import TableHeader from "../list/tableHeader";
import TableRowsLoader from "../../../../components/TableLoader";

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
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const PromotionView = (props) => {
  let { id } = useParams();

  const dispatch = useDispatch();
  const promotionViewData = useSelector(
    (state) => state.adminPromotion.viewPromotion?.data?.data
  );
  const promotionTable = useSelector(
    (state) => state.adminPromotion.viewPromotion
  );
  console.log(promotionViewData);
  const [open, setOpen] = React.useState(false);
  const [unique, setUnique] = useState(null);
  const imageUrl = import.meta.env.VITE_APP_IMG_URL;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //list api
  const viewPromotionAPi = async () => {
    const parameters = {
      url: `${authEndPoints.promotion.promotionView(id)}`,
    };
    try {
      const res = await dispatch(viewPromotion(parameters)).unwrap();
    } catch (errors) {
      errorAlert(errors?.error);
    }
  };
  useEffect(() => {
    viewPromotionAPi();
  }, [id]);
  return (
    <>
      <Box className="indexBox">
        <TopBreaccrumb title={"Promotion List"} to={`/admin/products`} />
        <Grid
          container
          spacing={2}
          sx={{ my: 4 }}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12} sm={12} md={10} lg={10} sx={{ my: 4 }}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Stack direction={"row"}>
                  <Typography
                    sx={{ fontSize: 20, width: "300px" }}
                    gutterBottom
                  >
                    Name of Promotion:
                  </Typography>
                  <Typography
                    sx={{ fontSize: 20 }}
                    color="#951e76"
                    gutterBottom
                  >
                    {promotionViewData?.name}
                  </Typography>
                </Stack>
                <Stack direction={"row"}>
                  <Typography sx={{ fontSize: 20, width: "300px" }}>
                    Start Date:
                  </Typography>
                  <Typography sx={{ fontSize: 20 }} color="#951e76">
                    {promotionViewData?.start_date}
                  </Typography>
                </Stack>
                <Stack direction={"row"}>
                  <Typography sx={{ fontSize: 20, mt: 2, width: "300px" }}>
                    End Date:
                  </Typography>
                  <Typography sx={{ fontSize: 20, mt: 2 }} color="#951e76">
                    {promotionViewData?.end_date}
                  </Typography>
                </Stack>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  style={{ color: "#951e76" }}
                  onClick={handleClickOpen}
                >
                  Add Product
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
        <TableContainer className="rolesPageTable">
          <Table>
            <TableHeader />
            <TableBody>
              {promotionTable?.loading ? (
                <TableRowsLoader rowsNum={10} colsNum={9} />
              ) : (
                promotionTable?.data?.data?.productdetails.map((item, i) => (
                  <TableRow key={i}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{item?.name}</TableCell>
                    <TableCell>{item?.start_date}</TableCell>
                    <TableCell>{item?.end_date}</TableCell>
                    <TableCell>{item?.status}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {open === true ? (
        <Dialog
          fullWidth={true}
          maxWidth={"sm"}
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Box> Add Product for Promotion</Box>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Stack>
          </DialogTitle>

          <AddProductPromotionForm onClick={handleClose} />
        </Dialog>
      ) : null}
    </>
  );
};

export default PromotionView;
