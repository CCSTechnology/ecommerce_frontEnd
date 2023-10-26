import React, { useEffect, useState } from "react";
import {
	Box,
	Checkbox,
	FormControl,
	FormControlLabel,
	Grid,
	InputLabel,
	List,
	ListItem,
	ListItemText,
	MenuItem,
	Select,
	TextField,
	TextareaAutosize,
	Typography,
	FormLabel,
	RadioGroup,
	Radio,
	Stack,
	Avatar,
	Button,
	IconButton,
} from "@mui/material";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import FormModal from "components/formModal";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { LoadingButton } from "@mui/lab";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { authEndPoints } from "helpers/endpoints";
import { errorAlert, successAlert } from "helpers/globalFunctions";
import { editFormData, formListGetById } from "redux/api/services/formService";
import FormGroup from "@mui/material/FormGroup";
import Loadercomponent from "components/loader";
import TopBreaccrumb from "components/TopBreadcrumb";
import { styled } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import { addFormData } from "redux/api/services/formService";

const blue = {
	100: "#DAECFF",
	200: "#b6daff",
	400: "#3399FF",
	500: "#007FFF",
	600: "#0072E5",
	900: "#003A75",
};

const grey = {
	50: "#f6f8fa",
	100: "#eaeef2",
	200: "#d0d7de",
	300: "#afb8c1",
	400: "#8c959f",
	500: "#6e7781",
	600: "#57606a",
	700: "#424a53",
	800: "#32383f",
	900: "#24292f",
};

