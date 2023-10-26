import React, { useEffect, useState } from "react";
import { Box, Divider, Typography, TextField, Checkbox, Switch, Stack, Paper, Button, ListItemText, Radio, RadioGroup } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import FormControlLabel from "@mui/material/FormControlLabel";
import styled from "@emotion/styled";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Autocomplete from "react-google-autocomplete";
import { essentialList } from "redux/api/services/essentialService";
import { useDispatch } from "react-redux";
import { authEndPoints } from "helpers/endpoints";
import { errorAlert, successAlert } from "helpers/globalFunctions";
import { formListGetById } from "redux/api/services/formService";
import ReactFileReader from "react-file-reader";
import { addJobData } from "redux/api/services/jobService";
import MuiDatePicker from "components/formField/MuiDatePicker";
import { toast } from "react-toastify";
import RowRadioButtonsGroup from "components/formField/MuiRadioGroup";
import AdressField from "components/formField/AdressFiels";
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import { Watch } from "@mui/icons-material";
import { AddressFormater } from "components/addressFormatter/addressFormatter";

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "All"];

const schema = yup.object().shape({
	address: yup.mixed().required().strict(),
})

function DrawerFormTaskList(props) {

	const { initialData = null } = props;
	const dispatch = useDispatch();

	const [selectedValue, setSelectedValue] = useState("recurring");
	const [weekDays, setWeekDays] = useState([]);
	const currentDate = new Date();
	const day = currentDate.getDate();
	const month = currentDate.toLocaleString("en-US", { month: "long" });
	const year = currentDate.getFullYear();
	const [selectedPlace, setSelectedPlace] = useState("");
	const [selectEmployee, setSelectEmployee] = useState(null);
	const [selectForm, setSelectForm] = useState(null);
	const [selectAdmins, setSelectAdmins] = useState(null);
	const [selectSupervisors, setSelectSupervisors] = useState(null);
	const [formData, setFormData] = useState([]);
	const [formFields, setFormFields] = useState([]);
	const [images, setImages] = useState({});
	const [showBorder, setShowBorder] = useState(false);

	const paperStyle = {
		backgroundColor: "#049457",
		padding: "5px",
	};

	const { register, handleSubmit, setValue, control, reset, getValues, watch, formState: { errors, isSubmitting } } = useForm({

		resolver: yupResolver(schema),
		mode: 'onBlur'

		// defaultValues: {
		// 	name: "",
		// 	type: "",
		// 	start_date: "",
		// 	end_date: "",
		// 	date: "",
		// 	shift_title: "",
		// 	is_day: [],
		// 	start_time: "",
		// 	end_time: "",
		// 	assign_to: "",
		// 	supervisor_id: "",
		// 	admin_id: "",
		// 	form_id: "",
		// 	location: "",
		// },

	});

	const onSubmit = async (data) => {
		// const data = getValues()
		console.log(data, "ff");
		// try {
		// 	const response = await dispatch(
		// 		addJobData({
		// 			url: authEndPoints.job.addJob,
		// 			data,
		// 		})
		// 	).unwrap();
		// 	toast.success(response.message);
		// } catch (error) {
		// 	errorAlert(error?.error ?? error?.message);
		// }
	};

	const handleSelectChange = (e) => {
		setSelectedValue(e.target.value);
	};

	const handleDayChange = (event) => {
		const {
			target: { value },
		} = event;
		setWeekDays(
			// On autofill we get a stringified value.
			typeof value === "string" ? value.split(",") : value
		);
		setValue("is_day", value);
	};

	const employeeListApi = async () => {
		const parameters = {
			url: `${authEndPoints.essential.essentialSelect}`,
			include: "users",
		};
		try {
			const response = await dispatch(essentialList(parameters)).unwrap();
			console.log(response.data);
			setSelectEmployee(response.data);
		} catch (errors) {
			errorAlert(errors?.error);
		}
	};

	const formsListApi = async () => {
		const parameters = {
			url: `${authEndPoints.essential.essentialSelect}`,
			include: "forms",
		};
		try {
			const response = await dispatch(essentialList(parameters)).unwrap();
			console.log(response.data);
			setSelectForm(response.data);
		} catch (errors) {
			errorAlert(errors?.error);
		}
	};

	const adminsListApi = async () => {
		const parameters = {
			url: `${authEndPoints.essential.essentialSelect}`,
			include: "admins",
		};
		try {
			const response = await dispatch(essentialList(parameters)).unwrap();
			console.log(response.data);
			setSelectAdmins(response.data);
		} catch (errors) {
			errorAlert(errors?.error);
		}
	};

	const supervisorsListApi = async () => {
		const parameters = {
			url: `${authEndPoints.essential.essentialSelect}`,
			include: "supervisors",
		};
		try {
			const response = await dispatch(essentialList(parameters)).unwrap();
			console.log(response.data);
			setSelectSupervisors(response.data);
		} catch (errors) {
			errorAlert(errors?.error);
		}
	};

	const formbyId = async (value) => {
		const id = value;
		const parameters = {
			url: `${authEndPoints.form.formById(id)}`,
		};
		try {
			const response = await dispatch(formListGetById(parameters)).unwrap();
			// setDirectoryData(response.data)
			console.log("Response", response.data.value);
			setFormData(response.data.value);
		} catch (errors) {
			errorAlert(errors?.error);
		}
	};

	useEffect(() => {
		employeeListApi();
		formsListApi();
		adminsListApi();
		supervisorsListApi();
	}, []);

	useEffect(() => {
		setShowBorder(false);
	}, []);

	const formHandleChange = (e) => {
		const { value } = e.target;
		formbyId(value);
	};

	const handleFieldChange = (event, id) => {
		const { name, value, type, checked } = event.target;
		const fieldValue = type === "checkbox" ? checked : value;
		setFormFields((prevFields) => {
			const updatedFields = prevFields.map((field) => {
				if (field.id === id) {
					return { ...field, value: fieldValue };
				}
				return field;
			});
			return updatedFields;
		});
	};

	const handleFiles = (index, files) => {
		if (files && files.fileList.length > 0) {
			const file = files.fileList[0];
			console.log(file, "yyy");
			const reader = new FileReader();
			reader.onloadend = () => {
				const base64String = reader.result;
				setImages((state) => {
					return {
						...state,
						[`image`]: base64String,
					};
				});
				setValue(`image`, file);
			};
			console.log(reader.readAsDataURL(file));
			reader.readAsDataURL(file);
		}
	};

	const dynamicFields = formData.map((field) => {
		console.log(field);
		if (field.key === "text") {
			return (
				<Box key={field.id}>
					<Stack
						spacing={{ xs: 5.2, sm: 5.2 }}
						direction="row"
						useFlexGap
						flexWrap="wrap"
						alignItems="center"
						sx={{
							"& .MuiTextField-root": {
								width: { xs: "23ch", sm: "23ch", md: "23ch" },
							},
							mt: 2,
						}}
					>
						<Typography sx={{ fontWeight: 500, fontSize: "14px", pl: 2 }}>{field.name}</Typography>
						<TextField
							variant="outlined"
							size="small"
							className="custom-textfield"
							type={field.key}
							name={field.name}
							required={field.is_required === "true"}
						/>
					</Stack>
				</Box>
			);
		} else if (field.key === "number") {
			return (
				<Box key={field.id}>
					<Stack
						spacing={{ xs: 5.2, sm: 5.2 }}
						direction="row"
						useFlexGap
						flexWrap="wrap"
						alignItems="center"
						sx={{
							"& .MuiTextField-root": {
								width: { xs: "23ch", sm: "23ch", md: "23ch" },
							},
							mt: 2,
						}}
					>
						<Typography sx={{ fontWeight: 500, fontSize: "14px", pl: 2 }}>{field.name}</Typography>
						<TextField
							variant="outlined"
							size="small"
							className="custom-textfield"
							type={field.key}
							name={field.name}
							onChange={(event) => event.target.value}
						/>
					</Stack>
				</Box>
			);
		} else if (field.key === "textarea") {
			return (
				<Box key={field.id}>
					<Stack
						spacing={{ xs: 3.3, sm: 3.3 }}
						direction="row"
						useFlexGap
						flexWrap="wrap"
						alignItems="center"
						sx={{
							"& .MuiTextField-root": {
								width: { xs: "23ch", sm: "23ch", md: "23ch" },
							},
							mt: 2,
						}}
					>
						<Typography sx={{ fontWeight: 500, fontSize: "14px", pl: 2 }}>{field.name}</Typography>
						<TextField
							multiline
							rows={2}
							maxRows={4}
							variant="outlined"
							size="small"
							type={field.key}
							name={field.name}
							required={field.is_required === "true"}
						/>
					</Stack>
				</Box>
			);
		} else if (field.key === "file") {
			return (
				<Box key={field.id}>
					<Stack
						spacing={{ xs: 5, sm: 5 }}
						direction="row"
						useFlexGap
						flexWrap="wrap"
						alignItems="center"
						sx={{
							"& .MuiButton-root": {
								width: { xs: "22.2ch", sm: "22.2ch", md: "22.2ch" },
							},
							mt: 2,
						}}
					>
						<Typography sx={{ fontWeight: 500, fontSize: "14px", pl: 2 }}>{field.name}</Typography>
						<ReactFileReader fileTypes={[".png", ".jpeg"]} base64={true} handleFiles={(files) => handleFiles(files)}>
							<Button sx={{ backgroundColor: "white" }}>add Image</Button>
						</ReactFileReader>
					</Stack>
				</Box>
			);
		} else if (field.key === "dropdown") {
			return (
				<Box key={field.id}>
					<Stack
						spacing={{ xs: 7.9, sm: 7.9 }}
						direction="row"
						useFlexGap
						flexWrap="wrap"
						alignItems="center"
						sx={{
							"& .MuiFormControl-root": {
								width: { xs: "23ch", sm: "23ch", md: "23ch" },
							},
							mt: 2,
						}}
					>
						<Typography sx={{ fontWeight: 500, fontSize: "14px", pl: 2 }}>{field.name}</Typography>
						<FormControl fullWidth size="small" className="custom-textfield">
							<Select name={field.name} onChange={(event) => event.target.value}>
								{field.values.map((value, index) => (
									<MenuItem key={index} value={value}>
										{value}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Stack>
				</Box>
			);
		} else if (field.key === "date") {
			return (
				<Box key={field.id}>
					<Stack
						spacing={{ xs: 3, sm: 3 }}
						direction="row"
						useFlexGap
						flexWrap="wrap"
						alignItems="center"
						sx={{
							"& .MuiTextField-root": {
								width: { xs: "23ch", sm: "23ch", md: "23ch" },
							},
							mt: 2,
						}}
					>
						<Typography sx={{ fontWeight: 500, fontSize: "14px", pl: 2 }}>{field.name}</Typography>
						<TextField
							variant="outlined"
							size="small"
							className="custom-textfield"
							type={field.key}
							name={field.name}
							// InputLabelProps={{
							//   shrink: true,
							// }}
							onChange={(event) => event.target.value}
						/>
					</Stack>
				</Box>
			);
		} else if (field.key === "checkbox") {
			return (
				<Box key={field.id}>
					<Stack
						spacing={{ xs: 1, sm: 1 }}
						direction="row"
						useFlexGap
						flexWrap="wrap"
						alignItems="center"
						sx={{
							mt: 1,
						}}
					>
						<Typography sx={{ fontWeight: 500, fontSize: "14px", pl: 2, pr: 5.3 }}>{field.name}</Typography>
						{field.values.map((value, index) => (
							<FormControlLabel
								key={index}
								label={value}
								control={<Checkbox name={value} value={value} onChange={(event) => handleFieldChange(event, index)} />}
							/>
						))}
					</Stack>
				</Box>
			);
		} else if (field.type === "radio-box") {
			return (
				<Box key={field.id}>
					<Stack spacing={{ xs: 3.5, sm: 3.5 }} direction="row" useFlexGap flexWrap="wrap" alignItems="center">
						<Typography sx={{ fontWeight: 500, fontSize: "14px", pl: 2 }}>{field.name}</Typography>
						<FormControl key={field.id}>
							<RadioGroup row name={field.key} value={field.value || ""} onChange={(event) => handleFieldChange(event, field.id)}>
								{field.values.map((value, index) => (
									<FormControlLabel key={index} value={value} control={<Radio />} label={value} />
								))}
							</RadioGroup>
						</FormControl>
					</Stack>
				</Box>
			);
		}
		return null;
	});

	const handleChange = (e) => {
		// const value = e.target.value;
		// console.log(value);
		// setValue(`role`, value.toString());
	};

	return (
		<Box>
			<Box>
				<Typography sx={{ fontWeight: 500, fontSize: "14px", textAlign: "center", py: 3 }}>
					{day} {month} {year}
				</Typography>
				<Typography sx={{ fontWeight: 500, fontSize: "14px", pb: 1, pl: 2 }}>Shift Details</Typography>
				<Divider sx={{ borderWidth: 1, borderColor: "black" }} />
				<Box
					component={"form"}
					onChange={() => {
						console.log(getValues());
					}}
					onSubmit={handleSubmit(onSubmit)}
					sx={{
						display: "flex",
						flexDirection: "column",
					}}
				>
					<Stack
						spacing={{ xs: 1, sm: 1 }}
						sx={{
							display: "flex",
							flexDirection: "column",
							paddingInline: "1rem",
							"& .MuiFormControl-root": {
								width: "100%",
							},
							mt: 2,
						}}
					>
						<Typography sx={{ fontWeight: 500, fontSize: "14px" }}>Job Type</Typography>
						<FormControl fullWidth size="small" textAlign="center" className="custom-textfield">
							<Select
								fullWidth
								displayEmpty
								inputProps={{ "aria-label": "Without label" }}
								// defaultValue={"recurring"}
								id="type"
								{...register("type")}
								value={selectedValue}
								onChange={handleSelectChange}
							>
								<MenuItem disabled value={0}>
									Select Job Type
								</MenuItem>
								<MenuItem value="recurring">Recurring</MenuItem>
								<MenuItem value="quick">Quick Job</MenuItem>
							</Select>
						</FormControl>
					</Stack>
					{selectedValue === "recurring" ? (
						<Box>
							<Stack
								spacing={{ xs: 2, sm: 2 }}
								sx={{
									display: "flex",
									flexDirection: "column",
									paddingInline: "1rem",
									"& .MuiFormControl-root": {
										width: "100%",
									},
									mt: 2,
								}}
							>
								<Stack
									spacing={{ xs: 1, sm: 1 }}
									direction="column"
									useFlexGap
									flexWrap="wrap"
									sx={{
										display: "flex",
										flexDirection: "column",
										"& .MuiFormControl-root": {
											width: "100%",
										},
									}}
								>
									<Typography sx={{ fontWeight: 500, fontSize: "14px" }}>Date</Typography>
									<MuiDatePicker type="DatePicker" />
									{/* <TextField
										type="date"
										variant="outlined"
										size="small"
										className="custom-textfield"
										id="start_date"
										{...register("start_date")}
									/> */}
								</Stack>
								{/* <Stack
									spacing={{ xs: 1, sm: 1 }}
									direction="column"
									useFlexGap
									flexWrap="wrap"
									sx={{
										"& .MuiTextField-root": {
											width: "100%",
										},
										mt: 2,
									}}
								>
									<Typography sx={{ fontWeight: 500, fontSize: "14px" }}>Till</Typography>
									<TextField
										type="date"
										variant="outlined"
										size="small"
										className="custom-textfield"
										id="end_date"
										{...register("end_date")}
									/>
								</Stack> */}
								<Stack
									spacing={{ xs: 1, sm: 1 }}
									direction="column"
									useFlexGap
									flexWrap="wrap"
									sx={{
										"& .MuiTextField-root": {
											width: "100%",
										},
										mt: 2,
									}}
								>
									<Typography sx={{ fontWeight: 500, fontSize: "14px" }}>Day</Typography>
									<FormControl sx={{}} className="custom-textfield">
										<Select
											fullWidth
											displayEmpty
											inputProps={{ "aria-label": "Without label" }}
											multiple
											defaultValue={weekDays}
											onChange={handleDayChange}
											renderValue={(selected) => selected.join(", ")}
										>
											{days.map((day) => (
												<MenuItem key={day} value={day}>
													<Checkbox checked={weekDays.indexOf(day) > -1} />
													<ListItemText primary={day} />
												</MenuItem>
											))}
										</Select>
									</FormControl>
								</Stack>
							</Stack>
						</Box>
					) : (
						<Stack
							spacing={{ xs: 1, sm: 1 }}
							sx={{
								display: "flex",
								flexDirection: "column",
								paddingInline: "1rem",
								"& .MuiFormControl-root": {
									width: "100%",
								},
								mt: 2,
							}}
						>
							<Typography sx={{ fontWeight: 500, fontSize: "14px" }}>Date</Typography>
							<MuiDatePicker type="DatePicker" />
							{/* <TextField
								fullWidth
								type="date"
								variant="outlined"
								size="small"
								className="custom-textfield"
								id="date"
								{...register("date")}
							/> */}
						</Stack>
					)}
					<Stack
						spacing={{ xs: 1, sm: 1 }}
						sx={{
							display: "flex",
							flexDirection: "column",
							paddingInline: "1rem",
							"& .MuiFormControl-root": {
								width: "100%",
							},
							mt: 2,
						}}
					>
						{/* <Typography sx={{ fontWeight: 500, fontSize: "14px" }}>Radio</Typography> */}
						<RowRadioButtonsGroup />
						{/* <TextField
							type="time"
							variant="outlined"
							size="small"
							className="custom-textfield"
							id="start_time"
							{...register("start_time")}
						/> */}
					</Stack>
					<Stack
						spacing={{ xs: 1, sm: 1 }}
						sx={{
							display: "flex",
							flexDirection: "column",
							paddingInline: "1rem",
							"& .MuiFormControl-root": {
								width: "100%",
							},
							mt: 2,
						}}
					>
						<Typography sx={{ fontWeight: 500, fontSize: "14px" }}>Start</Typography>
						<MuiDatePicker type="TimePicker" />
						{/* <TextField
							type="time"
							variant="outlined"
							size="small"
							className="custom-textfield"
							id="start_time"
							{...register("start_time")}
						/> */}
					</Stack>
					<Stack
						spacing={{ xs: 1, sm: 1 }}
						sx={{
							display: "flex",
							flexDirection: "column",
							paddingInline: "1rem",
							"& .MuiFormControl-root": {
								width: "100%",
							},
							mt: 2,
						}}
					>
						<Typography sx={{ fontWeight: 500, fontSize: "14px" }}>End</Typography>
						<MuiDatePicker type="TimePicker" />
						{/* <TextField type="time" variant="outlined" size="small" className="custom-textfield" id="end_time" {...register("end_time")} /> */}
					</Stack>
					<Stack
						spacing={{ xs: 2, sm: 2 }}
						sx={{
							display: "flex",
							flexDirection: "column",
							paddingInline: "1rem",
							"& .MuiFormControl-root": {
								width: "100%",
							},
							mt: 2,
						}}
					>
						<Typography sx={{ fontWeight: 500, fontSize: "14px" }}>Shift title</Typography>
						<TextField
							type="text"
							variant="outlined"
							size="small"
							className="custom-textfield"
							id="shift_title"
							{...register("shift_title")}
						/>
					</Stack>
					<Stack
						spacing={{ xs: 2, sm: 2 }}
						sx={{
							display: "flex",
							flexDirection: "column",
							paddingInline: "1rem",
							"& .MuiFormControl-root": {
								width: "100%",
							},
							mt: 2,
						}}
					>
						<Typography sx={{ fontWeight: 500, fontSize: "14px" }}>Job</Typography>
						<TextField type="text" variant="outlined" size="small" className="custom-textfield" id="name" {...register("name")} />
					</Stack>
					<Stack
						spacing={{ xs: 2, sm: 2 }}
						sx={{
							display: "flex",
							flexDirection: "column",
							paddingInline: "1rem",
							"& .MuiFormControl-root": {
								width: "100%",
							},
							mt: 2,
						}}
					>
						<Typography sx={{ fontWeight: 500, fontSize: "14px" }}>Assign to</Typography>
						<FormControl fullWidth size="small" className="custom-textfield">
							<Select
								displayEmpty
								inputProps={{ "aria-label": "Without label" }}
								defaultValue={initialData?.assign_to ? initialData.assign_to : ""}
								{...register("assign_to")}
								onChange={(e) => handleChange(e)}
							>
								{selectEmployee?.users &&
									selectEmployee?.users.map((data, key) => {
										return (
											<MenuItem key={key} value={data.id}>
												{data.name}
											</MenuItem>
										);
									})}
							</Select>
						</FormControl>
					</Stack>
					<Stack
						spacing={{ xs: 3, sm: 2 }}
						sx={{
							display: "flex",
							flexDirection: "column",
							paddingInline: "1rem",
							"& .MuiFormControl-root": {
								width: "100%",
							},
							mt: 2,
						}}
					>
						<Typography sx={{ fontWeight: 500, fontSize: "14px" }}>Location</Typography>
						{/* <Box className="testSelect__menu"> */}
						{/* <Autocomplete
							style={{ height: "28px" }}
							className="autocomplete"
							apiKey={"AIzaSyABX4LTqTLQGg_b3jFOH8Z6_H5CDqn8tbc"}
							onPlaceSelected={(place) => {
								console.log("Place", place);
								setSelectedPlace(place);
							}}
							types={["address"]}
							componentRestrictions={{ country: "au" }}
						/> */}
						{/* </Box> */}
						<AdressField
							placeholder="Enter Address"
							name="address"
							control={control}
							Controller={Controller}
							error={errors?.address?.message}
							required={true}
							label="Address"
							type="text"
							onChange={(place) => {
								console.log("Place", place);
								setSelectedPlace(place);
							}}
						/>
						<TextField
							multiline
							rows={2}
							maxRows={4}
							variant="outlined"
							value={selectedPlace ? selectedPlace.formatted_address : ""}
							size="small"
							id="location"
							{...register("location")}
						/>
					</Stack>
					<Stack
						spacing={{ xs: 2, sm: 2 }}
						sx={{
							display: "flex",
							flexDirection: "column",
							paddingInline: "1rem",
							"& .MuiFormControl-root": {
								width: "100%",
							},
							mt: 2,
						}}
					>
						<Typography sx={{ fontWeight: 500, fontSize: "14px" }}>Forms</Typography>
						<FormControl fullWidth size="small" className="custom-textfield">
							<Select
								displayEmpty
								inputProps={{ "aria-label": "Without label" }}
								defaultValue={initialData?.form_id ? initialData.form_id : ""}
								{...register("form_id")}
								onChange={(e) => formHandleChange(e)}
							>
								{selectForm?.forms &&
									selectForm?.forms.map((data, key) => {
										return (
											<MenuItem key={key} value={data.id}>
												{data.name}
											</MenuItem>
										);
									})}
							</Select>
						</FormControl>
					</Stack>
					{/* <Paper
						style={{
							border: showBorder ? "1px solid black" : "none",
						}}
					>
						{dynamicFields}
					</Paper> */}
					<Stack
						spacing={{ xs: 2, sm: 2 }}
						sx={{
							display: "flex",
							flexDirection: "column",
							paddingInline: "1rem",
							"& .MuiFormControl-root": {
								width: "100%",
							},
							mt: 2,
						}}
					>
						<Typography sx={{ fontWeight: 500, fontSize: "14px" }}>Assign by</Typography>
						<FormControl fullWidth size="small" className="custom-textfield">
							<Select
								displayEmpty
								inputProps={{ "aria-label": "Without label" }}
								defaultValue={initialData?.admin_id ? initialData.admin_id : ""}
								{...register("admin_id")}
								onChange={(e) => handleChange(e)}
							>
								{selectAdmins?.admins &&
									selectAdmins?.admins.map((data, key) => {
										return (
											<MenuItem key={key} value={data.id}>
												{data.name}
											</MenuItem>
										);
									})}
							</Select>
						</FormControl>
					</Stack>
					<Stack
						spacing={{ xs: 2, sm: 2 }}
						sx={{
							display: "flex",
							flexDirection: "column",
							paddingInline: "1rem",
							"& .MuiFormControl-root": {
								width: "100%",
							},
							mt: 2,
						}}
					>
						<Typography sx={{ fontWeight: 500, fontSize: "14px" }}>Supervisor</Typography>
						<FormControl fullWidth size="small" className="custom-textfield">
							<Select
								displayEmpty
								inputProps={{ "aria-label": "Without label" }}
								defaultValue={initialData?.supervisor_id ? initialData.supervisor_id : ""}
								{...register("supervisor_id")}
								onChange={(e) => handleChange(e)}
							>
								{selectSupervisors?.supervisors &&
									selectSupervisors?.supervisors.map((data, key) => {
										return (
											<MenuItem key={key} value={data.id}>
												{data.name}
											</MenuItem>
										);
									})}
							</Select>
						</FormControl>
					</Stack>
					<Stack
						spacing={{ xs: 2, sm: 2 }}
						sx={{
							display: "flex",
							flexDirection: "column",
							paddingInline: "1rem",
							"& .MuiFormControl-root": {
								width: "100%",
							},
							mt: 2,
						}}
					>
						<Typography sx={{ fontWeight: 500, fontSize: "14px" }}>Amount</Typography>
						<TextField id="outlined-basic" label="" variant="outlined" />
					</Stack>
					<Stack
						spacing={{ xs: 2, sm: 2 }}
						sx={{
							display: "flex",
							flexDirection: "column",
							paddingInline: "1rem",
							"& .MuiFormControl-root": {
								width: "100%",
							},
							mt: 2,
						}}
					>
						<Typography sx={{ fontWeight: 500, fontSize: "14px" }}>Chat Link</Typography>
						<TextField id="outlined-basic" label="" variant="outlined" />
					</Stack>
					<Paper elevation={0} style={paperStyle} sx={{ mt: 17.8, borderRadius: 0 }}>
						<Stack direction="row" spacing={3} justifyContent="center" alignItems="center" mt={1} mb={1}>
							<Button
								sx={{
									textTransform: "capitalize",
									borderColor: "white",
									color: "white",
								}}
								disableElevation
								type="submit"
								variant="outlined"
								color="primary"
								size="small"
							>
								Submit
							</Button>
							<Button
								sx={{
									textTransform: "capitalize",
									borderColor: "white",
									color: "white",
								}}
								type="button"
								disableElevation
								size="small"
								variant="outlined"
								color="primary"
							>
								Save as template
							</Button>
						</Stack>
					</Paper>
					{/* <Controller
                        name="date"
                        control={control}
                        render={({ field }) => <Switch {...field} />}
                    />
                    <Controller
                        name="all_day"
                        control={control}
                        render={({ field }) => <Switch {...field} />}
                    /> */}
					{/* <input type="submit" /> */}
				</Box>
			</Box>
		</Box >
	);
}

export default DrawerFormTaskList;



