import React from 'react'
import { Controller } from 'react-hook-form';
import { LoadingButton } from "@mui/lab";
import {Box, Grid, TextField, Select, MenuItem, Checkbox, FormControlLabel } from '@mui/material';
import dayjs from 'dayjs';


export default function Date(props) {
    const {handleChange, control, errors, isSubmitting, handleSubmit} = props

  return (
    <>
        <form onSubmit={handleSubmit(handleChange)}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Controller
                        name={"date"}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextField
                                required
                                onChange={onChange}
                                value={value}
                                label={"Date Name"}
                                InputLabelProps={{
                                    shrink: true,
                                  }}
                                size="medium"
                                error={errors.email}
                                helperText={errors.email?.message}
                                fullWidth
                            />
                        )}
                    />
                </Grid>

                <Grid item xs={12} className="forgotCtr">
                    <Controller
                        name="requiredCheckbox"
                        control={control}
                        defaultValue={false}
                        render={({ field }) => (
                            <FormControlLabel
                                control={<Checkbox {...field} />}
                                label="Required"
                            />
                        )}
                    />
                </Grid>
			</Grid>

            <Box className="text-center-cls" sx={{ my: 1 }}>
                <LoadingButton
                    loadingPosition="center"
                    loading={isSubmitting}
                    variant="contained"
                    type="submit"
                    className="submitBtn">
                    Submit
                </LoadingButton>
            </Box>
		</form>
    </>
  )
}
