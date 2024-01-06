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
import FeaturedProducts from "../../../../components/featuredProducts";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FeaturedProductsData = () => {
  const [valueData, setValueData] = useState("1");
  const handleChange = (event, newValue) => {
    setValueData(newValue);
  };
  return (
    <Box>
      <Box className="indexBox">
        {/* <TopBreaccrumb title={"Upload Images"} to={`/admin/dashboard`} /> */}
        <Stack
          direction={{ lg: "row", sm: "column" }}
          gap={2}
          alignItems={"center"}
        >
          <Box sx={{ width: "100%", typography: "body1" }}>
            {" "}
            <FeaturedProducts />
          </Box>
        </Stack>
        {/* </Stack> */}
        {/* </Box> */}
      </Box>
    </Box>
  );
};

export default FeaturedProductsData;
