import React from 'react'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { FormHelperText, ListItemIcon } from '@mui/material';
import { Typography } from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const options = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
];

function SelectWithCheckBox({ label, Controller, control, name, error, watch, disabled }) {
    const watchValue = watch(name)
    const isAllSelected = options.length > 0 && watchValue?.length === options.length;
    const handleChange = (event, onChange) => {
        const value = event.target.value;
        if (value[value.length - 1] === "all") {
            onChange(watchValue.length === options.length ? [] : options)
            return;
        }
        else {
            onChange(value)
        }
    };
    return (
        <div>
            <Controller
                defaultValue={''}
                name={name}
                control={control}
                render={({ field: { ref, value, onChange, ...field } }) => (
                    <FormControl fullWidth error={error}>
                        <Typography variant="subtitle1">{label}</Typography>
                        <Select
                            labelId="mutiple-select-label"
                            multiple
                            value={watchValue || []}
                            // onChange={handleChange}
                            onChange={(data) => handleChange(data, onChange)}
                            renderValue={() => watchValue?.join(", ")}
                            MenuProps={MenuProps}
                            {...field}
                            size='small'
                            disabled={disabled}
                        >
                            <MenuItem
                                value="all"
                            >
                                <ListItemIcon>
                                    <Checkbox
                                        checked={isAllSelected}
                                        indeterminate={
                                            watchValue?.length > 0 && watchValue?.length < options.length
                                        }
                                    />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Select All"
                                />
                            </MenuItem>
                            {options?.map((option) => (
                                <MenuItem key={option} value={option}>
                                    <ListItemIcon>
                                        <Checkbox checked={watchValue?.indexOf(option) > -1} />
                                    </ListItemIcon>
                                    <ListItemText primary={option} />
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>{error}</FormHelperText>
                    </FormControl>
                )}
            />
        </div>
    )
}

export default SelectWithCheckBox