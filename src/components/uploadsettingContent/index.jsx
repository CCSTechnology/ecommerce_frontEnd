import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Grid, Slide, Stack } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import { useDebounce } from "use-debounce";
import EditorForm from "../../views/admin/settings/editiorForm";
import TopBreaccrumb from "../TopBreadcrumb";
import { authEndPoints } from "../../helpers/endpoints";
import { ContentViewAboutus } from "../../redux/api/admin/settingService";
import { errorAlert } from "../../helpers/globalFunctions";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UploadSettingContent = () => {
  const dispatch = useDispatch();

  const [dataListFeature, setDataListFeature] = useState(null);

  const [homeData, setHomeData] = useState(null);
  const [searchList, setSerachList] = useState({
    cateLists: [],
  });
  const [expanded, setExpanded] = useState(false);
  const [contentData, setContentData] = useState(null);
  console.log(searchList?.data);
  console.log(dataListFeature);

  const handleExpand = (row) => {
    console.log(row);
    setHomeData(row);
    setContentData(null);
    setExpanded(!expanded);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const contentView = async () => {
    console.log(homeData);
    const parameters = {
      url: `${authEndPoints.setting.viewContent(homeData)}`,
    };
    try {
      const res = await dispatch(ContentViewAboutus(parameters)).unwrap();
      setContentData(res);
    } catch (errors) {
      errorAlert(errors?.error);
    }
  };

  useEffect(() => {
    console.log(homeData);
    if (homeData) {
      contentView();
    }
  }, [homeData]);

  return (
    <Box>
      <Box className="indexBox">
        <TopBreaccrumb title={"Upload Content"} to={`/admin/dashboard`} />
        <Stack
          direction={{ lg: "row", sm: "column" }}
          gap={2}
          alignItems={"center"}
        >
          <Box sx={{ width: "100%", typography: "body1" }}>
            <Box sx={{ my: 3 }}>
              <Stack direction={{ lg: "row", sm: "column" }} gap={2}>
                <Stack direction={{ lg: "row", sm: "column" }} gap={8}>
                  <Grid md={4}>
                    <Button
                      className="AddBtn"
                      onClick={() => handleExpand("product")}
                      sx={{ fontSize: "13px" }}
                    >
                      Products
                    </Button>
                  </Grid>
                  <Grid md={4}>
                    <Button
                      className="AddBtn"
                      onClick={() => handleExpand("category")}
                      sx={{ fontSize: "13px" }}
                    >
                      Categories
                    </Button>
                  </Grid>
                  <Grid md={4}>
                    <Button
                      className="AddBtn"
                      onClick={() => handleExpand("about")}
                      sx={{ fontSize: "13px" }}
                    >
                      Contents
                    </Button>
                  </Grid>
                </Stack>
              </Stack>
            </Box>
            {contentData && expanded && (
              <EditorForm contentHome={contentData} />
            )}
          </Box>
        </Stack>
        {/* </Stack> */}
        {/* </Box> */}
      </Box>
    </Box>
  );
};

export default UploadSettingContent;
