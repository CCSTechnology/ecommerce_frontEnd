import { LoadingButton } from "@mui/lab";
import { Box, Grid } from "@mui/material";
import * as React from "react";
import { useDispatch } from "react-redux";
import { FormInputText } from "../../../components/formField/TextField";
import MobileField from "../../../components/reusableFormFields/TextField/mobileField";
import {
  guestAddAddress,
  publicAddAddress
} from "../../../redux/api/public/authService";


export default function GuestLoginForm({
  user,
  getMe,
  formHook,
  setGuestAllow,
}) {
  const dispatch = useDispatch();


  const inputs = React.useMemo(() => {
    return [
      {
        name: "name",
        label: "Name",
        show: true,
      },
      {
        name: "cart_id",
        label: "Cart Id",
        show: false,
      },
      {
        name: "phone_number",
        label: "Phone Number",
        type: "number",
        show: true,
      },
      {
        name: "same_address",
        label: "Same Address",
        type: "switch",
        show: true,
      },
      {
        name: "email",
        type: "email",
        label: "Email",
        show: true,
      },
      {
        name: "country",
        label: "Country",
        show: true,
      },
      {
        name: "state",
        label: "state",
        show: true,
      },
      {
        name: "city",
        label: "City",
        show: true,
      },
      {
        name: "street_name",
        label: "Area",
        show: true,
      },
      {
        name: "line1",
        label: "Street Details",
        show: true,
      },
      {
        name: "zipcode",
        label: "pincode",
        show: true,
      },
      {
        name: "address",
        label: "Address",
        show: false,
      },
    ];
  }, []);

  const {
    control,
    handleSubmit,
    errors,
    reset,
    formState: { isSubmitting },
  } = formHook;


  async function AddAddress(values) {
    values.is_default = 1;
    (values.address = "222 Citigate Drive, Barrhaven, ON, Canada"),
      (values.type = "Shipping Address");
    try {
      if (user) {
        await dispatch(publicAddAddress(values)).unwrap();
        await getMe();
      } else {
        const details = {};
        values.same_address = true;
        values.cart_id = localStorage.getItem("cart_id") || null;
        const array = [
          "country",
          "state",
          "city",
          "street_name",
          "line1",
          "zipcode",
          "address",
        ];
        for (const [key, value] of Object.entries(values)) {
          if (array.includes(key)) {
            details[key] = value;
            delete values[key];
          }
        }
        values.address_details = [details];
        const response = await dispatch(guestAddAddress(values)).unwrap();
        setGuestAllow(response);
      }
    } catch (error) {
    }
  }

  React.useEffect(() => {
    if (user) {
      reset({
        cart_id: localStorage.getItem("cart_id"),
        ...user,
      });
    }
  }, [user]);

  return (
    <Box>
      <Box sx={{ m: 5, mx: 15 }} className="formFullCtr">
        <form onSubmit={handleSubmit(AddAddress)}>
          <Grid container spacing={3}>
            {inputs.map((input, index) => {
              const { type, name, show, label } = input;
              switch (type) {
                case "phone":
                  return (
                    <Grid item span={6} key={index}>
                      <MobileField
                        name={name}
                        control={control}
                        label="Mobile"
                        error={errors?.phone_number?.message}
                      />
                    </Grid>
                  );
                default:
                  return (
                    <Grid item lg={6} key={index}>
                      <FormInputText control={control} name={name} />
                    </Grid>
                  );
              }
            })}

            <Box className="text-center-cls" sx={{ my: 1 }}>
              <LoadingButton
                loadingPosition="center"
                loading={isSubmitting}
                variant="contained"
                type="submit"
                className="Submitbtn"
                style={{ backgroundColor: "#951e76" }}
              >
                Add Address
              </LoadingButton>
            </Box>
          </Grid>
        </form>
      </Box>
    </Box>
  );
}
