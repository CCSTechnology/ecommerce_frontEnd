import React from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { FormHelperText, Typography } from '@mui/material';

function RadioFieldComponent(props) {
    const { label, Controller, control, name, error, jobType, disabled } = props;

    return (
        <Controller
            control={control}
            name={name}
            defaultValue={undefined}
            render={({ field }) => (
                <FormControl error={error}>
                    <Typography variant="subtitle1">{label}</Typography>
                    <RadioGroup row {...field}>
                        {jobType?.map((options, i) => (
                            <FormControlLabel
                                value={options.value}
                                control={<Radio />}
                                label={options.label}
                                disabled={disabled}
                            />
                        ))}
                    </RadioGroup>
                    <FormHelperText>{error}</FormHelperText>
                </FormControl>
            )}
        />
    )
}

export default RadioFieldComponent