import React, { useState } from 'react'
import Modal from '@mui/material/Modal';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { LoadingButton } from "@mui/lab";
import * as yup from "yup";
import { Box, Grid, List, ListItem, IconButton, ListItemText, TextField, TextareaAutosize, Select, FormLabel, FormControl, MenuItem, Checkbox, FormControlLabel, RadioGroup, Radio, Typography, Button, Stack } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import TextBox from 'components/formField/TextBox';
import TextArea from 'components/formField/TextArea';
import Date from 'components/formField/Date';
import SelectItem from 'components/formField/SelectItem';
import CheckBox from 'components/formField/CheckBox';
import FileUpload from 'components/formField/FileUpload';
import RadioBox from 'components/formField/RadioBox';
import CloseIcon from '@mui/icons-material/Close';

export default function FormModal(props) {

    const { open, setOpenModal, handleChange, title, setRadioOption, setCheckboxOption, setDropdownOption } = props;
    const schema = yup.object().shape({
        // email: yup.string().email(email.valid).required(email.required),
        // password: yup
        // 	.string()
        // 	.min(8, password.min)
        // 	.max(32, password.max)
        // 	.required(password.required),
    });
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(schema),
    });

    return (
        <div>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                {/* <Box className="form-popup"> */}
                <Box className="form-popup" sx={{ boxShadow: 24, p: 4 }}>
                    <Stack direction={'row'} gap={2} alignItems={'center'} justifyContent={'space-between'} sx={{ mb: 3 }}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            {title}
                        </Typography>
                        <IconButton onClick={() => { setOpenModal(false) }}>
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                    <Box sx={{ m: 1, mx: 15 }}>
                        {
                            title === "Text Box" ?
                                (<TextBox
                                    handleChange={handleChange}
                                    control={control}
                                    errors={errors}
                                    isSubmitting={isSubmitting}
                                    handleSubmit={handleSubmit}
                                />

                                ) : title === "Description" ? (
                                    <TextArea
                                        handleChange={handleChange}
                                        control={control}
                                        errors={errors}
                                        isSubmitting={isSubmitting}
                                        handleSubmit={handleSubmit}
                                    />
                                ) : title === "Date" ? (
                                    <Date
                                        handleChange={handleChange}
                                        control={control}
                                        errors={errors}
                                        isSubmitting={isSubmitting}
                                        handleSubmit={handleSubmit}
                                    />
                                ) : title === "Dropdown" ? (
                                    <SelectItem
                                        handleChange={handleChange}
                                        control={control}
                                        errors={errors}
                                        isSubmitting={isSubmitting}
                                        handleSubmit={handleSubmit}
                                        setDropdownOption={setDropdownOption}
                                    />
                                ) : title === "Check Box" ? (
                                    <CheckBox
                                        handleChange={handleChange}
                                        control={control}
                                        errors={errors}
                                        isSubmitting={isSubmitting}
                                        handleSubmit={handleSubmit}
                                        setCheckboxOption={setCheckboxOption}
                                    />
                                ) : title === "File Upload" ? (
                                    <FileUpload
                                        handleChange={handleChange}
                                        control={control}
                                        errors={errors}
                                        isSubmitting={isSubmitting}
                                        handleSubmit={handleSubmit} />
                                ) : title === "Radio Box" ? (
                                    <RadioBox
                                        handleChange={handleChange}
                                        control={control}
                                        errors={errors}
                                        isSubmitting={isSubmitting}
                                        handleSubmit={handleSubmit} 
                                        setRadioOption={setRadioOption}/>
                                ) : null
                        }

                    </Box>

                </Box>
            </Modal>
        </div>
    )
}
