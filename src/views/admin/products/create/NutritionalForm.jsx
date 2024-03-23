import { useForm, useFieldArray, Controller } from "react-hook-form";
import {
  Button,
  TextField,
  Grid,
  Box,
  Stack,
  InputAdornment,
  Dialog,
  DialogTitle,
  IconButton,
  DialogActions,
  DialogContentText,
  DialogContent,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import TextFormField from "../../../../components/reusableFormFields/TextField";
import { AddIcon } from "../../../../helpers/images";
import SelectField from "../../../../components/reusableFormFields/selectField";
import SelectFieldWithAdd from "../../../../components/reusableFormFields/selectfield-with-add";
import { LoadingButton } from "@mui/lab";
import { authEndPoints } from "../../../../helpers/endpoints";
import {
  addProductNutritionData,
  commonListData,
  removeMetricData,
} from "../../../../redux/api/admin/productService";
import { errorAlert, successAlert } from "../../../../helpers/globalFunctions";
import MetricForm from "./addMetricForm";
import { NutritionForm } from "../../../../helpers/validate";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function NutritionalForm({
  handleNext,
  steps,
  activeStep,
  handleBack,
  productId,
}) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const [metricData, setMetricData] = useState(null);
  const [essential, setEssential] = useState({
    cateLists: [],
  });
  const [essentialId, setEssentialId] = useState({});
  console.log(essentialId);
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
      nutrician_details: [{}],
    },
    mode: "onChange",
    resolver: yupResolver(NutritionForm),
  });

  console.log(errors);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "nutrician_details",
    required: true,
  });

  //Essential Api
  const essentialListApi = async () => {
    const value = "metric";
    const parameters = {
      url: `${authEndPoints.product.listCommon(value)}`,
    };
    try {
      const response = await dispatch(commonListData(parameters)).unwrap();
      console.log(response);
      setEssential(response.data);
      setEssentialId(
        response.data.map((item) => ({ id: item.value, label: item.label }))
      );
    } catch (errors) {
      errorAlert(errors?.error);
    }
  };

  const handleInvoiceAdd = async (values) => {
    const parameters = {
      url: `${authEndPoints.product.productAddNutri}`,
      data: { ...values, product_id: productId },
    };
    console.log(parameters);
    try {
      const response = await dispatch(
        addProductNutritionData(parameters)
      ).unwrap();
      successAlert(response.message);
      handleNext();
    } catch (error) {
      errorAlert(error.error);
    }
  };
  const handleButtonClick = async () => {
    await essentialListApi(); // Call handleAddDirectory to add directory data
  };

  const delteApiFn = async (id) => {
    console.log("delete");
    console.log(id);
    const parameters = {
      url: `${authEndPoints.product.metricRemove(id)}`,
    };
    try {
      const response = await dispatch(removeMetricData(parameters)).unwrap();

      successAlert(response.message);
      essentialListApi();
    } catch (errors) {
      errorAlert(errors?.error);
    }
  };

  useEffect(() => {
    essentialListApi();
    // delteApiFn();
  }, []);

  return (
    <Box sx={{ mx: 2 }}>
      <form onSubmit={handleSubmit(handleInvoiceAdd)}>
        {fields.map((field, index) => (
          <Box key={field.id} sx={{ mt: 2 }}>
            <Stack direction={"row"} gap={3}>
              <Grid item xs={3}>
                <TextFormField
                  //   sx={{ width: { md: "138px", sm: "135px" } }}

                  name={`nutrician_details.${index}.nutrician_detail`}
                  control={control}
                  Controller={Controller}
                  label="Nutritions"
                  error={
                    errors.nutrician_details?.[index]?.nutrician_detail?.message
                  }
                />
              </Grid>
              <Grid item xs={2}>
                {/* {essential?.category && ( */}
                <SelectFieldWithAdd
                  name={`nutrician_details.${index}.metric`}
                  control={control}
                  label="Metric"
                  Controller={Controller}
                  data={essential?.metric}
                  error={errors?.nutrician_details?.[index]?.metric?.message}
                  onAddButtonClick={() => setOpen(true)}
                  // disabled={type === "edit" && true}
                  delteApiFn={delteApiFn}
                />
                {/* )} */}
              </Grid>
              <Grid item xs={3}>
                <TextFormField
                  sx={{ width: { md: "138px", sm: "135px" } }}
                  name={`nutrician_details.${index}.per_serve`}
                  control={control}
                  Controller={Controller}
                  label="Per serve"
                  error={errors.nutrician_details?.[index]?.per_serve?.message}
                />
              </Grid>
              <img
                src={AddIcon}
                className="misc-addicon"
                onClick={() =>
                  append({
                    // invoice_id: "",
                    metric: "",
                    per_serve: "",
                    nutrician_detail: "",
                    // receipt: [],
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
      {open === true ? (
        <Dialog
          fullWidth={true}
          maxWidth={"sm"}
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Box> Add Metric</Box>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Stack>
          </DialogTitle>

          {/* <DialogContent sx={{ width: "300px" }}>
            <DialogContentText id="alert-dialog-slide-description">
              <TextFormField
                name="metric"
                control={control}
                Controller={Controller}
                label="Metric"
                error={errors?.metric?.message}
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button type="submit">save</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions> */}
          <MetricForm handleClose={handleClose} onClick={handleButtonClick} />
        </Dialog>
      ) : null}
    </Box>
  );
}
export default NutritionalForm;
