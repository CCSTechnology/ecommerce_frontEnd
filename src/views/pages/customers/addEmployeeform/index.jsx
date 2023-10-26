import { Box, Button, Container, FormControl, Grid, InputLabel, Select, Stack, TextField, Typography, MenuItem, FormHelperText, Avatar, CircularProgress, IconButton, InputAdornment } from '@mui/material'
import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import { authEndPoints } from "helpers/endpoints";
import { essentialList } from 'redux/api/services/essentialService';
import { AddressFormater, errorAlert, successAlert } from 'helpers/globalFunctions';
import { useDispatch, useSelector } from 'react-redux';
import { addDirectoryData } from 'redux/api/services/directoryService';
import { addEmployeeData, viewEmployeeData } from 'redux/api/services/employeeService';
import AddIcon from '@mui/icons-material/Add';
import { LoadingButton } from '@mui/lab';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import AdressField from 'components/formField/AdressFiels';
import DeleteIcon from '@mui/icons-material/Delete';
import { editEmployeeform } from 'helpers/validate';
import TextFormField from 'components/reusableFormFields/TextField';
import PasswordField from 'components/reusableFormFields/TextField/passwordField';
import AddressField from 'components/reusableFormFields/AddressField/addressField';
import MobileField from 'components/reusableFormFields/TextField/mobileField';
import ImageUploadComponent from 'components/reusableFormFields/ImageUpload';
import FormLoader from 'components/formLoader';
import FormLoaderEmp from 'components/formLoaderemp';




const AddDirectoryForm = (props) => {


    const { onClick, initialData = null, type } = props;

    const [showPassword, setShowPassword] = useState(false);
    const [adminsrole, setadminsRole] = useState(null);
    const initialvalue = useSelector((state) => state?.employee?.viewEmployee?.data?.data)
    const formLoading = useSelector((state) => state?.employee?.viewEmployee?.loading)
    const [images, setImages] = useState({})
    const dispatch = useDispatch()
    const { register, handleSubmit, control, setValue, getValues, reset, watch, formState: { errors, isSubmitting } } = useForm(
        {
            defaultValues: type === 'add' ? {

            } : initialvalue,
            resolver: yupResolver(editEmployeeform),
            mode: "onChange",

        }

    );


    const handleChange = (e) => {
        // const value = e.target.value;
        // console.log(value);
        // setValue(`role`, value.toString());
    };

    const handleFiles = (event) => {
        console.log(event.target.files[0]);
        const temp = event.target.files
        if (temp.length > 0) {
            const file = temp[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const base64String = reader.result;
                setImages(base64String)
                setValue(`image`, file);
            };
        }
    };

    // delete image
    const handleDeleteImage = () => {
        setValue('image', null);
        setImages(null)
    };

    const viewEmployee = async () => {
        const parameters = {
            url: `${authEndPoints.employee.viewEmployee(initialData?.id)}`,
        };
        try {
            await dispatch(viewEmployeeData(parameters)).unwrap();
        } catch (errors) {
            errorAlert(errors?.error);
        }
    };

    // Add Directory Api
    const handleAddEmployee = async () => {

        const values = getValues()

        const formatedAddress = AddressFormater(values.address)
        const {
            image,
            ...others
        } = values;

        const data = {
            ...values,
            ...formatedAddress
        }

        const dataEdit = {
            ...others,
            ...formatedAddress
        }

        const parameters = {
            url: initialData ? `${authEndPoints.employee.editEmployee(initialData?.id)}` : authEndPoints.employee.newEmployee,
            data: initialData ? dataEdit : data,

        };
        try {
            const response = await dispatch(addEmployeeData(parameters)).unwrap();
            onClick();
            successAlert(response.message);
        } catch (error) {
            errorAlert(error.error);
            console.log(errors);
        }
    };

    // visibility
    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    useEffect(() => {
        if (initialData) {
            const Img = initialData.image ? initialData.image : ""
            setImages(Img)
        }

    }, [])

    useEffect(() => {
        setValue('address', initialData?.address ? initialData.address : '');
    }, [initialData, setValue]);

    useEffect(() => {
        if (type === "edit") {
            viewEmployee()
        }
    }, [type])

    useEffect(() => {
        if (type !== "add") {
            if (initialvalue) {
                // const { date, start_time, end_time, created_by, created_at, ...others } = initialValue;
                // const prevData = {
                // 	...others,
                // 	date: dayjs(date, "YYYY-MM-DD"),
                // 	start_time: dayjs(start_time, "hh:mm A"),
                // 	end_time: dayjs(end_time, "hh:mm A"),
                // };
                reset(initialvalue);
            } else {
                reset();
            }
        } else {
            reset();
        }
    }, [initialvalue]);

    return (
        <Box sx={{ mx: 2 }}>

            {formLoading ? (<FormLoaderEmp />) : (
                <form onSubmit={handleSubmit(handleAddEmployee)}>


                    <Grid container spacing={5} sx={{ mb: 2 }} >

                        <Grid item xs={6} direction={'column'}>
                            <TextFormField
                                name="first_name"
                                control={control}
                                Controller={Controller}
                                label="First Name"
                                error={errors?.first_name?.message}
                            />
                        </Grid>
                        <Grid item xs={6} direction={'column'} >
                            <TextFormField
                                name="last_name"
                                control={control}
                                Controller={Controller}
                                label="Last Name"
                                error={errors?.last_name?.message}
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={5} sx={{ mb: 2 }}>
                        <Grid item xs={6}>
                            <TextFormField
                                name="email"
                                control={control}
                                Controller={Controller}
                                label="Email"
                                error={errors?.email?.message}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <MobileField
                                name="mobile"
                                control={control}
                                Controller={Controller}
                                label="Mobile"
                                error={errors?.mobile?.message}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">+61</InputAdornment>,
                                }}
                            />
                        </Grid>

                    </Grid>

                    <Grid container spacing={2} sx={{ mb: 2 }}>

                        <Grid item xs={12} md={12} className="address-employee">
                            <AddressField
                                name="address"
                                control={control}
                                Controller={Controller}
                                error={errors?.address?.message}
                                required={true}
                                label="Address"
                                type="text"
                            // disabled={disabled}
                            />

                        </Grid>
                    </Grid>
                    <Grid container spacing={5} sx={{ mb: 2 }}>
                        <Grid item xs={6}>
                            <TextFormField
                                name="zip_code"
                                control={control}
                                Controller={Controller}
                                label="Postal Code"
                                error={errors?.zip_code?.message}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <ImageUploadComponent
                                control={control}
                                Controller={Controller}
                                name="image"
                                label="Profile Image"
                                watch={watch}
                                setValue={setValue}
                            />
                        </Grid>
                    </Grid>

                    <Grid item xs={6}>
                        {type === "add" && (
                            <PasswordField
                                name="password"
                                control={control}
                                Controller={Controller}
                                error={errors?.password?.message}
                                label="Password"
                                type="text"
                            />
                        )}

                    </Grid>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} gap={5} sx={{ p: 3 }}>
                        <LoadingButton
                            loadingPosition="center"
                            loading={isSubmitting}
                            variant="contained"
                            type="submit"
                            className="submitBtnn">
                            Submit
                        </LoadingButton>
                    </Stack>

                </form>
            )}

        </Box >
    )
}

export default AddDirectoryForm