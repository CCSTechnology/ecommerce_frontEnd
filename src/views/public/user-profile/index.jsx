import React from "react";

import successImage from "../../../assets/images/payment-success.png";
import { Box, Container } from "@mui/material";
import SuccessError from "../../../components/reusableFormFields/success";
import StyledContainer from "../../../components/ecommerce/StyledContainer";
import AdminSidebar from "../../../layouts/utils/AdminSidebar";
import ProfileBar from "../../../components/profileBar";
import { myProfileView } from "../../../redux/api/public/profileService";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";

const UserProfile = ({ title }) => {
  const dispatch = useDispatch();
  const [profileData, setProfileData] = useState(null);

  const ProfileView = async () => {
    try {
      const res = await dispatch(myProfileView()).unwrap();
      setProfileData(res);
    } catch (error) {}
  };

  useEffect(() => {
    ProfileView();
  }, []);

  return (
    // <Container>
    <Box>
      <ProfileBar profileData={profileData} />
    </Box>
    // </Container>
  );
};

export default UserProfile;
