/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Box,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Stack,
  Button,
  Dialog,
  IconButton,
  Typography,
  Grid,
} from "@mui/material";
import SearchInput from "../../../../components/searchInput";
import Slide from "@mui/material/Slide";
import TopBreaccrumb from "../../../../components/TopBreadcrumb";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Paper from "@mui/material/Paper";
import TextFormField from "../../../../components/reusableFormFields/TextField";
import SelectField from "../../../../components/reusableFormFields/selectField";
import ImageUploadComponent from "../../../../components/reusableFormFields/ImageUpload";
import TextMultiField from "../../../../components/reusableFormFields/TextMultiField";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  addProductData,
  commonListData,
  editProductData,
  viewProductData,
} from "../../../../redux/api/admin/productService";
import { productForm } from "../../../../helpers/validate";
import { LoadingButton } from "@mui/lab";
import { authEndPoints } from "../../../../helpers/endpoints";
import BenefitsForm from "./BenefitForm";
import NutritionalForm from "./NutritionalForm";
import ProductInfoForm from "./ProductInfoForm";
import { errorAlert } from "../../../../helpers/globalFunctions";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const steps = [
  {
    label: "Product General Info",
    description: `Basic Information about the Product`,
  },
  {
    label: "Health Benefits",
    description: "Health Benefits about the Product",
  },
  {
    label: "Nutritional Facts ",
    description: `Nutritional Facts about the Product`,
  },
];

function ProductCreate(props) {
  const [activeStep, setActiveStep] = React.useState(0);

  const { onClick, initialData = null, type } = props;
  const [productId, setProductId] = useState(null);
  console.log(productId);
  const [showPassword, setShowPassword] = useState(false);
  const [adminsrole, setadminsRole] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState("");
  const dispatch = useDispatch();
  const initialvalue = useSelector(
    (state) => state?.adminProduct?.viewProduct?.data?.data?.product
  );
  console.log(initialvalue);

  const formLoading = useSelector(
    (state) => state?.adminProduct?.viewProduct?.loading
  );
  const [essential, setEssential] = useState({
    cateLists: [],
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: type === "add" ? {} : initialvalue,
    resolver: yupResolver(productForm),
    mode: "onChange",
  });

  // Add Directory Api

  return (
    <Box>
      <Box className="indexBox">
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Stepper
              activeStep={activeStep}
              orientation="vertical"
              className="admin-product-stepper"
            >
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel
                  // optional={
                  //   index === 2 ? (
                  //     <Typography variant="caption">Last step</Typography>
                  //   ) : null
                  // }
                  >
                    {step.label}
                  </StepLabel>
                  <StepContent>
                    <Typography sx={{ fontSize: "12px" }}>
                      {step.description}
                    </Typography>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length && (
              <Paper square elevation={0} sx={{ p: 3 }}>
                <Typography>
                  All steps completed - you&apos;re finished
                </Typography>
                <Button
                  onClick={handleReset}
                  sx={{ mt: 1, mr: 1, color: "#951e76" }}
                >
                  Reset
                </Button>
              </Paper>
            )}
          </Grid>
          <Grid item xs={9} mt={2}>
            {/* Content for the current step */}
            {activeStep === 0 && (
              <Box px={3}>
                <ProductInfoForm
                  activeStep={activeStep}
                  steps={steps}
                  handleNext={handleNext}
                  handleBack={handleBack}
                  setProductId={setProductId}
                />
              </Box>
            )}
            {activeStep === 1 && (
              <Box px={3}>
                <NutritionalForm
                  activeStep={activeStep}
                  steps={steps}
                  handleNext={handleNext}
                  handleBack={handleBack}
                  productId={productId?.data?.id}
                />
              </Box>
            )}
            {activeStep === 2 && (
              <Box px={3}>
                <BenefitsForm
                  activeStep={activeStep}
                  steps={steps}
                  handleNext={handleNext}
                  handleBack={handleBack}
                  productId={productId?.data?.id}
                />
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default ProductCreate;
