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
import styled from "styled-components";

const UserProfile = ({ title }) => {
  const dispatch = useDispatch();
  const [profileData, setProfileData] = useState(null);
  const [valueData, setValueData] = useState("1");
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const ProfileView = async () => {
    try {
      const res = await dispatch(myProfileView()).unwrap();
      setProfileData(res);
    } catch (error) {}
  };
  // const handleChange = (event, newValue) => {
  //   setValueData(newValue);
  // };

  useEffect(() => {
    ProfileView();
  }, []);

  return (
    // <Container>
    <StyledContainer>
      <Box
        sx={{
          typography: "body1",
        }}
      >
        <TabContext value={value}>
          <TabAlignment>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="My Profile" value="1" />
              <Tab label="My Address" value="2" />
            </TabList>
          </TabAlignment>
          <TabPanel value="1">
            <MyProfile />
          </TabPanel>
          <TabPanel value="2">
            <MyAddress />
          </TabPanel>
        </TabContext>
      </Box>
      {/* <Box sx={{ gap: 4 }}>
        <Grid container>
          <Grid item xs={6}>
            <MyProfile />
          </Grid>
          <Grid item xs={6}>
            <MyAddress />
          </Grid>
        </Grid>
      </Box> */}
    </StyledContainer>

    // </Container>
  );
};

export default UserProfile;

const TabAlignment = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
`;
