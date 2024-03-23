import { useForm, useFieldArray, Controller } from "react-hook-form";
import {
  Button,
  TextField,
  Grid,
  Box,
  Stack,
  InputAdornment,
} from "@mui/material";

import { useDispatch } from "react-redux";

import { yupResolver } from "@hookform/resolvers/yup";

import CloseIcon from "@mui/icons-material/Close";

import TextFormField from "../../../../components/reusableFormFields/TextField";
import { AddIcon } from "../../../../helpers/images";
import { LoadingButton } from "@mui/lab";
import { addProductBenefitsData } from "../../../../redux/api/admin/productService";
import { errorAlert, successAlert } from "../../../../helpers/globalFunctions";
import { authEndPoints } from "../../../../helpers/endpoints";

function BenefitsForm({
  handleNext,
  steps,
  activeStep,
  handleBack,
  productId,
}) {
  const dispatch = useDispatch();

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
    // resolver: yupResolver(),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "health_benifits",
    required: true,
  });

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

  return (
    <Box sx={{ mx: 2 }}>
      <form onSubmit={handleSubmit(handleInvoiceAdd)}>
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
                    errors.health_benifits?.[index]?.health_benifit?.message
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
              />{" "}
              {index !== 0 && (
                <CloseIcon
                  variant="outlined"
                  onClick={() => remove(index)}
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
          <LoadingButton
            loadingPosition="center"
            loading={isSubmitting}
            variant="contained"
            type="submit"
            sx={{ background: "#951e76", color: "white" }}
            className="product-stepper-button1"
          >
            {activeStep === steps.length - 1 ? "Finish" : "Save"}
          </LoadingButton>
        </Box>
      </form>
    </Box>
  );
}
export default BenefitsForm;
