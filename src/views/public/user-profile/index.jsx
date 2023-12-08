import React from "react";

import successImage from "../../../assets/images/payment-success.png";
import { Box, Container, Grid, Tab } from "@mui/material";
import SuccessError from "../../../components/reusableFormFields/success";
import StyledContainer from "../../../components/ecommerce/StyledContainer";
import AdminSidebar from "../../../layouts/utils/AdminSidebar";
import ProfileBar from "../../../components/profileBar";
import { myProfileView } from "../../../redux/api/public/profileService";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import MyProfile from "../../../components/myProfile";
import ChangePassword from "../../../components/changePassword";
import MyAddress from "../../../components/myAddress";
import { TabContext, TabList, TabPanel } from "@mui/lab";

const UserProfile = ({ title }) => {
  const dispatch = useDispatch();
  const [profileData, setProfileData] = useState(null);
  const [valueData, setValueData] = useState("1");
  const ProfileView = async () => {
    try {
      const res = await dispatch(myProfileView()).unwrap();
      setProfileData(res);
    } catch (error) {}
  };
  const handleChange = (event, newValue) => {
    setValueData(newValue);
  };

  useEffect(() => {
    ProfileView();
  }, []);

  return (
    // <Container>
    <StyledContainer>
      <Box sx={{ gap: 4 }}>
        <Grid container>
          <Grid item xs={6}>
            <MyProfile />
          </Grid>
          <Grid item xs={6}>
            <MyAddress />
          </Grid>
        </Grid>
      </Box>
    </StyledContainer>

    // </Container>
  );
};

export default UserProfile;
