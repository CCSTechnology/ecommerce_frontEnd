import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";

export default function MuiDatePicker({ onError = () => {}, errorMessage = "", label = "", type = "DatePicker" }) {
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<DemoContainer components={[type]}>
				{type === "DatePicker" && (
					<DatePicker
						value={dayjs()}
						onError={true}
						slotProps={{
							textField: {
								helperText: errorMessage,
							},
						}}
						label={label}
					/>
				)}
				{type === "TimePicker" && (
					<TimePicker
						value={dayjs()}
						onError={true}
						slotProps={{
							textField: {
								helperText: errorMessage,
							},
						}}
						label={label}
					/>
				)}
			</DemoContainer>
		</LocalizationProvider>
	);
}
