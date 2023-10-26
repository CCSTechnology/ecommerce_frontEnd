import React, { useEffect, useState } from "react";
import { Box, Grid, Skeleton, Stack } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { viewDirectoryData } from "redux/api/services/directoryService";
import { authEndPoints } from "helpers/endpoints";
import { useDispatch, useSelector } from "react-redux";
import { errorAlert } from 'helpers/globalFunctions'
import { useParams } from "react-router-dom";
import './style.css';
import TopBreaccrumb from "components/TopBreadcrumb";
import { viewProductData } from "redux/api/services/productService";

const ProductView = (props) => {
    let {id} =useParams()

    const dispatch = useDispatch()
    const productViewData = useSelector((state) => state.product.viewProduct)
    console.log(productViewData);
    const [unique,setUnique] = useState(null)
    const imageUrl = process.env.REACT_APP_IMG_URL;
    //list api
    const viewProduct = async () => {
        const parameters = {
            url: `${authEndPoints.product.productView(id)}`,
        };
        try {
            const res =await dispatch(viewProductData(parameters)).unwrap();
        } catch (errors) {
            errorAlert(errors?.error);
        }
    };
    useEffect(() => {
        viewProduct()
    }, [unique])
    return (
        <Box className="indexBox">
            <TopBreaccrumb title={"Product List"} to={`/products`} />
            <Grid
                container
                spacing={2}
                sx={{ my: 4 }}
                justifyContent="center"
                alignItems="center"
            >
                <Grid item
                    xs={12}
                    sm={12}
                    md={8}
                    lg={6}
                    sx={{ backgroundColor: "#951e76", my: 4 }}
                >
                    <Stack direction={"column"} gap={1} alignItems={"center"}>
                        {!productViewData?.loading ? (
                            <Avatar
                                src={imageUrl + productViewData?.data?.data?.product?.file_name}
                                sx={{ width: 60, height: 60 }}
                            />
                        ) : (
                            <Skeleton variant="circular" width={60} height={60} />
                        )}
                        <Typography sx={{ mb: 2,color:"white" }}>
                            {!productViewData?.loading ? (
                                `${productViewData?.data?.data?.product?.product_name}`
                            ) : (
                                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                            )}
                        </Typography>
                    </Stack>
                    <Grid container justifyContent="center" alignItems="center">
                        <Grid item
                            xs={12}
                            sm={10}
                            md={11}
                            sx={{ border: "1px solid white", mb: 4 }}
                        >
                            <Grid container>
                                <Grid item xs={12} sm={5} md={5}>
                                    <Box className="viewLeftSide">
                                        <Typography sx={{ py: 2 ,color:"white"}}>Name</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={7} md={7}>
                                    <Box className="viewRightSide">
                                        <Typography sx={{ py: 2,color:"white"  }}>
                                            {!productViewData?.loading ? (
                                                productViewData?.data?.data?.product?.product_name
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
                                        <Typography sx={{ py: 2 ,color:"white" }}>Cost</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={7} md={7}>
                                    <Box className="viewRightSide">
                                        <Typography sx={{ py: 2 ,color:"white" }}>
                                            {!productViewData?.loading ? (
                                                productViewData?.data?.data?.product?.cost
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
                                        <Typography sx={{ py: 2,color:"white"  }}>Category</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={7} md={7}>
                                    <Box className="viewRightSide">
                                        <Typography sx={{ py: 2,color:"white"  }}>
                                            {!productViewData?.loading ? (
                                                productViewData?.data?.data?.product?.category
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
                                        <Typography sx={{ py: 2,color:"white"  }}>SKU</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={7} md={7}>
                                    <Box className="viewRightSide" height={100}>
                                        <Typography sx={{ py: 2,color:"white"  }}>
                                            {!productViewData?.loading ? (
                                               productViewData?.data?.data?.product?.sku
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
                                        <Typography sx={{ py: 2 ,color:"white" }}>Description</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={7} md={7}>
                                    <Box className="viewRightSide">
                                        <Typography sx={{ py: 2 ,color:"white" }}>
                                            {!productViewData?.loading ? (
                                                productViewData?.data?.data?.product?.description
                                            ) : (
                                                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                                            )}
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}

export default ProductView;