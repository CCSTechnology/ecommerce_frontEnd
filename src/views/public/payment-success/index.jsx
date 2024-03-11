import React from "react";
import SuccessError from "../../../components/reusableFormFields/success";
import successImage from "../../../assets/images/payment-success.png";
import { Box, Button, Container } from "@mui/material";
import { paymentSuccessMessage } from "../../../redux/api/public/profileService";
import { useDispatch } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";

const Success = ({ title }) => {
  const dispatch = useDispatch();
  // let { id } = useParams();
  // console.log(id);
  // const location = useLocation();
  // const searchParams = new URLSearchParams(location.search);
  // const orderId = searchParams.get("order_id");
  // console.log(orderId);

  // const paymentSuccess = async () => {
  //   console.log(orderId);
  //   const data = {
  //     order_id: orderId,
  //   };
  //   try {
  //     const res = await dispatch(paymentSuccessMessage(data)).unwrap();
  //   } catch (error) {}
  // };

  // useEffect(() => {
  //   paymentSuccess();
  // }, []);

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
        <Box
          sx={{
            marginTop: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Link to="/" className="link">
            <Button
              style={{ fontSize: "15px", fontWeight: 600, color: "#951e76" }}
              className="email-verify"
            >
              Redirect to Home
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default Success;
