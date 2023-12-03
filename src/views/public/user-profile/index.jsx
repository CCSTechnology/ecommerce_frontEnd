import React from "react";

import successImage from "../../../assets/images/payment-success.png";
import { Box, Container, Tab } from "@mui/material";
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
      <Box>
        <Box
          sx={{
            flexGrow: 1,
            bgcolor: "background.paper",
            display: "flex",
            marginTop: 4,
          }}
        >
          <TabContext value={valueData}>
            <Box sx={{ borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                orientation="vertical"
              >
                <Tab
                  label="My Profile"
                  value="1"
                  sx={{ color: "black", textAlign: "start" }}
                />
                <Tab label="My Orders" value="2" sx={{ color: "black" }} />
                <Tab
                  label="Change Password"
                  value="3"
                  sx={{ color: "black" }}
                />
                <Tab label="My Address" value="4" sx={{ color: "black" }} />
              </TabList>
            </Box>
            <TabPanel value="1">
              <MyProfile />
            </TabPanel>
            <TabPanel value="4">
              <MyAddress />
            </TabPanel>
          </TabContext>
        </Box>
      </Box>
    </StyledContainer>

    // </Container>
  );
};

export default UserProfile;
