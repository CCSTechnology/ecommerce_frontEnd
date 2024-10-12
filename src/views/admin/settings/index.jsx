import React, { useState } from "react";
import {
  Box,
  Stack,
  Tab,

} from "@mui/material";
import TopBreaccrumb from "../../../components/TopBreadcrumb";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import UploadSettingImages from "../../../components/uploadSettingImages";
import FeaturedProducts from "../../../components/featuredProducts";
import UploadContent from "./upload-content";

const Settings = () => {
  const [valueData, setValueData] = useState("1");
  const handleChange = (event, newValue) => {
    setValueData(newValue);
  };
  return (
    <Box>
      <Box className="indexBox">
        <TopBreaccrumb title={"Settings"} to={`/admin/dashboard`} />
        <Stack
          direction={{ lg: "row", sm: "column" }}
          gap={2}
          alignItems={"center"}
        >
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={valueData}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab
                    label="Upload Images"
                    value="1"
                    sx={{ color: "#951e76" }}
                  />
                  <Tab
                    label="About Us content Upload"
                    value="2"
                    sx={{ color: "#951e76" }}
                  />
                  <Tab
                    label="Featured Products"
                    value="3"
                    sx={{ color: "#951e76" }}
                  />
                </TabList>
              </Box>
              <TabPanel value="1">
                <UploadSettingImages />
              </TabPanel>
              <TabPanel value="2">
                <UploadContent />
              </TabPanel>
              <TabPanel value="3">
                <FeaturedProducts />
              </TabPanel>
            </TabContext>
          </Box>
        </Stack>
        {/* </Stack> */}
        {/* </Box> */}
      </Box>
    </Box>
  );
};

export default Settings;
