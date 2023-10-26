/* eslint-disable no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
	Box,
	Button,
	Divider,
	IconButton,
	InputAdornment,
	TextField,
	Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { addJobData, viewJobData } from "redux/api/services/jobService";
import { errorAlert } from "helpers/globalFunctions";
import { toast } from "react-toastify";
import { authEndPoints } from "helpers/endpoints";
import { useDispatch, useSelector } from "react-redux";
import { essentialList } from "redux/api/services/essentialService";
import { formListGetById } from "redux/api/services/formService";
import Loadercomponent from "components/loader";
import SelectField from "components/reusableFormFields/selectField";
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { validateQuick, validateRecus } from "helpers/validate";
import DatePickerComponent from "components/reusableFormFields/datePicker";
import SelectWithCheckBox from "components/reusableFormFields/selectWithCheckbox";
import RadioFieldComponent from "components/reusableFormFields/Radio";
import TimePickerComponent from "components/reusableFormFields/timePicker";
import TextFormField from "components/reusableFormFields/TextField";
import AutocompleteField from "components/reusableFormFields/Autocomplete";
import AddressField from "components/reusableFormFields/AddressField/addressField";
import { AddressFormater } from "helpers/global";
import MobileField from "components/reusableFormFields/TextField/mobileField";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
export default function DrawerForm({ taskId = null, type = "add", handleRefetch, readOnly, disabled ,onClose,}) {

	const dispatch = useDispatch();
	const [fieldShow, setFieldShow] = useState(false);

	const [validationType, setValidationType] = useState('');

	const loading = useSelector((state) => {
		return state.job.viewJobData.loading;
	});
	const essentialLoading = useSelector((state) => {
		return state.essential.essentialList.loading;
	});
	const initialValue = useSelector((state) => {
		return state.job.viewJobData.data;
	});


	const { handleSubmit, control, reset, watch, setValue, formState: { errors, isSubmitting } } = useForm({
		defaultValues: type === 'add' ?
			{
				is_day: []
			} :
			initialValue,
		resolver: validationType === 'recurring' ? yupResolver(validateRecus) : yupResolver(validateQuick),
		mode: 'onSubmit'
	});

	const jobType = watch("type");

	useEffect(() => {
		if (jobType === 'recurring') {
			setValidationType('recurring')
		} else {
			setValidationType('quick')
		}
	}, [jobType])

	const [essential, setEssential] = useState({
		forms: [],
		users: [],
		supervisors: [],
		roles: [],
		admins: [],
	});
	const jobTypeData = [
		{ label: 'Task', value: 'recurring' },
		{ label: 'Quick Job', value: 'quick' }
	]

	const recuringType = [
		{ label: 'Weekly', value: 'weekly' },
		{ label: 'Fortnight', value: 'fort_night' },
		{ label: 'Third Week', value: 'third_week' },
		{ label: 'Forth Week', value: 'forth_week' }
	]

	const formbyId = async (value) => {
		const id = value;
		const parameters = {
			url: `${authEndPoints.form.formById(id)}`,
		};
		try {
			const response = await dispatch(formListGetById(parameters)).unwrap();
			setValue("form_value", response.data.value);
		} catch (errors) {
			errorAlert(errors?.error);
		}
	};

	const essentialApi = async () => {
		try {
			const parameters = {
				url: `${authEndPoints.essential.essentialSelect}`,
				include: "forms,supervisors,roles,users,admins",
			};
			const response = await dispatch(essentialList(parameters)).unwrap();
			setEssential(response.data);
		} catch (errors) {
			errorAlert(errors?.error);
		}
	};

	const getFormData = async (task_id) => {
		try {
			const parameters = {
				url: `${authEndPoints.job.viewJob(task_id)}`,
			};
			await dispatch(viewJobData(parameters)).unwrap();
		} catch (errors) {
			errorAlert(errors?.error);
		}
	};

	const handleFormSumbit = async (values) => {
		const formatedAddress = AddressFormater(values.address)
		const data = {
			...values,
			...formatedAddress,
			form_id: values.form_id?.value ?? "",
			admin_id: values.admin_id?.value ?? "",
			supervisor_id: values.supervisor_id?.value ?? "",
			assign_to: values.assign_to?.value ?? "",
			// is_day: values?.is_day?.length >= 1 ? values?.is_day : [dayjs().format("dddd").toLowerCase()],
			date: dayjs(values.date).format("YYYY-MM-DD"),
			// start_time: dayjs(values.start_time).format("hh:mm A"),
			// end_time: dayjs(values.end_time).format("hh:mm A"),
		};

		try {
			const response = await dispatch(
				addJobData({
					url: taskId ? authEndPoints.job.editJob(taskId) : authEndPoints.job.addJob,
					data,
					method: taskId ? "PUT" : "POST",
				})
			).unwrap();
			toast.success(response.message);
			handleRefetch();
		} catch (error) {
			errorAlert(error?.error ?? error?.message);
		}
	};

	const formValue = watch("form_id");

	useEffect(() => {
		if (formValue)
			formbyId(formValue?.value)
	}, [formValue]);


	useEffect(() => {
		essentialApi();
	}, []);

	useEffect(() => {
		if (jobType === "quick") {
			setFieldShow(false);
		} else {
			setFieldShow(true);
		}
	}, [jobType]);

	useEffect(() => {
		if (taskId) {
			getFormData(taskId);
		}
	}, [taskId]);

	useEffect(() => {
		if (type !== "add") {
			if (initialValue) {
				// const { date, start_time, end_time, created_by, created_at, ...others } = initialValue;
				// const prevData = {
				// 	...others,
				// 	date: dayjs(date, "YYYY-MM-DD"),
				// 	start_time: dayjs(start_time, "hh:mm A"),
				// 	end_time: dayjs(end_time, "hh:mm A"),
				// };
				reset(initialValue);
			} else {
				reset();
			}
		} else {
			reset();
		}
	}, [initialValue]);

	return (
		<Box>
			  <Box sx={{ display: "flex", justifyContent: "flex-end", paddingRight: 1 }}>
			<IconButton onClick={onClose} ><CloseIcon/></IconButton>
			</Box>                  
			<Typography sx={{ fontWeight: 500, fontSize: "14px", textAlign: "center", py: 3 }}>{dayjs().format("DD MMMM YYYY")}</Typography>
			<Typography sx={{ fontWeight: 500, fontSize: "14px", pb: 1, pl: 1 }}>Task Detail</Typography>
			<Divider sx={{ borderWidth: 1, borderColor: "black" }} />
			{loading || essentialLoading ? (
				<Loadercomponent isFetching={true} />
			) : (
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						gap: "10px",
						padding: "10px",
					}}
				>
					<form onSubmit={handleSubmit(handleFormSumbit)}>
						<SelectField
							name="type"
							control={control}
							label="Job Type"
							Controller={Controller}
							data={jobTypeData}
							error={errors?.type?.message}
							disabled={disabled}
						/>
						<DatePickerComponent
							name="date"
							control={control}
							Controller={Controller}
							error={errors?.date?.message}
							label="Date"
							disabled={disabled}
						/>
						{fieldShow && (
							<>
								<SelectWithCheckBox
									name="is_day"
									control={control}
									label="Day"
									Controller={Controller}
									watch={watch}
									error={errors?.is_day?.message}
									disabled={disabled}
								/>
								<RadioFieldComponent
									name="recurring_type"
									control={control}
									Controller={Controller}
									jobType={recuringType}
									error={errors?.recurring_type?.message}
									label="Task"
									disabled={disabled}
								/>
							</>
						)}
						<TimePickerComponent
							name="start_time"
							control={control}
							Controller={Controller}
							label="Start Time"
							disabled={disabled}
						/>
						<TimePickerComponent
							name="end_time"
							control={control}
							Controller={Controller}
							label="End Time"
							disabled={disabled}
						/>
						<TextFormField
							placeholder="Enter Shift title"
							name="shift_title"
							control={control}
							Controller={Controller}
							label="Shift title"
							disabled={disabled}
							type="text"
						/>
						<TextFormField
							placeholder="Enter Job"
							name="name"
							control={control}
							Controller={Controller}
							label="Job"
							type="text"
							error={errors?.name?.message}
							disabled={disabled}
						/>
						{essential.users && (
							<AutocompleteField
								name="assign_to"
								control={control}
								label="Assigned To"
								Controller={Controller}
								data={essential.users}
								error={errors?.assign_to?.message}
								disabled={disabled}
							/>
						)}
						<AddressField
							placeholder="Enter Address"
							name="address"
							control={control}
							Controller={Controller}
							error={errors?.address?.message}
							required={true}
							label="Address"
							type="text"
							disabled={disabled}
						/>
						{essential.forms.length !== 0 && (
							<AutocompleteField
								name="form_id"
								control={control}
								label="Forms"
								Controller={Controller}
								data={essential.forms}
								error={errors?.form_id?.message}
								disabled={disabled}
							/>
						)}
						<Controller
							control={control}
							name="job_value"
							render={({ field }) => (
								<Box sx={{ display: "none" }}>
									<Typography sx={{ fontWeight: 500, fontSize: "14px" }}>Job Value</Typography>
									<TextField {...field} size="small"></TextField>
								</Box>
							)}
						/>
						{essential.admins.length !== 0 && (
							<AutocompleteField
								name="admin_id"
								control={control}
								label="Assigned by"
								Controller={Controller}
								data={essential?.admins}
								error={errors?.admin_id?.message}
								disabled={disabled}
							/>
						)}
						{essential.supervisors.length !== 0 && (
							<AutocompleteField
								name="supervisor_id"
								control={control}
								label="Supervisor"
								Controller={Controller}
								data={essential.supervisors}
								error={errors?.supervisor_id?.message}
								disabled={disabled}
							/>
						)}
						<MobileField
							placeholder="Enter Amount"
							name="amount"
							control={control}
							Controller={Controller}
							label="Amount Per Visit"
							type="text"
							InputProps={{
								startAdornment: <InputAdornment position="start">$</InputAdornment>,
							}}
							error={errors?.amount?.message}
							disabled={disabled}
						/>
						<TextFormField
							placeholder="Enter Chat Link"
							name="chat_link"
							control={control}
							Controller={Controller}
							label="Chat Link"
							type="text"
							disabled={disabled}
						/>
						{!readOnly && (
							<LoadingButton
								sx={{
									textTransform: "capitalize",
									mt: 2,
									width: '100%',
									color: "white",
									background: "green",
								}}
								loadingPosition="center"
								disableElevation
								loading={isSubmitting}
								variant="contained"
								type="submit"
								color="success"
							>
								Submit
							</LoadingButton>
						)}
					</form>
				</Box>
			)}
		</Box>
	);
}
