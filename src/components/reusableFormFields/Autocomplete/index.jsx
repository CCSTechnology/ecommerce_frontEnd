import React from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Typography } from '@mui/material';

function AutocompleteField({ data, Controller, name, control, error, label, disabled }) {

    return (
        <>
            <Controller
                control={control}
                name={name}
                render={({ field: { ref, value, onChange, ...field } }) => {
                    return (
                        <>
                            <Typography variant="subtitle1">{label}</Typography>
                            <Autocomplete
                                disabled={disabled}
                                disablePortal
                                size='small'
                                options={data}
                                onChange={(_, datas) => {
                                    onChange(datas)
                                }}
                                value={value}
                                {...field}
                                renderInput={(params) => <TextField
                                    size='small'
                                    {...params} value={value?.label} error={error} helperText={error} />}
                            />
                        </>
                    );
                }}
            />
        </>

    )
}

export default AutocompleteField