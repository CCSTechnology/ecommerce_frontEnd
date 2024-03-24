import { useForm, useFieldArray, Controller } from "react-hook-form";
import {
  Button,
  TextField,
  Grid,
  Box,
  Stack,
  InputAdornment,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import { yupResolver } from "@hookform/resolvers/yup";

import CloseIcon from "@mui/icons-material/Close";

import TextFormField from "../../../../components/reusableFormFields/TextField";
import { AddIcon } from "../../../../helpers/images";
import { LoadingButton } from "@mui/lab";
import {
  addProductBenefitsData,
  editBenefitProductData,
  removeBenefitData,
  viewProductData,
} from "../../../../redux/api/admin/productService";
import { errorAlert, successAlert } from "../../../../helpers/globalFunctions";
import { authEndPoints } from "../../../../helpers/endpoints";
import { BenefitForm } from "../../../../helpers/validate";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function BenefitsForm({
  handleNext,
  steps,
  activeStep,
  handleBack,
  productId,
  type,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialvalue = useSelector(
    (state) => state?.adminProduct?.viewProduct?.data?.data?.product
  );
  console.log(initialvalue);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      health_benifits: [{}],
    },
    mode: "onChange",
    resolver: yupResolver(BenefitForm),
  });
  console.log(errors);
  const { fields, append, remove } = useFieldArray({
    control,
    name: "health_benifits",
    required: true,
  });

  const url = window.location.href;
  const parts = url.split("/");
  const productName = parts[parts.length - 1];

  const handleInvoiceAdd = async (values) => {
    console.log(values);
    const parameters = {
      url: `${authEndPoints.product.productAddBenefit}`,
      data: { ...values, product_id: productId },
    };

    try {
      const response = await dispatch(
        addProductBenefitsData(parameters)
      ).unwrap();
      successAlert(response.message);
      handleNext();
    } catch (error) {
      errorAlert(error.error);
    }
  };

  const handleEditBenefits = async (values) => {
    console.log(values);

    const updatedNutricianDetails = values.health_benifits.map(
      (detail, index) => ({
        ...detail,
        id: initialvalue?.health_benifits[index]?.id, // Access id from the initial value nutrician_details
      })
    );
    console.log(updatedNutricianDetails);

    const parameters = {
      url: `${authEndPoints.product.editBenefitProduct}`,
      data: {
        ...values,
        product_id: initialvalue?.id,
        health_benifits: updatedNutricianDetails,
      },
    };

    try {
      const response = await dispatch(
        editBenefitProductData(parameters)
      ).unwrap();
      successAlert(response.message);
    } catch (error) {
      errorAlert(error.error);
    }
  };

  // view product
  const viewProduct = async () => {
    const parameters = {
      url: `${authEndPoints.product.productView(productName)}`,
    };
    try {
      const res = await dispatch(viewProductData(parameters)).unwrap();
    } catch (errors) {
      errorAlert(errors?.error);
    }
  };

  const deleteApiNutri = async (index) => {
    console.log(initialvalue?.health_benifits[index]?.id);
    if (initialvalue?.health_benifits[index]?.id) {
      const parameters = {
        url: `${authEndPoints.product.healthRemove(
          initialvalue?.health_benifits[index]?.id
        )}`,
      };
      try {
        const response = await dispatch(removeBenefitData(parameters)).unwrap();
        successAlert(response.message);
      } catch (errors) {
        errorAlert(errors?.error);
      }
    }
    // Remove item from the form
    remove(index);
  };

  const handleProductPage = () => {
    navigate("/admin/products");
  };

  useEffect(() => {
    if (type === "edit") {
      viewProduct();
    }
  }, [type]);

  useEffect(() => {
    if (type === "edit") {
      // Extract the health benefits array from the initialvalue object
      const initialBenefits = initialvalue?.health_benifits || [];

      // Map the health benefits array to a new array with the field name expected by react-hook-form
      const defaultValues = initialBenefits.map((benefit) => ({
        health_benifit: benefit.health_benifit,
      }));

      // Set the default values for the health_benefits field array
      setValue("health_benifits", defaultValues);
    }
  }, [initialvalue]);

  return (
    <Box sx={{ mx: 2 }}>
      <form
        onSubmit={
          type === "add"
            ? handleSubmit(handleInvoiceAdd)
            : handleSubmit(handleEditBenefits)
        }
      >
        {fields.map((field, index) => (
          <Box key={field.id} sx={{ mt: 2 }}>
            <Stack direction={"row"} gap={3}>
              <Grid item xs={6}>
                <TextFormField
                  //   sx={{ width: { md: "138px", sm: "135px" } }}

                  name={`health_benifits.${index}.health_benifit`}
                  control={control}
                  Controller={Controller}
                  label="Benefits"
                  error={
                    errors?.health_benifits?.[index]?.health_benifit?.message
                  }
                />
              </Grid>

              <img
                src={AddIcon}
                className="misc-addicon"
                onClick={() =>
                  append({
                    // invoice_id: "",
                    // item: "",
                    // qty: "",
                    // price: "",
                    // receipt: [],
                    health_benifit: "",
                  })
                }
              />

              {index >= 0 && (
                <CloseIcon
                  variant="outlined"
                  onClick={() => deleteApiNutri(index)}
                  className="misc-addicon"
                ></CloseIcon>
              )}
            </Stack>
          </Box>
        ))}

        <Box sx={{ mt: 5 }} display={"flex"} justifyContent={"flex-end"}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1, background: "#951e76", color: "white" }}
            className="product-stepper-button"
          >
            Back
          </Button>
          {type === "edit" ? (
            <LoadingButton
              loadingPosition="center"
              loading={isSubmitting}
              variant="contained"
              type="submit"
              sx={{ background: "#951e76", color: "white" }}
              className="product-stepper-button1"
            >
              {activeStep === steps.length - 1 ? "Update" : "Save"}
            </LoadingButton>
          ) : (
            <LoadingButton
              loadingPosition="center"
              loading={isSubmitting}
              variant="contained"
              type="submit"
              sx={{ background: "#951e76", color: "white" }}
              className="product-stepper-button1"
            >
              {activeStep === steps.length - 1 ? "Save" : "Save"}
            </LoadingButton>
          )}
          {type === "edit" && (
            <Button
              disabled={activeStep === 0}
              onClick={handleProductPage}
              sx={{ mr: 1, background: "#951e76", color: "white", ml: 2 }}
              className="product-stepper-button"
            >
              Close
            </Button>
          )}
        </Box>
      </form>
    </Box>
  );
}
export default BenefitsForm;
