import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { FormHelperText } from "@mui/material";

export default function MuiRadioGroup({ helperText = "", error = false, radios = [] }) {
	return (
		<FormControl error={error}>
			<FormLabel id="demo-row-radio-buttons-group-label">Task</FormLabel>
			<RadioGroup row value={"weekly"} aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
				{radios?.map((radio) => {
					return <FormControlLabel value={radio?.value} control={<Radio />} label={radio?.label} />;
				})}
				<FormControlLabel value="day" control={<Radio />} label="Daily" />
				<FormControlLabel value="weekly" control={<Radio />} label="Weekly" />
				<FormControlLabel value="bi-weekly" control={<Radio />} label="Bi Weekly" />
				<FormControlLabel value="monthly" control={<Radio />} label="Monthly" />
			</RadioGroup>
			<FormHelperText>{helperText}</FormHelperText>
		</FormControl>
	);
}
