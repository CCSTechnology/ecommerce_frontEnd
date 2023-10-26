/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Box, Grid, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { yupResolver } from '@hookform/resolvers/yup'
import SelectField from 'components/reusableFormFields/selectField';
import TextFormField from "components/reusableFormFields/TextField";
import { useForm, Controller } from 'react-hook-form'
import { authEndPoints } from "helpers/endpoints";
import { errorAlert } from "helpers/globalFunctions";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import AutocompleteField from "components/reusableFormFields/Autocomplete";
import { addNotification } from "redux/api/services/notificationService";
import { essentialList } from "redux/api/services/essentialService";
import { vaidateNotification } from 'helpers/validate';

export default function AddNotificationform({ disabled }) {

  const dispatch = useDispatch();
  const [fieldShow, setFieldShow] = useState(false);
  const [fieldShowOne, setFieldShowOne] = useState(false);

  const jobPosition = [
    { label: 'User', value: '1' },
    { label: 'Supervisor', value: '2' },
    { label: 'All', value: '3' }
  ]

  const { handleSubmit, control, reset, watch, formState: { errors, isSubmitting } } = useForm({

    resolver: yupResolver(vaidateNotification),
    mode: 'onSubmit'

  })
console.log(errors)
  const PositionType = watch("recevier_type")

  const [essential, setEssential] = useState({
    users: [],
    supervisors: [],
  });

  const essentialApi = async () => {
    try {
      const parameters = {
        url: `${authEndPoints.essential.essentialSelect}`,
        include: "supervisors,users",
      };
      const response = await dispatch(essentialList(parameters)).unwrap();
      setEssential(response.data);
    } catch (errors) {
      errorAlert(errors?.error);
    }
  };

  useEffect(() => {
    essentialApi();
  }, []);

  const handleAddNotification = async (values) => {

    let ObjectData = {};

    if (PositionType === '3') {
      ObjectData = {
        title: values.title,
        recevier_type: "all",
        message: values.message,
      };
    } else if (PositionType === '1') {
      ObjectData = {
        title: values.title,
        recevier_type: "user",
        recevier_id: values.assign_to?.value ?? "",
        message: values.message
      };
    } else if (PositionType === '2') {
      ObjectData = {
        title: values.title,
        recevier_type: "supervisor",
        recevier_id: values.supervisor_id?.value ?? "",
        message: values.message
      };
    }
    const parameters = {
      data: ObjectData,
      url: authEndPoints.notification.newNotification,
    }
    try {
      const response = await dispatch(addNotification(parameters)).unwrap();
      toast.success(response.message);
      reset();
    } catch (error) {
      errorAlert(error.error);
    }
  }

  useEffect(() => {
    if (PositionType === '1') {
      setFieldShow(true)
      setFieldShowOne(false)
    } else if (PositionType === '2') {
      setFieldShowOne(true)
      setFieldShow(false)
    } else {
      setFieldShow(false)
      setFieldShowOne(false)
    }
  }, [PositionType])

  return (
    <Box>
      <form onSubmit={handleSubmit(handleAddNotification)}>
        <Grid container spacing={5} sx={{ mb: 1 }}>
          <Grid item xs={12} sx={{ marginLeft: 10, marginRight: 10 }}>
            <SelectField
              name="recevier_type"
              control={control}
              label="Roles"
              Controller={Controller}
              data={jobPosition}
              error={errors?.recevier_type?.message}
              disabled={disabled}
            />

            {fieldShow === true && (
              <AutocompleteField
                placeholder="Enter Job"
                name="assign_to"
                control={control}
                Controller={Controller}
                label="User's"
                type="text"
                data={essential.users}
                error={errors?.assign_to?.message}
                disabled={disabled}
              />
            )}

            {fieldShowOne === true && (
              <AutocompleteField
                name="supervisor_id"
                control={control}
                Controller={Controller}
                label="Supervisor"
                data={essential.supervisors}
                error={errors?.supervisor_id?.message}
                disabled={disabled}
              />
            )}

            <TextFormField
              name="title"
              control={control}
              Controller={Controller}
              label="Title"
              type="text"
              error={errors?.title?.message}
              disabled={disabled}
            />

            <TextFormField
              placeholder="Enter message"
              name="message"
              size="large"
              control={control}
              Controller={Controller}
              label="Message"
              type="message"
              error={errors?.message?.message}
              disabled={disabled}
            />

            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"center"}
              gap={5}
              sx={{ p: 3 }} >
              <LoadingButton
                loadingPosition="center"
                loading={isSubmitting}
                variant="contained"
                type="submit"
                className="submitBtnn"
              >
                Send
              </LoadingButton>
            </Stack>

          </Grid>
        </Grid>

      </form>

    </Box>
  )
}
