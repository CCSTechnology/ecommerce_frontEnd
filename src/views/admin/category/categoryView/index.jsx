import React, { useEffect } from "react";
import { Box, Grid, Skeleton, Stack } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { authEndPoints } from "../../../../helpers/endpoints";
import { useDispatch, useSelector } from "react-redux";
import { errorAlert } from "../../../../helpers/globalFunctions";
import { useParams } from "react-router-dom";
import "./style.css";
import TopBreaccrumb from "../../../../components/TopBreadcrumb";
import { viewCategoryData } from "../../../../redux/api/admin/categoryService";

const CategoryView = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const categoryviewData = useSelector(
    (state) => state.adminCategory.viewCategory
  );
  const role = localStorage.getItem("roleName");
  const imageUrl = import.meta.env.VITE_APP_IMG_URL;

  //list api
  const viewCategoryList = async () => {
    const parameters = {
      url: `${authEndPoints.category.categoryView(id)}`,
    };
    try {
      await dispatch(viewCategoryData(parameters)).unwrap();
    } catch (errors) {
      errorAlert(errors?.error);
    }
  };
  useEffect(() => {
    viewCategoryList();
  }, []);
  return (
    <Box className="indexBox">
      <TopBreaccrumb title={"Category"} to={`/admin/category`} />
      <Grid
        container
        spacing={2}
        sx={{ my: 4 }}
        justifyContent="center"
        alignItems="center"
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={8}
          lg={6}
          sx={{ backgroundColor: "#951e76", my: 4 }}
        >
          <Stack direction={"column"} gap={1} alignItems={"center"}>
            {!categoryviewData?.loading ? (
              <Avatar
                src={imageUrl + categoryviewData?.data?.data?.category_image}
                sx={{ width: 60, height: 60 }}
              />
            ) : (
              <Skeleton variant="circular" width={60} height={60} />
            )}
            <Typography sx={{ mb: 2, color: "white" }}>
              {!categoryviewData?.loading ? (
                `${categoryviewData?.data?.data?.label} `
              ) : (
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
              )}
            </Typography>
          </Stack>
          <Grid container justifyContent="center" alignItems="center">
            <Grid
              item
              xs={12}
              sm={10}
              md={11}
              sx={{ border: "1px solid white", mb: 4 }}
            >
              <Grid container>
                <Grid item xs={12} sm={5} md={5}>
                  <Box className="viewLeftSide">
                    <Typography sx={{ py: 2, color: "white" }}>
                      Category Name
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={7} md={7}>
                  <Box className="viewRightSide">
                    <Typography sx={{ py: 2, color: "white" }}>
                      {!categoryviewData?.loading ? (
                        categoryviewData?.data?.data?.label
                      ) : (
                        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                      )}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} sm={5} md={5}>
                  <Box className="viewLeftSide">
                    <Typography sx={{ py: 2, color: "white" }}>ID</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={7} md={7}>
                  <Box className="viewRightSide">
                    <Typography sx={{ py: 2, color: "white" }}>
                      {!categoryviewData?.loading ? (
                        categoryviewData?.data?.data?.parent
                      ) : (
                        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                      )}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              {/* <Grid container>
                                <Grid item xs={12} sm={5} md={5}>
                                    <Box className="viewLeftSide">
                                        <Typography sx={{ py: 2 }}>Phone Number</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={7} md={7}>
                                    <Box className="viewRightSide">
                                        <Typography sx={{ py: 2 }}>
                                            {!directoryViewData?.loading ? (
                                                directoryViewData?.data?.data?.mobile
                                            ) : (
                                                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                                            )}
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={12} sm={5} md={5}>
                                    <Box className="viewLeftSide">
                                        <Typography sx={{ py: 2 }}>Email ID</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={7} md={7}>
                                    <Box className="viewRightSide">
                                        <Typography sx={{ py: 2 }}>
                                            {!directoryViewData?.loading ? (
                                                directoryViewData?.data?.data?.email
                                            ) : (
                                                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                                            )}
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={12} sm={5} md={5}>
                                    <Box className="viewLeftSide" height={100}>
                                        <Typography sx={{ py: 2 }}>Address</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={7} md={7}>
                                    <Box className="viewRightSide" height={100}>
                                        <Typography sx={{ py: 2 }}>
                                            {!directoryViewData?.loading ? (
                                                directoryViewData?.data?.data?.address
                                            ) : (
                                                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                                            )}
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={12} sm={5} md={5}>
                                    <Box className="viewLeftSide">
                                        <Typography sx={{ py: 2 }}>Country</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={7} md={7}>
                                    <Box className="viewRightSide">
                                        <Typography sx={{ py: 2 }}>
                                            {!directoryViewData?.loading ? (
                                                directoryViewData?.data?.data?.country
                                            ) : (
                                                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                                            )}
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={12} sm={5} md={5}>
                                    <Box className="viewLeftSide">
                                        <Typography sx={{ py: 2 }}>Postal Code</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={7} md={7}>
                                    <Box className="viewRightSide">
                                        <Typography sx={{ py: 2 }}>
                                            {!directoryViewData?.loading ? (
                                                directoryViewData?.data?.data?.zip_code
                                            ) : (
                                                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                                            )}
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={12} sm={5} md={5}>
                                    <Box className="viewLeftSide">
                                        <Typography sx={{ py: 2 }}>Role</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={7} md={7}>
                                    <Box className="viewRightSide">
                                        <Typography sx={{ py: 2 }}>
                                            {!directoryViewData?.loading ? (
                                                directoryViewData?.data?.data?.role_name
                                            ) : (
                                                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                                            )}
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid> */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CategoryView;
