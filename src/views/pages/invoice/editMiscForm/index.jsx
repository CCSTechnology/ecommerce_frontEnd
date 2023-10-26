import {
    Box,
    Button,
    Container,
    FormControl,
    Grid,
    InputLabel,
    Select,
    Stack,
    TextField,
    Typography,
    MenuItem,
    FormHelperText,
    Avatar,
    CircularProgress,
    IconButton,
    InputAdornment,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { Controller, get, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { authEndPoints } from "helpers/endpoints";
import { essentialList } from "redux/api/services/essentialService";
import { errorAlert, successAlert } from "helpers/globalFunctions";
import { useDispatch } from "react-redux";
import { addDirectoryData } from "redux/api/services/directoryService";
import ReactFileReader from "react-file-reader";
import AddIcon from "@mui/icons-material/Add";
import { LoadingButton } from "@mui/lab";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import AdressField from "components/formField/AdressFiels";
import ImageUploadComponent from "components/reusableFormFields/ImageUpload";
import TextFormField from "components/reusableFormFields/TextField";
import { invoiceMiscEditData } from "redux/api/services/invoiceService";



const EditMiscForm = (props) => {

    const { invoiceMiscData } = props;
    const [showPassword, setShowPassword] = useState(false);


    const [isLoading, setIsLoading] = useState(false);
    const [images, setImages] = useState("");
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
        defaultValues: invoiceMiscData,
        mode: "onChange"
    });


    const handleFiles = (event) => {
        console.log(event.target.files[0]);
        const temp = event.target.files;
        if (temp.length > 0) {
            const file = temp[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const base64String = reader.result;
                setImages(base64String);
                setValue(`receipt`, file);
            };
        }

    };


    // Add Directory Api
    const handleEditMisc = async () => {
        const values = getValues();
        console.log(values);

        const parameters = {
            url: `${authEndPoints.invoice.miscEditInvoice(invoiceMiscData.id)}`,
            data: values
        };
        try {
            const response = await dispatch(invoiceMiscEditData(parameters)).unwrap();
            successAlert(response.message);
        } catch (error) {
            errorAlert(error.error);
        }
    };




    useEffect(() => {
        if (invoiceMiscData) {
            const Img = invoiceMiscData.receipt ? invoiceMiscData.receipt : "";
            setImages(Img);
        }
    }, []);



    return (
        <Box sx={{ mx: 2 }}>
            <form onSubmit={handleSubmit(handleEditMisc)}>
                <Grid container spacing={5} sx={{ mb: 2 }}>
                    <Grid item xs={6} direction={"column"}>
                        <TextFormField
                            name="item"
                            control={control}
                            Controller={Controller}
                            label="Item"
                            error={errors?.item?.message}
                        />

                    </Grid>
                    <Grid item xs={6}>
                        <TextFormField
                            name="price"
                            control={control}
                            Controller={Controller}
                            label="Price"
                            error={errors?.price?.message}
                        />

                    </Grid>
                </Grid>

                <Grid container spacing={5} sx={{ mb: 2 }}>
                    <Grid item xs={6}>
                        <TextFormField
                            name="qty"
                            control={control}
                            Controller={Controller}
                            label="Quantity"
                            error={errors?.qty?.message}
                        />

                    </Grid>
                    <Grid item xs={6}>
                        <ImageUploadComponent
                            control={control}
                            Controller={Controller}
                            name="receipt"
                            label="Upload Receipt"
                            watch={watch}
                            setValue={setValue}
                        />
                    </Grid>
                </Grid>

                <Stack direction={"row"} alignItems={"center"} justifyContent={"center"} gap={5} sx={{ p: 3 }}>
                    <LoadingButton loadingPosition="center" loading={isSubmitting} variant="contained" type="submit" className="submitBtnn">
                        Submit
                    </LoadingButton>
                </Stack>
            </form>
        </Box>
    );
};

export default EditMiscForm
