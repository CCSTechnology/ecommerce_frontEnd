// import React, { useEffect, useState } from 'react';
// import { useForm, useFieldArray } from 'react-hook-form';
// import {
//     Button,
//     Modal,
//     TextField,
//     Grid,
//     MenuItem,
//     IconButton,
//     ButtonGroup,
//     Box,
//     Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, InputLabel, Stack, Typography, FormHelperText
// } from '@mui/material';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import ReactFileReader from "react-file-reader";
// import roleSlice from 'redux/slice/roleSlice';
// import { authEndPoints } from "helpers/endpoints";
// import { essentialList } from 'redux/api/services/essentialService';
// import { useDispatch } from 'react-redux';
// import { errorAlert } from 'helpers/globalFunctions';
// import { addEmployeeData } from 'redux/api/services/employeeService';
// import * as yup from 'yup'
// import { yupResolver } from "@hookform/resolvers/yup"




// function AddEmployeeFormOne(props) {


//     const { onClick, initialData } = props;
//     const [images, setImages] = useState({})
//     console.log(props);
//     const dispatch = useDispatch()

//     const { register, handleSubmit, control, setValue, watch, formState: { errors } } = useForm(
//         {
//             mode: 'onChange'
//         }
//     );
//     console.log(errors, 'errors');
//     const [adminsrole, setadminsRole] = useState(null);
//     const { fields, append, remove } = useFieldArray({
//         control,
//         name: 'users',
//         required: true,

//     });

//     const [open, setOpen] = useState(true);
//     const [url, setUrl] = useState("https://i.imgur.com/ndu6pfe.png");




//     // Add or edit Employee Api
//     const handleAddEmployee = async (values) => {

//         const parameters = {

//             url: initialData ? `${authEndPoints.employee.editEmployee(initialData.id)}` : authEndPoints.employee.newEmployee,
//             data: initialData ? values.users[0] : values,
//         };
//         try {
//             const response = await dispatch(addEmployeeData(parameters)).unwrap();
//             onClick();
//         } catch (error) {
//             errorAlert(error.error);
//         }
//     };


//     // const handleChange = (e, index) => {
//     //     const value = e.target.value;
//     //     console.log(value);
//     //     setValue(`admins.${index}.role`, value.toString());
//     // };



//     const handleFiles = (index, files) => {
//         if (files && files.fileList.length > 0) {
//             const file = files.fileList[0];
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 const base64String = reader.result;
//                 setImages((state) => {
//                     return {
//                         ...state,
//                         [`users.${index}.image`]: base64String
//                     }
//                 })
//                 setValue(`users.${index}.image`, file);

//             };
//             reader.readAsDataURL(file);
//         }
//     };




//     //Essential Api
//     // const essentialListApi = async () => {
//     //     const parameters = {
//     //         url: `${authEndPoints.essential.essentialSelect}`,
//     //         include: "roles"
//     //     };
//     //     try {
//     //         const response = await dispatch(essentialList(parameters)).unwrap();
//     //         setadminsRole(response.data)

//     //     } catch (errors) {
//     //         errorAlert(errors?.error);
//     //     }
//     // };

//     // useEffect(() => {
//     //     essentialListApi()
//     // }, [])


//     useEffect(() => {
//         if (!fields.length) {
//             append()
//         }
//     }, [fields])

//     // console.log(role);

//     const columns = [
//         { id: 'name', label: 'First Name', minWidth: 170 },
//         { id: 'code', label: 'Last Name', minWidth: 170 },
//         { id: 'name', label: 'Email', minWidth: 170 },
//         { id: 'code', label: 'Mobile Number', minWidth: 170 },
//         { id: 'password', label: 'Password', minWidth: 170 },
//         { id: 'address', label: 'Address', minWidth: 170 },
//         { id: 'country', label: 'Country', minWidth: 170 },
//         { id: 'zipcode', label: 'Zipcode', minWidth: 170 },
//         { id: 'image', label: 'Image Upload', minWidth: 170 },
//         // { id: 'role', label: 'Role', minWidth: 170 },
//         { id: 'action', label: '', minWidth: 100 },
//     ];

