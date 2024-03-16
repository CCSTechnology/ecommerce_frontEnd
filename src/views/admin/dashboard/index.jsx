import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import "./style.css";
import DashboardBox from "./dashboardBox";
import CompleteTaskTable from "./completeTaskTable";
import { useDispatch, useSelector } from "react-redux";
import InProgressTaskTable from "./inprogressTaskTable";
import UpComingTaskTable from "./upcomingobsTaskTable";
import { authEndPoints } from "../../../helpers/endpoints";
import { customerListData } from "../../../redux/api/admin/customerService";
import { errorAlert } from "../../../helpers/globalFunctions";
import { productListData } from "../../../redux/api/admin/productService";
import { orderListData } from "../../../redux/api/admin/orderService";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [customerData, setCustomerData] = useState(null);
  const dataCustomer = useSelector(
    (state) => state?.adminCustomer?.listCustomer
  );
  const productList = useSelector((state) => state?.adminProduct?.listProduct);
  const orderList = useSelector((state) => state?.adminOrder?.listOrder);

  // const roleName = localStorage.getItem("roleName");
  const customerListApi = async () => {
    const parameter = {
      url: `${authEndPoints.customer.customerList}`,
    };
    try {
      const res = await dispatch(customerListData(parameter)).unwrap();
      setCustomerData(res);
    } catch (errors) {
      errorAlert(errors?.error);
    }
  };

  const productsListApi = async () => {
    const parameters = {
      url: `${authEndPoints.product.list}`,
    };
    try {
      const res = await dispatch(productListData(parameters)).unwrap();
      console.log(res);
    } catch (errors) {
      errorAlert(errors?.error);
    }
  };
  const orderListApi = async () => {
    const parameters = {
      url: `${authEndPoints.order.list}`,
    };
    try {
      const res = await dispatch(orderListData(parameters)).unwrap();
      console.log(res);
    } catch (errors) {
      errorAlert(errors?.error);
    }
  };
  useEffect(() => {
    customerListApi();
    orderListApi();
  }, []);

  useEffect(() => {
    productsListApi();
  }, []);

  return (
    <Box sx={{ my: 13, mx: 12 }} className="formFullCtr">
      <DashboardBox />

      <Box sx={{ my: 5 }}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <CompleteTaskTable orderList={orderList} />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <InProgressTaskTable product={productList} />
          </Grid>
        </Grid>
      </Box>
      <Grid xs={12} sm={12} md={12} lg={12}>
        <UpComingTaskTable customer={dataCustomer} />
      </Grid>
    </Box>
  );
};

export default Dashboard;
