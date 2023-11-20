import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";

import { useDispatch } from "react-redux";
import { searchFeatureList } from "../../../redux/api/admin/settingService";
import { authEndPoints } from "../../../helpers/endpoints";

const YourComponent = () => {
  const dispatch = useDispatch();
  const { control, handleSubmit, errors } = useForm();
  const [searchKey, setSearchKey] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [loading, setLoading] = useState(false);

  //   const featureSearchList = async () => {
  //     const parameters = {
  //       url: `${authEndPoints.setting.searchFeature}?search=${searchKey}`,
  //     };
  //     try {
  //       const res = await dispatch(searchFeatureList(parameters)).unwrap();
  //       console.log(res);
  //       setSerachList(res);
  //     } catch (errors) {
  //       errorAlert(errors?.error);
  //     }
  //   };
  const featureSearchList = async (inputValue) => {
    setSearchKey(inputValue);
    setLoading(true);
    const parameters = {
      url: `${authEndPoints.setting.searchFeature}?search=${searchKey}`,
    };
    try {
      const res = await dispatch(searchFeatureList(parameters)).unwrap();
      console.log(res);
      setSearchList(res);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // You can use debounce here to avoid rapid API calls while typing
    const debouncedSearch = setTimeout(() => {
      featureSearchList(searchKey);
    }, 300);

    return () => clearTimeout(debouncedSearch);
  }, [searchKey]);

  const handleAddProduct = (data) => {
    // Handle the form submission logic here
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(handleAddProduct)}>
      <Autocomplete
        freeSolo
        id="asynchronous-demo"
        options={searchList}
        loading={loading}
        getOptionLabel={(option) => option.label}
        onChange={(e, v) => {
          // Navigate to the selected value or the first item in the list or an empty string
          window.location.href =
            v?.value || (searchList[0] && searchList[0].uniquelabel) || "";
        }}
        onInputChange={(e, newInputValue) => {
          featureSearchList(newInputValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Product Name"
            size="small"
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default YourComponent;