//     return (

//         <Box sx={{ mx: 2 }}>
//             <form onSubmit={handleSubmit(handleAddEmployee)}>
//                 <Paper sx={{ width: '100%', overflow: 'hidden', background: '#D5E8CA' }}>
//                     <TableContainer sx={{ maxHeight: 440 }} className='formTable'>
//                         <Table stickyHeader aria-label="sticky table">
//                             <TableHead>
//                                 <TableRow>
//                                     {columns.map((column) => (
//                                         <TableCell
//                                             key={column.id}
//                                             align={column.align}
//                                             style={{ minWidth: column.minWidth }}
//                                         >
//                                             {column.label}
//                                         </TableCell>
//                                     ))}
//                                 </TableRow>
//                             </TableHead>
//                             <TableBody>
//                                 {fields.map((field, index) => (
//                                     <TableRow key={field.id}>
//                                         <TableCell>
//                                             <TextField
//                                                 size="small"
//                                                 {...register(`users.${index}.first_name`, { required: "first name is required" }
//                                                 )}
//                                                 variant="outlined"
//                                                 margin="normal"
//                                                 fullWidth
//                                                 defaultValue={initialData?.first_name ? initialData.first_name : ""}
//                                                 error={errors.users?.[index]?.first_name}
//                                                 helperText={errors.users?.[index]?.first_name?.message}
//                                             />

//                                         </TableCell>
//                                         <TableCell>
//                                             <TextField
//                                                 size="small"
//                                                 {...register(`users.${index}.last_name`, {
//                                                     required: 'Last name is required',
//                                                 })}
//                                                 variant="outlined"
//                                                 margin="normal"
//                                                 fullWidth
//                                                 defaultValue={initialData?.last_name ? initialData.last_name : ""}
//                                                 error={errors.users?.[index]?.last_name}
//                                                 helperText={errors.users?.[index]?.last_name?.message}

//                                             />
//                                         </TableCell>
//                                         <TableCell>
//                                             <TextField
//                                                 size="small"
//                                                 {...register(`users.${index}.email`, {
//                                                     required: 'Email is required',
//                                                 })}
//                                                 variant="outlined"
//                                                 margin="normal"
//                                                 fullWidth
//                                                 defaultValue={initialData?.email ? initialData.email : ""}
//                                                 error={errors.users?.[index]?.email}
//                                                 helperText={errors.users?.[index]?.email?.message}

