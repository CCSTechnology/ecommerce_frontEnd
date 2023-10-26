import React from 'react'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Box, FormHelperText, Typography } from '@mui/material';
import dayjs from 'dayjs';

function TimePickerComponent(props) {
    const { label, Controller, control, name, error, disabled } = props;
    return (
        <>
            <Controller
                defaultValue={undefined}
                name={name}
                control={control}
                render={({ field }) => (
                    <Box>
                        <Typography variant="subtitle1">{label}</Typography>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['TimePicker']}>
                                <TimePicker {...field}
                                    slotProps={{ textField: { fullWidth: true, size: 'small' } }}
                                    value={dayjs(field.value, 'hh:mm a')}
                                    className={error ? 'class-1' : 'class-2'}
                                    disabled={disabled}
                                    onChange={(e) => field.onChange(dayjs(e).format('hh:mm A'))} />
                            </DemoContainer>
                            <FormHelperText className='errorMsg'>{error}</FormHelperText>
                        </LocalizationProvider>
                    </Box>
                )}
            />
        </>
    )
}

export default TimePickerComponent