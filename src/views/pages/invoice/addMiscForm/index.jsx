import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import {
    Button,
    Modal,
    TextField,
    Grid,
    MenuItem,
    IconButton,
    ButtonGroup,
    Box,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, InputLabel, Stack, Typography, FormHelperText, Avatar, InputAdornment,
} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ReactFileReader from "react-file-reader";
import roleSlice from 'redux/slice/roleSlice';
import { authEndPoints } from "helpers/endpoints";
import { essentialList } from 'redux/api/services/essentialService';
import { useDispatch, useSelector } from 'react-redux';
import { errorAlert, successAlert } from 'helpers/globalFunctions';
import { addEmployeeData } from 'redux/api/services/employeeService';
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { AddIcon } from 'helpers/images';
import CloseIcon from '@mui/icons-material/Close';
import { invoiceAdd, invoiceMiscAddData } from 'redux/api/services/invoiceService';
import TextFormField from 'components/reusableFormFields/TextField';
import MobileField from 'components/reusableFormFields/TextField/mobileField';
import ImageUploadComponent from 'components/reusableFormFields/ImageUpload';
import { LoadingButton } from '@mui/lab';
import { logDOM } from '@testing-library/react';
import ImageFieldComponent from 'components/reusableFormFields/ImageField';
import { addMiscForm } from 'helpers/validate';
import { Opacity } from '@mui/icons-material';



function AddMiscForm(props) {

    const { onClose, invoiceData } = props
    const { onClick, initialData } = props;
    const [images, setImages] = useState({})
    const [imageNew, setImageNew] = useState({})
    const [url, setUrl] = useState({})
    const [specificId, setSpecificId] = useState(0)
    const dispatch = useDispatch()
    const imageUrl = process.env.REACT_APP_IMG_URL

    const { register, handleSubmit, control, setValue, getValues, reset, watch, formState: { errors, isSubmitting } } = useForm(
        {
            defaultValues: {
                expenses: [{ receipt: null }]
            },
            resolver: yupResolver(addMiscForm),
            mode: "onChange",

        }
    );

    const [adminsrole, setadminsRole] = useState(null);
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'expenses',
        required: true,

    });


    const handleInvoiceAdd = async () => {

        const values = getValues()
        values.expenses.forEach((expense, index) => {
            if (expense.receipt instanceof File) {
                values.expenses[index].receipt = [expense.receipt];
            }
        });
        console.log(values);
        const parameter = {
            url: authEndPoints.invoice.miscAddInvoice,
            data: values,
        };
        try {
            const response = await dispatch(invoiceMiscAddData(parameter)).unwrap();
            successAlert(response.message)
            onClose()

        } catch (errors) {
            errorAlert(errors?.error);
        }
    };


    // const handleImages = (e) => {
    //     // console.log(e.target.files);
    //     // const newImages = Array.from(e.target.files).map((file) => file);
    //     // const currentImage = watch(`expenses.${specificId}.receipt`);
    //     // setValue(`expenses.${specificId}.receipt`, [...(currentImage || []), ...newImages]);
    //     // setImages(newImages)
    //     const temp = e.target.files;
    //     if (temp.length > 0) {
    //         const file = temp[0];
    //         const fileArray = [file];
    //         const reader = new FileReader();
    //         reader.readAsDataURL(file);
    //         reader.onload = () => {
    //             const base64String = reader.result;
    //             setValue(`expenses.${specificId}.receipt`, fileArray);
    //             setImageNew(`expenses.${specificId}.receipt`, base64String);
    //             console.log(file);
    //         };
    //     }

    // };

    return (

        <Box sx={{ mx: 2 }}>
            <form onSubmit={handleSubmit(handleInvoiceAdd)}>


                {fields.map((field, index) => (

                    <Box key={field.id}>
                        <Stack direction={'row'} gap={3}>
                            <Grid item xs={3}>
                                <TextFormField
                                    sx={{ width: { md: '150px', sm: '135px' } }}
                                    name={`expenses.${index}.item`}
                                    control={control}
                                    Controller={Controller}
                                    label="Item"
                                    error={errors.expenses?.[index]?.item?.message}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextFormField
                                    sx={{ width: { md: '150px', sm: '135px' } }}
                                    name={`expenses.${index}.qty`}
                                    control={control}
                                    Controller={Controller}
                                    label="Quantity"
                                    error={errors.expenses?.[index]?.qty?.message}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <MobileField
                                    sx={{ width: { md: '150px', sm: '135px' } }}
                                    name={`expenses.${index}.price`}
                                    control={control}
                                    Controller={Controller}
                                    label="Price"
                                    error={errors.expenses?.[index]?.price?.message}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                    }}

                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Stack direction={'horizontal'} gap={2} >
                                    <ImageFieldComponent
                                        sx={{ width: { md: '138px', sm: '135px' } }}
                                        control={control}
                                        Controller={Controller}
                                        name={`expenses.${index}.receipt`}
                                        label="Upload Receipt"
                                        watch={watch}
                                        setValue={setValue}
                                    />
                                    <Grid item xs={1} sx={{ width: "0px" }}>
                                        <TextField
                                            {...register(`expenses.${index}.invoice_id`,
                                                { required: "Item is required" }
                                            )}
                                            size='small'
                                            value={invoiceData.id}
                                            sx={{
                                                // display: "",
                                                marginTop: "27px",
                                                opacity:0
                                            }}
                                        />
                                    </Grid>
                                </Stack>
                            </Grid>
                            <img src={AddIcon} className="misc-addicon" onClick={() => append({ invoice_id: '', item: '', qty: '', price: '', receipt: [] })} />{" "}
                            {index !== 0 &&
                                <CloseIcon variant="outlined" onClick={() => remove(index)} className="misc-addicon"></CloseIcon>
                            }

                        </Stack>
                    </Box>
                ))}

                < Stack direction={"row"} gap={2} sx={{ mt: 3, mb: 3 }} alignItems={'center'} justifyContent={'center'}>
                    <LoadingButton loadingPosition="center" loading={isSubmitting} variant="contained" type="submit" className="submitBtnn">
                        Submit
                    </LoadingButton>
                    <Button type="submit" variant="contained" color="primary" className="submitBtnn"  onClick={onClose}>
                        Cancel
                    </Button>
                </Stack>
            </form >
        </Box >


    );
}
export default AddMiscForm