//                                             />
//                                         </TableCell>
//                                         <TableCell>
//                                             <TextField
//                                                 size="small"
//                                                 {...register(`users.${index}.mobile`, {
//                                                     required: 'Mobile Number is required',
//                                                 })}
//                                                 variant="outlined"
//                                                 margin="normal"
//                                                 fullWidth
//                                                 defaultValue={initialData?.mobile ? initialData.mobile : ""}
//                                                 error={errors.users?.[index]?.mobile}
//                                                 helperText={errors.users?.[index]?.mobile?.message}
//                                             />
//                                         </TableCell>
//                                         {initialData ? "" : (
//                                             <TableCell>
//                                                 <TextField
//                                                     size="small"
//                                                     {...register(`users.${index}.password`, {
//                                                         required: 'Password is required',
//                                                     })}
//                                                     variant="outlined"
//                                                     margin="normal"
//                                                     fullWidth
//                                                     defaultValue={initialData?.password ? initialData.password : ""}
//                                                     error={errors.users?.[index]?.password}
//                                                     helperText={errors.users?.[index]?.password?.message}
//                                                 />
//                                             </TableCell>
//                                         )
//                                         }
//                                         <TableCell>
//                                             <TextField
//                                                 size="small"
//                                                 {...register(`users.${index}.address`, {
//                                                     required: 'Address is required',
//                                                 })}
//                                                 variant="outlined"
//                                                 margin="normal"
//                                                 fullWidth
//                                                 defaultValue={initialData?.address ? initialData.address : ""}
//                                                 error={errors.users?.[index]?.address}
//                                                 helperText={errors.users?.[index]?.address?.message}
//                                             />
//                                         </TableCell>
//                                         <TableCell>
//                                             <TextField
//                                                 size="small"
//                                                 {...register(`users.${index}.country`, {
//                                                     required: 'Country required',
//                                                 })}
//                                                 variant="outlined"
//                                                 margin="normal"
//                                                 fullWidth
//                                                 defaultValue={initialData?.country ? initialData.country : ""}
//                                                 error={errors.users?.[index]?.country}
//                                                 helperText={errors.users?.[index]?.country?.message}
//                                             />
//                                         </TableCell>
//                                         <TableCell>
//                                             <TextField
//                                                 size="small"
//                                                 {...register(`users.${index}.zip_code`, {
//                                                     required: 'Zipcode required',
//                                                 })}
//                                                 variant="outlined"
//                                                 margin="normal"
//                                                 fullWidth
//                                                 defaultValue={initialData?.zip_code ? initialData.zip_code : ""}
//                                                 error={errors.users?.[index]?.zip_code}
//                                                 helperText={errors.users?.[index]?.zip_code?.message}
//                                             />
//                                         </TableCell>
//                                         <TableCell>
//                                             <Stack direction={'row'} alignItems={'center'}>
//                                                 <Box>
//                                                     <img src={images[`users.${index}.image`] || field.image} alt="" className='addemployee-image' {...register(`users.${index}.image`, {
//                                                         required: "image is required",
//                                                     })} />
//                                                     {errors.users?.[index]?.image && (
//                                                         <FormHelperText sx={{ color: "#d32f2f" }}>
//                                                             {errors.uders?.[index]?.image?.message}
//                                                         </FormHelperText>
//                                                     )}
//                                                 </Box>
//                                                 <ReactFileReader
//                                                     fileTypes={[".png", ".jpeg"]}
//                                                     base64={true}
//                                                     handleFiles={(files) => handleFiles(index, files)}

//                                                 >
//                                                     <Button>add Image</Button>
//                                                 </ReactFileReader>
//                                             </Stack>
//                                         </TableCell>
//                                         {/* <TableCell className="addemployee-role">

//                                             <FormControl fullWidth >
//                                                 <InputLabel id="demo-simple-select-label" >Role</InputLabel>

//                                                 <Select

//                                                     labelId={`role-label-${index}`}
//                                                     id={`role-select-${index}`}
//                                                     {...register(`admins.${index}.role`, {
//                                                         required: 'Role required',
//                                                     })}

//                                                     label="Role"

//                                                     onChange={(e) => handleChange(e, index)}
//                                                     defaultValue={initialData?.role ? initialData.role : ""}
//                                                 >

//                                                     {adminsrole?.roles && adminsrole?.roles.map((data, key) => {

//                                                         return (

//                                                             <MenuItem key={key} value={data.id}>{data.name}</MenuItem>


//                                                         )
//                                                     })}


//                                                 </Select>

//                                             </FormControl>

//                                         </TableCell> */}

//                                         <TableCell>
//                                             {index !== 0 &&
//                                                 <Button variant="outlined" onClick={() => remove(index)}>
//                                                     Remove
//                                                 </Button>
//                                             }
//                                         </TableCell>
//                                     </TableRow>
//                                 ))}
//                             </TableBody>
//                         </Table>
//                     </TableContainer>
//                 </Paper>
//                 <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} gap={5} sx={{ p: 3 }}>
//                     {initialData ? "" : (


//                         <Button
//                             variant="outlined"
//                             color="primary"
//                             type='button'
//                             onClick={() => append({ first_name: '', last_name: '', email: '', mobile: '', password: '', address: '', country: '', zip_code: '', image: '' })}
//                         >
//                             Add More
//                         </Button>
//                     )}

//                     <Button type="submit" variant="contained" color="primary"  >
//                         Submit
//                     </Button>
//                 </Stack>
//             </form >
//         </Box >


//     );
// }
// export default AddEmployeeFormOne
