import {
    Box,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Stack,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TextFormField from "../../../../components/reusableFormFields/TextField";
import ImageUploadComponent from "../../../../components/reusableFormFields/ImageUpload";
import {
    settingImageAdd,
    settingImageData,
    settingImageEdit,
} from "../../../../redux/api/admin/settingService";
import { authEndPoints } from "../../../../helpers/endpoints";
import { errorAlert, successAlert } from "../../../../helpers/globalFunctions";

const ContentForm = (props, disabled) => {
    const { onClick, initialData = null, typeSelect } = props;
    const dispatch = useDispatch();
    const editorRef = useRef(null);
    const [type, setType] = React.useState("");

    const initialValue = useSelector(
        (state) => state?.adminSetting?.settingImageData?.data?.data
    );

    const imageUrl = import.meta.env.VITE_APP_IMG_URL;

    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
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
        defaultValues: typeSelect === "add" ? {} : initialValue,
        mode: "onChange",
    });

    const handleChangeType = (event) => {
        setType(event.target.value);
    };

    const handleAddContent = async (values) => {
        const parameters = {
            url: `${authEndPoints.setting.imageSettingAdd}`,
            data: values,
        };
        try {
            const response = await dispatch(settingImageAdd(parameters)).unwrap();
            onClick();
            successAlert(response.message);
        } catch (error) {
            errorAlert(error.error);
            console.log(errors);
        }
    };

    const handleEditContent = async (values) => {
        console.log(values);
        const parameters = {
            url: `${authEndPoints.setting.imageSettingEdit(initialValue.id)}`,
            data: values,
        };
        try {
            const response = await dispatch(settingImageEdit(parameters)).unwrap();
            onClick();
            successAlert(response.message);
        } catch (error) {
            errorAlert(error.error);
            console.log(errors);
        }
    };
    const viewSettingImage = async () => {
        const parameters = {
            url: `${authEndPoints.setting.imageView(initialData)}`,
        };
        try {
            const res = await dispatch(settingImageData(parameters)).unwrap();
        } catch (errors) {
            errorAlert(errors?.error);
        }
    };
    useEffect(() => {
        if (typeSelect === "edit") {
            viewSettingImage();
        }
    }, [type]);

    useEffect(() => {
        if (typeSelect !== "add") {
            if (initialValue) {
                reset(initialValue);
            } else {
                reset();
            }
        } else {
            reset();
        }
    }, [initialValue]);
    return (
        <Box sx={{ mx: 2 }}>
            {/* <FormLoader /> */}

            <form
                onSubmit={
                    typeSelect === "add"
                        ? handleSubmit(handleAddContent)
                        : handleSubmit(handleEditContent)
                }
            >
                {/* <form onSubmit={handleSubmit(handleAddProduct)}> */}
                <Box sx={{ mx: 2 }}>
                    <Grid container spacing={5} sx={{ mb: 2 }}>
                        <Grid item xs={12} direction={"column"}>
                            <TextFormField
                                name="title"
                                control={control}
                                Controller={Controller}
                                label="Title"
                                error={errors?.title?.message}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={5} sx={{ mb: 2 }}>
                        <Grid item xs={12} direction={"column"}>
                            <TextFormField
                                name="description"
                                control={control}
                                Controller={Controller}
                                label="Description"
                                multiline={true}
                                rows={4}
                                error={errors?.title?.message}
                            />
                        </Grid>
                    </Grid>


                    <Stack
                        direction={"row"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        gap={5}
                        sx={{ p: 3 }}
                    >
                        <LoadingButton
                            loadingPosition="center"
                            loading={isSubmitting}
                            variant="contained"
                            type="submit"
                            className="submitBtnn"
                        >
                            Submit
                        </LoadingButton>
                    </Stack>
                </Box>
            </form>
        </Box>
    );
};

export default ContentForm;
