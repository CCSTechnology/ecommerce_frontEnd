import React from 'react'
import { Box, FormHelperText, Typography } from '@mui/material';
import Autocomplete from "react-google-autocomplete";

function AddressField(props) {
    const { label, Controller, control, name, disabled, error } = props;
    return (
        <>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <Box>
                        <Typography variant="subtitle1">{label}</Typography>
                        <Autocomplete
                            defaultValue={field.value}
                            className={error ? 'errorBorder' : ''}
                            options={{
                                types: ["address"],
                                componentRestrictions: { country: "au" },
                            }}
                            apiKey={'AIzaSyBpPnB6Le56oWSrap61sQsrZY3HRtr_cQU'}
                            onPlaceSelected={(address) => field.onChange(address)}
                            onChange={(e) => {
                                if (e.target.value === '') {
                                    field.onChange(undefined)
                                }
                            }}
                            disabled={disabled}
                        />
                    </Box>
                )}
            />
            <FormHelperText className='errorMsg'>{error}</FormHelperText>
        </>
    )
}

export default AddressField