import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Skeleton,
  Avatar,
  Stack,
  Typography,
  Button,
  FormControl,
  Select,
  MenuItem,
  Badge,
  FormHelperText,
} from "@mui/material";
import MyOrders from "../../../ecommerce/myorders";
import OrderCustomerCard from "../../../../components/OrderCustomerCard";

import OrderShippingCard from "../../../../components/OrderShippingCard";
import OrderDetailsCard from "../../../../components/OrderDetails";
import {
  orderStatusChangeData,
  viewOrderData,
} from "../../../../redux/api/admin/orderService";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { authEndPoints } from "../../../../helpers/endpoints";
import TopBreaccrumb from "../../../../components/TopBreadcrumb";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { errorAlert } from "../../../../helpers/globalFunctions";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import { Login } from "@mui/icons-material";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
const OrderView = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const orderSingleViewData = useSelector(
    (state) => state?.adminOrder?.viewOrder
  );

  const [statusData, setStausData] = useState(null);
  const [orderStatus, setOrderStatus] = useState(
    `${orderSingleViewData?.data?.data?.status}`
  );
  console.log(orderSingleViewData?.data?.data?.status);
  console.log(orderStatus);
  const handleChangeOrderStatus = (event) => {
    setOrderStatus(event.target.value);
    setOpen(true);
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeStatus = async () => {
    console.log("hhh");
    const parameters = {
      id: orderSingleViewData?.data?.data?.id,
      order_status: orderStatus,
    };
    try {
      const res = await dispatch(orderStatusChangeData(parameters)).unwrap();
      setStausData(res);

      handleClose();
    } catch (errors) {
      errorAlert(errors?.error);
    }
  };
  //list api
  const viewSingleOrder = async () => {
    const parameters = {
      url: `${authEndPoints.order.orderView(id)}`,
    };
    try {
      const res = await dispatch(viewOrderData(parameters)).unwrap();
    } catch (errors) {
      errorAlert(errors?.error);
    }
  };
  useEffect(() => {
    viewSingleOrder();
  }, [statusData]);
  return (
    <Box className="indexBox">
      <TopBreaccrumb
        title={`Order-${orderSingleViewData?.data?.data?.order_no}`}

        // to={`/admin/dashboard`}
      />
      <Stack
        direction={{ lg: "row", sm: "column" }}
        gap={2}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        {" "}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-start",
          }}
        >
          <Badge
            className="completed"
            sx={{ ml: 2, width: "150px", height: "20px", fontSize: "16px" }}
          >
            {orderSingleViewData?.data?.data?.status}
          </Badge>
          <ModeEditOutlineOutlinedIcon
            sx={{
              width: "40px",
              height: "30px",
              color: "#951e76",
              background: "#f1edf0",
              borderRadius: "10px",
              ml: 3,
              cursor: "pointer",
            }}
            onClick={() => handleClickOpen()}
          />
        </Box>
        {/* <Box>
          <Typography sx={{ mb: 2 }}>Order Status</Typography>
          <FormControl size="small" className="directorySelect">
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={orderStatus}
              onChange={handleChangeOrderStatus}
            >
              <MenuItem value={"pending"}>Pending</MenuItem>
              <MenuItem value={"processing"}>Processing</MenuItem>
              <MenuItem value={"intransist"}>In-transist</MenuItem>
              <MenuItem value={"delivered"}>Delivered</MenuItem>
              <MenuItem value={"completed"}>Completed</MenuItem>

              
            </Select>
          </FormControl>
        </Box> */}
      </Stack>

      <Box sx={{ my: 3 }}>
        <Typography className="order-details-view">Customer Details</Typography>
        <Box sx={{ mt: 2, pr: 20 }}>
          <OrderCustomerCard orderSingleViewData={orderSingleViewData} />
        </Box>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Box>
          <Typography className="order-details-view">Order Details</Typography>
          <Box sx={{ mt: 2, pr: 20 }}>
            <OrderDetailsCard orderSingleViewData={orderSingleViewData} />
          </Box>
        </Box>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Box>
          <Typography className="order-details-view">
            Shipping Details
          </Typography>
          <Box sx={{ mt: 2, pr: 20 }}>
            <OrderShippingCard orderSingleViewData={orderSingleViewData} />
          </Box>
        </Box>
      </Box>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth={"500px"}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Change Status
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <FormControl size="small" className="directorySelect">
            <Select
              sx={{ fontSize: "14px", height: "40px" }}
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={orderStatus}
              onChange={handleChangeOrderStatus}
              displayEmpty
              // defaultValue={orderSingleViewData?.data?.data?.status}
              inputProps={{ "aria-label": "Without label" }}
              IconComponent={() => (
                <IconButton
                  onClick={() => {
                    console.log("dattata");
                    setOrderStatus("");
                  }}
                >
                  <CloseIcon />
                </IconButton>
              )}
            >
              <MenuItem value={"Pending"}>Pending</MenuItem>
              <MenuItem value={"Processing"}>Processing</MenuItem>
              <MenuItem value={"Intransist"}>In-transist</MenuItem>
              <MenuItem value={"Delivered"}>Delivered</MenuItem>
              <MenuItem value={"Completed"}>Completed</MenuItem>

              {/* <MenuItem value={"company"}>Company</MenuItem> */}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleChangeStatus}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </Box>
  );
};

export default OrderView;
