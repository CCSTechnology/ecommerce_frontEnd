import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Slide,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TopBreaccrumb from "../../../components/TopBreadcrumb";

import { LoadingButton, TabContext, TabList, TabPanel } from "@mui/lab";
import MultipleImageUpload from "../../../components/reusableFormFields/multipleImageUpload";
import { Controller, get, useFieldArray, useForm } from "react-hook-form";
import ImageUploadComponent from "../../../components/reusableFormFields/ImageUpload";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { authEndPoints } from "../../../helpers/endpoints";

import {
  ContentViewAboutus,
  featuredDataAdd,
  featuredDataDelete,
  featuredDataList,
  searchFeatureList,
  settingImageAdd,
  settingImageDelete,
  settingImageView,
} from "../../../redux/api/admin/settingService";
import { errorAlert, successAlert } from "../../../helpers/globalFunctions";
import { useDispatch, useSelector } from "react-redux";
import SelectField from "../../../components/reusableFormFields/selectField";
import TextFormField from "../../../components/reusableFormFields/TextField";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteModal from "../../../components/deleteModal";
import SettingForm from "./addImageform";
import Editor from "../../../components/editor";
import EditorField from "../../../components/editor";
import EditorForm from "./editiorForm";
import { useDebounce } from "use-debounce";
import UploadSettingImages from "../../../components/uploadSettingImages";
import UploadSettingContent from "../../../components/uploadsettingContent";
import FeaturedProducts from "../../../components/featuredProducts";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
                <UploadSettingContent />
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