const StyledTextarea = styled(TextareaAutosize)(
	({ theme }) => `
  width: -webkit-fill-available;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 12px;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  box-shadow: 0px 2px 2px ${theme.palette.mode === "dark" ? grey[900] : grey[50]};

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === "dark" ? blue[500] : blue[200]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);

const AddEditForm = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const role = localStorage.getItem("roleName");

	const location = useLocation();
	const pathName = location.pathname;
	const segments = pathName.split("/");
	const urlString = segments[segments.length - 1];

	const schema = yup.object().shape({});
	const loading = useSelector((state) => state.form.formListGetById.loading);
	const [radioOption, setRadioOption] = useState([]);
	const [checkboxOption, setCheckboxOption] = useState([]);
	const [dropdownOption, setDropdownOption] = useState([]);
	const [viewData, setViewData] = useState({});
	const {
		register,
		handleSubmit,
		control,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const ViewFormApi = async () => {
		const parameters = {
			url: `${authEndPoints.form.viewForm(id)}`,
		};
		try {
			const response = await dispatch(formListGetById(parameters)).unwrap();
			setViewData(response?.data);
		} catch (errors) {
			errorAlert(errors?.error);
		}
	};

	const { fields, append, remove } = useFieldArray({
		control,
		name: "dynamic_fields",
	});
	const [dragFields, setDragFields] = useState([]);
	const [fakeLoader, setFakeLoader] = useState(false);
	const [formFields, setFormFields] = useState([]);
	const [isModalOpen, setOpenModal] = useState(false);
	const [fieldType, setFieldType] = useState("");

	const __fieldHandler = (type) => {
		setFakeLoader(true);

		setTimeout(() => {
			const newForms = [
				...formFields,
				{
					id: 3,
					type: type,
				},
			];

			setFormFields(newForms);
			setFakeLoader(false);
		}, 2000);
	};

	//Create API
	const handleCreateApi = async (values) => {
		const parameters = {
			url: authEndPoints.form.newForm,
			data: values,
		};
		try {
			const response = await dispatch(addFormData(parameters)).unwrap();
			successAlert(response.message);
			navigate(`/${role}/forms`);
		} catch (error) {
			errorAlert(error.error);
		}
	};

	//Edit API
	const handleEditApi = async (values) => {
		const parameters = {
			url: authEndPoints.form.editForm(id),
			data: values,
		};
		try {
			const response = await dispatch(editFormData(parameters)).unwrap();
			successAlert(response.message);
			navigate(`/${role}/forms`);
		} catch (error) {
			errorAlert(error.error);
		}
	};

	//Remove filed in the fields
	const handleRemoveField = (index) => {
		remove(index);
		setDragFields((prevState) => {
			const updatedFields = [...prevState];
			updatedFields.splice(index, 1);
			return updatedFields;
		});
	};

	const handleViewdata = (data) => {
		data?.value?.map((field, index) => {
			if ((field?.type === "textbox" && field?.key === "text") || field?.key === "number" || field?.key === "file" || field?.key === "date") {
				let newKey = {
					fieldtype: field.key,
					textbox: field.name,
					checkbox: field.is_required,
				};
				setDragFields((state) => [...state, newKey]);
				append({ type: "input-type" });
			} else if (field?.type === "dropdown" && field?.key === "dropdown") {
				let newKey = {
					fieldtype: field.key,
					select: field.name,
					checkbox: field.is_required,
					menuitems: field.values,
				};
				setDragFields((state) => [...state, newKey]);
				append({ type: "dropdown" });
			} else if (field?.type === "radio-box" && field?.key === "textbox") {
				let newKey = {
					fieldtype: field.key,
					radiobox: field.name,
					requiredCheckbox: field.is_required,
					radiogroups: field.values,
				};
				setDragFields((state) => [...state, newKey]);
				append({ type: "radio-box" });
			} else if (field?.type === "check-box" && field?.key === "checkbox") {
				let newKey = {
					fieldtype: field.key,
					checkbox: field.name,
					requiredCheckbox: field.is_required,
					checkboxGroups: field.values,
				};
				setDragFields((state) => [...state, newKey]);
				append({ type: "check-box" });
			} else if (field?.type === "textarea") {
				let newKey = {
					fieldtype: field.type,
					textarea: field.name,
					requiredCheckbox: field.is_required,
				};
				setDragFields((state) => [...state, newKey]);
				append({ type: "text-area" });
			}
		});
	};

	const onSubmit = (value) => {
		const field_collection = value?.dynamic_fields?.map((field, index) => {
			if (field?.type === "input-type") {
				const { value, ...newArray } = field;
				return {
					...newArray,
					key: dragFields[index].fieldtype,
					name: dragFields[index].textbox,
					is_required: Boolean(dragFields[index].checkbox),
					type: "textbox",
				};
			} else if (field?.type === "date") {
				const { value, ...newArray } = field;
				return {
					...newArray,
					key: "date",
					name: dragFields[index].date,
					is_required: Boolean(dragFields[index].requiredCheckbox),
					type: "textbox",
				};
			} else if (field?.type === "text-area") {
				const { value, ...newArray } = field;
				return {
					...newArray,
					key: dragFields[index].fieldtype,
					name: dragFields[index].textarea,
					is_required: Boolean(dragFields[index].requiredCheckbox),
					type: "text-area",
				};
			} else if (field?.type === "dropdown") {
				const { value, ...newArray } = field;
				return {
					...newArray,
					type: "dropdown",
					key: "dropdown",
					name: dragFields[index].select,
					values: dragFields[index].menuitems,
					is_required: Boolean(dragFields[index].requiredCheckbox),
				};
			} else if (field?.type === "radio-box") {
				const { value, ...newArray } = field;
				return {
					...newArray,
					type: "radio-box",
					key: "textbox",
					name: dragFields[index].radiobox,
					values: dragFields[index].radiogroups,
					is_required: Boolean(dragFields[index].requiredCheckbox),
				};
			} else if (field?.type === "check-box") {
				const { value, ...newArray } = field;
				return {
					...newArray,
					type: "check-box",
					key: "checkbox",
					name: dragFields[index].checkbox,
					values: dragFields[index].checkboxGroups,
					is_required: Boolean(dragFields[index].requiredCheckbox),
				};
			} else {
				return { ...field }
			}
		});

		const data = {
			name: viewData.name,
			type: "default",
			value: field_collection,
		};
		if (urlString === "add") {
			handleCreateApi(data);
		} else {
			handleEditApi(data);
		}
	};

	const handleChange = (keyObject) => {
		setOpenModal(false);
		//Check the key id exists in the value object

		if ("textbox" in keyObject) {
			setDragFields((oldValue) => [...oldValue, keyObject]);
			append({
				type: "input-type",
				key: keyObject.fieldtype,
				name: keyObject.textbox,
				is_required: keyObject.checkbox,
			});
		} else if ("textarea" in keyObject) {
			setDragFields((oldValue) => [...oldValue, keyObject]);
			append({
				type: "text-area",
				key: keyObject.fieldtype,
				name: keyObject.textarea,
				is_required: keyObject.checkbox,
				min: keyObject.minrow,
				max: keyObject.maxrow,
			});
		} else if ("date" in keyObject) {
			setDragFields((oldValue) => [...oldValue, keyObject]);
			append({
				type: "date",
				key: "date",
				name: keyObject?.date,
				is_required: keyObject.requiredCheckbox,
			});
		} else if ("select" in keyObject) {
			const removeDeleteOption = [...dropdownOption];
			const updateOption = [...removeDeleteOption, "select", "requiredCheckbox"];

			const filteredObject = Object.keys(keyObject)
				.filter((key) => updateOption.includes(key))
				.reduce((obj, key) => {
					obj[key] = keyObject[key];
					return obj;
				}, {});

			const menuItems = Object.entries(filteredObject)
				.filter(([key]) => key.startsWith("menuitem"))
				?.map(([, value]) => value);
			keyObject["menuitems"] = menuItems;
			setDragFields((oldValue) => [...oldValue, keyObject]);
			append({
				type: "dropdown",
				key: "dropdown",
				name: keyObject?.select,
				values: keyObject?.menuitems,
				is_required: keyObject.requiredCheckbox,
			});
		} else if ("checkbox" in keyObject) {
			const removeDeleteOption = [...checkboxOption];
			const updateOption = [...removeDeleteOption, "checkbox", "requiredCheckbox"];

			const filteredObject = Object.keys(keyObject)
				.filter((key) => updateOption.includes(key))
				.reduce((obj, key) => {
					obj[key] = keyObject[key];
					return obj;
				}, {});

			const checkboxLabel = Object.entries(filteredObject)
				.filter(([key]) => key.startsWith("checkboxGroup"))
				?.map(([, value]) => value);

			keyObject["checkboxGroups"] = checkboxLabel;
			setDragFields((oldValue) => [...oldValue, keyObject]);
			append({
				type: "check-box",
				key: "checkbox",
				name: keyObject?.checkbox,
				values: checkboxLabel,
				is_required: keyObject.requiredCheckbox,
			});
		} else if ("fileupload" in keyObject) {
			setDragFields((oldValue) => [...oldValue, keyObject]);
			append({
				type: "file-upload",
				key: "file",
				name: keyObject.fileupload,
				is_required: Boolean(keyObject.requiredCheckbox),
			});
		} else {
			//delete option from radiobox model
			const removeDeleteOption = [...radioOption];
			const updateOption = [...removeDeleteOption, "radiobox", "requiredCheckbox"];

			//filter updateoption array to form keyObject
			const filteredObject = Object.keys(keyObject)
				.filter((key) => updateOption.includes(key))
				.reduce((obj, key) => {
					obj[key] = keyObject[key];
					return obj;
				}, {});

			//Make radiogroup as group
			const radioLabel = Object.entries(filteredObject)
				.filter(([key]) => key.startsWith("radiogroup"))
				?.map(([, value]) => value);
			keyObject["radiogroups"] = radioLabel;

			setDragFields((oldValue) => [...oldValue, keyObject]);
			append({
				type: "radio-box",
				key: "textbox",
				name: keyObject?.radiobox,
				values: radioLabel,
				is_required: keyObject.requiredCheckbox,
			});
		}
	};

	const handleFormChange = (name, value) => {
		setViewData((state) => {
			return {
				...state,
				[name]: value,
			};
		});
	};

	//Edit Api call useEffect
	useEffect(() => {
		if (id) {
			ViewFormApi();
		}
	}, [id]);

	//Edit Api call data set to state
	useEffect(() => {
		if (viewData) {
			if (!fields.length) {
				handleViewdata(viewData);
			}
		}
	}, [viewData]);

	return (
		<Box className="indexBox">
			<TopBreaccrumb title={urlString === "add" ? "Add Form" : "Edit Form"} to={`/${role}/forms`} />
			{loading ? (
				<Loadercomponent isFetching={loading} />
			) : (
				<>
					<Grid container>
						<Grid item xs={12} sm={3} md={3} sx={{ background: "#5FBC6136", p: 3 }}>
							<Typography variant="h6">Fields</Typography>
							<List dense={true} className="formLeftList">
								<ListItem
									onClick={() => {
										__fieldHandler("input_text");
										setFieldType("Text Box");
										setOpenModal(true);
									}}
									className="cursor-pointer"
								>
									<ListItemText primary="Text Box" />
								</ListItem>

								<ListItem
									onClick={() => {
										__fieldHandler("input_textarea");
										setFieldType("Description");
										setOpenModal(true);
									}}
									className="cursor-pointer"
								>
									<ListItemText primary="Description" />
								</ListItem>
								<ListItem
									onClick={() => {
										__fieldHandler("input_upload");
										setFieldType("File Upload");
										setOpenModal(true);
									}}
									className="cursor-pointer"
								>
									<ListItemText primary="File Upload" />
								</ListItem>
								<ListItem
									onClick={() => {
										__fieldHandler("input_select");
										setFieldType("Dropdown");
										setOpenModal(true);
									}}
									className="cursor-pointer"
								>
									<ListItemText primary="Dropdown" />
								</ListItem>

								<ListItem
									onClick={() => {
										setFieldType("Date");
										setOpenModal(true);
									}}
									className="cursor-pointer"
								>
									<ListItemText primary="Date" />
								</ListItem>
								<ListItem
									onClick={() => {
										__fieldHandler("input_number");
										setFieldType("Check Box");
										setOpenModal(true);
									}}
									className="cursor-pointer"
								>
									<ListItemText primary="Checkbox" />
								</ListItem>
								<ListItem
									onClick={() => {
										__fieldHandler("input_number");
										setFieldType("Radio Box");
										setOpenModal(true);
									}}
									className="cursor-pointer"
								>
									<ListItemText primary="RadioBox" />
								</ListItem>
							</List>
						</Grid>
						<Grid item xs={12} sm={9} md={9} sx={{ background: "#E9ECEF87", p: 3 }}>
							<Box>
								<form onSubmit={handleSubmit(onSubmit)}>
									<Box className="form-field">
										<Grid
											container
											sx={{
												direction: "row",
												justifyContent: "flex-start",
												alignItems: "flex-start",
												paddingTop: "30px",
												width: "70%",
												margin: "0 auto",
											}}
										>
											<Controller
												name={"name"}
												control={control}
												render={({ fieldState: { error } }) => (
													<TextField
														helperText={error ? error.message : null}
														size="small"
														error={!!error}
														value={viewData?.name}
														onChange={(e) => handleFormChange("name", e.target.value)}
														fullWidth
														label={"Enter Form Name"}
														variant="filled"
													/>
												)}
											/>
											<Box sx={{ bgcolor: "white", width: "100%", px: 3, pb: 4, mt: 2 }}>
												{fields?.map((field, index) =>
													field?.type === "input-type" ? (
														<Grid container sx={{ my: 1 }} alignItems={"end"} className="formDisableField">
															<Grid items xs={11} sx={{ paddingTop: "10px" }}>
																<Typography
																	sx={{
																		fontSize: "12px",
																		color: "rgba(0, 0, 0, 0.38)",
																	}}
																>
																	{dragFields[index]?.textbox}
																</Typography>
																<TextField
																	{...register(`dynamic_fields[${index}].key`)}
																	id="standard-helperText"
																	type={dragFields[index]?.fieldtype}
																	fullWidth
																	variant="standard"
																	disabled
																/>
															</Grid>
															<Grid items xs={1} sx={{ textAlign: "center" }}>
																<IconButton onClick={() => handleRemoveField(index)}>
																	<DeleteIcon />
																</IconButton>
															</Grid>
														</Grid>
													) : field?.type === "text-area" ? (
														<Grid container sx={{ my: 1 }} alignItems={"end"} className="formDisableField">
															<Grid
																items
																xs={11}
																sx={{
																	paddingTop: "10px",
																}}
															>
																<Typography
																	sx={{
																		fontSize: "12px",
																		color: "rgba(0, 0, 0, 0.38)",
																	}}
																>
																	{dragFields[index]?.textarea}
																</Typography>
																<StyledTextarea
																	{...register(`dynamic_fields[${index}].value`)}
																	maxRows={4}
																	aria-label="maximum height"
																/>
															</Grid>
															<Grid items xs={1} sx={{ textAlign: "center" }}>
																<IconButton onClick={() => handleRemoveField(index)}>
																	<DeleteIcon />
																</IconButton>
															</Grid>
														</Grid>
													) : field?.type === "file-upload" ? (
														<Grid container sx={{ my: 1 }} alignItems={"end"}>
															<Grid
																items
																xs={11}
																sx={{
																	paddingTop: "10px",
																}}
															>
																<Typography
																	sx={{
																		fontSize: "12px",
																		color: "rgba(0, 0, 0, 0.38)",
																		mb: 1,
																	}}
																>
																	{dragFields[index]?.fileupload}
																</Typography>
																<Stack direction={"row"} gap={2}>
																	<Avatar src="" />
																	<Button disabled>Upload</Button>
																</Stack>
																<TextField
																	{...register(`dynamic_fields[${index}].value`)}
																	id="standard-helperText"
																	type="file"
																	label={dragFields[index]?.fileupload}
																	InputLabelProps={{
																		shrink: true,
																	}}
																	fullWidth
																	sx={{ display: "none" }}
																/>
															</Grid>
															<Grid items xs={1} sx={{ textAlign: "center" }}>
																<IconButton onClick={() => handleRemoveField(index)}>
																	<DeleteIcon />
																</IconButton>
															</Grid>
														</Grid>
													) : field?.type === "dropdown" ? (
														<Grid container sx={{ my: 1 }} alignItems={"end"} className="formDisableSelectField">
															<Grid
																items
																xs={11}
																sx={{
																	paddingTop: "10px",
																}}
															>
																<FormControl
																	fullWidth
																	style={{
																		width: "100%",
																	}}
																>
																	<Typography
																		sx={{
																			mb: 0.5,
																			fontSize: "12px",
																			color: "rgba(0, 0, 0, 0.38)",
																		}}
																	>
																		{dragFields[index]?.select}
																	</Typography>
																	<Select
																		{...register(`dynamic_fields[${index}].value`)}
																		label="dknfkdnfkdn"
																		InputLabelProps={{
																			shrink: true,
																		}}
																		defaultValue={field?.value || ""}
																		disabled
																		variant="standard"
																	>
																		{!dragFields[index]?.menukey
																			? dragFields[index]?.menuitems?.map((option) => (
																				<MenuItem value={option} key={option}>
																					{option}
																				</MenuItem>
																			))
																			: null}
																	</Select>
																</FormControl>
															</Grid>
															<Grid items xs={1} sx={{ textAlign: "center" }}>
																<IconButton onClick={() => handleRemoveField(index)}>
																	<DeleteIcon />
																</IconButton>
															</Grid>
														</Grid>
													) : field?.type === "date" ? (
														<Grid container sx={{ my: 1 }} alignItems={"end"} className="formDisableField">
															<Grid
																items
																xs={11}
																sx={{
																	paddingTop: "10px",
																}}
															>
																<TextField
																	{...register(`dynamic_fields[${index}].value`)}
																	required={dragFields[index]?.checkbox ? true : false}
																	id="standard-helperText"
																	type="date"
																	label={dragFields[index]?.date}
																	defaultValue={dayjs().format("YYYY-MM-DD")}
																	InputLabelProps={{
																		shrink: true,
																	}}
																	fullWidth
																	disabled
																	variant="standard"
																/>
															</Grid>
															<Grid items xs={1} sx={{ textAlign: "center" }}>
																<IconButton onClick={() => handleRemoveField(index)}>
																	<DeleteIcon />
																</IconButton>
															</Grid>
														</Grid>
													) : field?.type === "check-box" ? (
														<Grid container sx={{ my: 1 }} alignItems={"center"}>
															<Grid
																items
																xs={11}
																sx={{
																	paddingTop: "10px",
																}}
															>
																<FormLabel component="legend">{dragFields[index]?.checkbox}</FormLabel>
																<FormGroup>
																	{dragFields[index]?.checkboxGroups?.map((value, each) => (
																		<FormControlLabel
																			key={each}
																			control={
																				<Checkbox
																					defaultValue={false}
																					control={control}
																					name={`dynamic_fields[${index}].checked[${each}]`}
																					{...register(`dynamic_fields[${index}].checked[${each}]`)}
																				/>
																			}
																			label={value}
																		/>
																	))}
																</FormGroup>
															</Grid>
															<Grid items xs={1} sx={{ textAlign: "center" }}>
																<IconButton onClick={() => handleRemoveField(index)}>
																	<DeleteIcon />
																</IconButton>
															</Grid>
														</Grid>
													) : field?.type === "radio-box" ? (
														<Grid container sx={{ my: 1 }} alignItems={"center"}>
															<Grid
																items
																xs={11}
																sx={{
																	paddingTop: "10px",
																}}
															>
																<FormControl component="fieldset">
																	<FormLabel component="legend">{dragFields[index]?.radiobox}</FormLabel>
																	<Controller
																		rules={{
																			required: true,
																		}}
																		control={control}
																		name={dragFields[index]?.radiobox}
																		render={({ field }) => (
																			<RadioGroup {...field}>
																				{dragFields[index]?.radiogroups?.map((option) => (
																					<>
																						<FormControlLabel
																							value={option}
																							control={<Radio />}
																							label={option}
																						/>
																					</>
																				))}
																			</RadioGroup>
																		)}
																	/>
																</FormControl>
															</Grid>
															<Grid items xs={1} sx={{ textAlign: "center" }}>
																<IconButton onClick={() => handleRemoveField(index)}>
																	<DeleteIcon />
																</IconButton>
															</Grid>
														</Grid>
													) : null
												)}
											</Box>
										</Grid>
									</Box>

									<Box className="text-center-cls" sx={{ my: 1, paddingTop: "10px" }}>
										<LoadingButton
											loadingPosition="center"
											loading={isSubmitting}
											variant="contained"
											type="submit"
											className="submitBtn"
										>
											{urlString === "add" ? "Create" : "Update"}
										</LoadingButton>
									</Box>
								</form>
							</Box>
						</Grid>
					</Grid>
					{isModalOpen ? (
						<FormModal
							open={isModalOpen}
							setOpenModal={setOpenModal}
							handleChange={handleChange}
							title={fieldType}
							setRadioOption={setRadioOption}
							setCheckboxOption={setCheckboxOption}
							setDropdownOption={setDropdownOption}
						/>
					) : null}
				</>
			)}
		</Box>
	);
};

export default AddEditForm;
