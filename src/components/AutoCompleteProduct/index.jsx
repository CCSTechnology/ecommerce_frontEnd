import React, { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, IconButton, Button, Grid, Stack } from "@mui/material";
import { useDispatch } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";
import { headerSearch } from "../../redux/api/public/homeService";
import {
  AlreadyAvailablePromotion,
  addPromotionProduct,
} from "../../redux/api/admin/promotionService";
import { authEndPoints } from "../../helpers/endpoints";
import { errorAlert, successAlert } from "../../helpers/globalFunctions";

const AsynchronousAutocomplete = ({
  control,
  register,
  setValue,
  watch,
  name,
  remove,
  onSelectProduct,
}) => {
  let { id } = useParams();

  const search = watch(`${name}.search`);
  //   const options = watch(`${name}.options`);
  const loading = watch(`${name}.loading`);
  const [options, setOptions] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [productid, setProductId] = useState(null);

  const CheckAlreadyAvailable = async () => {
    try {
      const response = await dispatch(AlreadyAvailablePromotion(1)).unwrap();
      const dataOptions = response.data || [];
      setOptions(dataOptions);
    } catch (error) {
      errorAlert(error.error);
      console.log(error);
    }
  };
  useEffect(() => {
    CheckAlreadyAvailable();
  }, []);
  // React.useEffect(() => {
  //   if (search) {
  //     getGlobalSearch(search);
  //   }
  // }, [search]);

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={{ search: "", options: [], loading: false }}
      render={({ field }) => (
        <Autocomplete
          fullWidth
          isOptionEqualToValue={(option, value) => option.label === value.label}
          getOptionLabel={(option) => option.label}
          options={options}
          loading={loading}
          onChange={(e, option) => {
            const value = option?.value || null;
            setProductId(value);
            onSelectProduct(value);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              value={search}
              onChange={(e) => setValue(`${name}.search`, e.target.value)}
              placeholder="Search"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <Box
                    sx={{
                      ".MuiInputBase-root": {
                        paddingRight: "0px",
                      },
                    }}
                  >
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </Box>
                ),
              }}
            />
          )}
        />
      )}
    />
  );
};

const MyForm = (props) => {
  const { onClick } = props;
  const dispatch = useDispatch();
  const { id } = useParams();
  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      product: [{ id: null, percentage: "" }], // Add initial item
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "product",
  });

  const onSubmit = async (values) => {
    console.log(values);
    values.promotion_id = 1;

    const data = {
      ...values,
    };

    try {
      const response = await dispatch(addPromotionProduct(data)).unwrap();
      onClick();
      successAlert(response.message);
    } catch (error) {
      errorAlert(error.error);
      console.log(error);
    }
  };

  useEffect(() => {
    // Append an empty item when the component mounts
    if (fields.length === 0) {
      append({
        id: null,
        percentage: "",
      });
    }
  }, [fields, append]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, index) => (
        <Grid container sx={{ mb: 3 }}>
          <Stack direction={"row"} gap={3}>
            <Grid item md={6} key={field.id}>
              <AsynchronousAutocomplete
                control={control}
                register={() => {}}
                // setValue={setValue}
                watch={watch}
                name={`product[${index}]`}
                remove={() => remove(index)}
                onSelectProduct={(id) => {
                  setValue(`product[${index}].id`, id);
                }}
                className="promote-form"
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                label="Percentage"
                value={watch(`product[${index}].percentage`)}
                onChange={(e) =>
                  setValue(`product[${index}].percentage`, e.target.value)
                }
                className="promote-form"
              />
            </Grid>
          </Stack>

          <IconButton sx={{ fontSize: "14px" }} onClick={() => remove(index)}>
            Remove
          </IconButton>
        </Grid>
      ))}
      <Grid container>
        <Grid item>
          {" "}
          <Button
            type="button"
            onClick={() =>
              append({
                // search: "",
                // options: [],
                // loading: false,
                id: null,
                percentage: "",
              })
            }
            sx={{ color: "#951e76" }}
          >
            Add
          </Button>
        </Grid>
        <Grid item>
          <Button type="submit" sx={{ color: "#951e76" }}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default MyForm;
