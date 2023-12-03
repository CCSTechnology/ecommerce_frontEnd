import React from "react";
import SuccessError from "../../../components/reusableFormFields/success";
import successImage from "../../../assets/images/payment-success.png";
import { Box, Container } from "@mui/material";
import { paymentSuccessMessage } from "../../../redux/api/public/profileService";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";

const Success = ({ title }) => {
  const dispatch = useDispatch();
  // let { id } = useParams();
  // console.log(id);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("order_id");
  console.log(orderId);

  const paymentSuccess = async () => {
    console.log(orderId);
    const data = {
      order_id: orderId,
    };
    try {
      const res = await dispatch(paymentSuccessMessage(data)).unwrap();
    } catch (error) {}
  };

  useEffect(() => {
    paymentSuccess();
  }, []);

  return (
    <Container
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box>
        <SuccessError
          title={"Payment Successfully Completed"}
          path={successImage}
        />
      </Box>
    </Container>
  );
};

export default Success;
