import { Autocomplete, TextField, Typography } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

const MuiAutoComplete = ({ name = "", label = "", control, options, handleChange = () => {}, readOnly = false }) => {
	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { ref, value, onChange, ...field } }) => {
				return (
					<>
						<Typography sx={{ fontWeight: 500, fontSize: "14px" }}>{label}</Typography>
						<Autocomplete
							onChange={(_, datas) => {
								if (datas) {
									const value = datas["value"];
									onChange(datas);
									handleChange(value);
								} else {
									onChange(undefined);
								}
							}}
							readOnly={readOnly}
							limitTags={2}
							getOptionLabel={(options) => options.label}
							options={options}
							value={value}
							defaultValue={value}
							size="small"
							renderInput={(params) => <TextField size="small" inputRef={ref} {...field} {...params} />}
						/>
					</>
				);
			}}
		/>
	);
};

export default MuiAutoComplete;
