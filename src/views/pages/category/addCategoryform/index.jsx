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
import { AddressFormater, errorAlert, successAlert } from "helpers/globalFunctions";
import { useDispatch, useSelector } from "react-redux";
import { addDirectoryData, viewDirectoryData } from "redux/api/services/directoryService";
import ReactFileReader from "react-file-reader";
import AddIcon from "@mui/icons-material/Add";
import { LoadingButton } from "@mui/lab";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import AdressField from "components/formField/AdressFiels";
import DeleteIcon from '@mui/icons-material/Delete';
import TextFormField from "components/reusableFormFields/TextField";
import { directoryForm } from "helpers/validate";
import AddressField from "components/reusableFormFields/AddressField/addressField";
import SelectField from "components/reusableFormFields/selectField";
import PasswordField from "components/reusableFormFields/TextField/passwordField";
import ImageUploadComponent from "components/reusableFormFields/ImageUpload";
import AutocompleteField from "components/reusableFormFields/Autocomplete";
import MobileField from "components/reusableFormFields/TextField/mobileField";
import FormLoader from "components/formLoader";


const AddCategoryForm = (props, disabled) => {

	const { onClick, initialData = null, type } = props;
	const [showPassword, setShowPassword] = useState(false);
	const [adminsrole, setadminsRole] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [images, setImages] = useState("");
	const dispatch = useDispatch();
	const initialvalue = useSelector((state) => state?.directory?.viewDirectory?.data?.data)
	const formLoading = useSelector((state) => state?.directory?.viewDirectory?.loading)
	const [essential, setEssential] = useState({
		roles: [],
	});

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
		defaultValues: type === 'add' ? {

		} : initialvalue,
		resolver: yupResolver(directoryForm),
		mode: "onChange"
	});

	console.log(errors);

	const handleChange = (e) => {
		// const value = e.target.value;
		// console.log(value);
		// setValue(`role`, value.toString());
	};


	const handleFiles = (event) => {
		console.log(event.target.files[0]);
		const temp = event.target.files;
		console.log(temp);
		if (temp.length > 0) {
			const file = temp[0];
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => {
				const base64String = reader.result;
				setImages(base64String);
				setValue(`image`, file);
			};
		}
	};

	const viewDirectory = async () => {
		const parameters = {
			url: `${authEndPoints.directory.viewDirectory(initialData?.id)}`,
		};
		try {
			await dispatch(viewDirectoryData(parameters)).unwrap();
		} catch (errors) {
			errorAlert(errors?.error);
		}
	};


	// Add Directory Api
	const handleAddDirectory = async () => {

		const values = getValues();
		const formatedAddress = AddressFormater(values.address)
		const {
			image,
			...others
		} = values;

		console.log(values)

		const data = {
			...values,
			...formatedAddress
		}
		const dataEdit = {
			...others,
			...formatedAddress
		}

		const parameters = {
			url: initialData ? `${authEndPoints.directory.editDirectory(initialData.id)}` : authEndPoints.directory.newDirectory,
			data: initialData ? dataEdit : data,
		};
		try {
			const response = await dispatch(addDirectoryData(parameters)).unwrap();
			onClick();
			successAlert(response.message);
		} catch (error) {
			errorAlert(error.error);
			console.log(errors);
		}
	};

	//Essential Api
	const essentialListApi = async () => {
		const parameters = {
			url: `${authEndPoints.essential.essentialSelect}`,
			include: "roles",
		};
		try {
			const response = await dispatch(essentialList(parameters)).unwrap();
			setEssential(response.data);
		} catch (errors) {
			errorAlert(errors?.error);
		}
	};

	// visibility
	const handleTogglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	// delete image
	const handleDeleteImage = () => {
		setValue('image', null);
		setImages(null)
	};

	useEffect(() => {
		essentialListApi();
	}, []);

	useEffect(() => {
		if (initialData) {
			const Img = initialData.image ? initialData.image : "";
			setImages(Img);
		}
	}, []);

	useEffect(() => {
		setValue('address', initialData?.address ? initialData.address : "");
	}, [initialData, setValue]);

	useEffect(() => {
		if (type === "edit") {
			viewDirectory()
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
			{formLoading ? (<FormLoader />)
				: (
					<form onSubmit={handleSubmit(handleAddDirectory)}>
						<Grid container spacing={5} sx={{ mb: 2 }}>
							<Grid item xs={6} direction={"column"}>
								<TextFormField
									name="first_name"
									control={control}
									Controller={Controller}
									label="First Name"
									error={errors?.first_name?.message}
								/>
							</Grid>
							<Grid item xs={6} direction={"column"}>
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
								/>
							</Grid>
						</Grid>
						<Grid container spacing={5} sx={{ mb: 2 }}>
							<Grid mt={5} pl={5} xs={6}>
								<TextFormField
									name="zip_code"
									control={control}
									Controller={Controller}
									label="Postal Code"
									error={errors?.zip_code?.message}
								/>

							</Grid>
							<Grid item xs={6}>
								{essential.roles && (
									<SelectField
										name="role"
										control={control}
										label="Roles"
										Controller={Controller}
										data={essential.roles}
										error={errors?.role?.message}
										disabled={type === "edit" && true}
									/>)}

							</Grid>
						</Grid>

						<Grid container spacing={5} sx={{ mb: 2 }}>
							<Grid item xs={6}>

								<ImageUploadComponent
									control={control}
									Controller={Controller}
									name="image"
									label="Profile Image"
									watch={watch}
									setValue={setValue}
									error={errors?.image?.message}
								/>
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
									/>)}
							</Grid>
						</Grid>
						<Stack direction={"row"} alignItems={"center"} justifyContent={"center"} gap={5} sx={{ p: 3 }}>
							<LoadingButton loadingPosition="center" loading={isSubmitting} variant="contained" type="submit" className="submitBtnn">
								Submit
							</LoadingButton>
						</Stack>
					</form >
				)}
		</Box >
	);
};

export default AddCategoryForm;
