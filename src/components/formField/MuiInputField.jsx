import * as React from "react";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";

const MuiInputField = ({ label = "", error = false, message = "", id = "", value = "", handleChange = () => {}, name }) => {
	return (
		<FormControl error={error} variant="standard">
			<InputLabel htmlFor={id}>{label}</InputLabel>
			<Input value={value} onChange={handleChange} id={id} name={name} aria-describedby={id} />
			<FormHelperText id={id}>{message}</FormHelperText>
		</FormControl>
	);
};

export default MuiInputField;
