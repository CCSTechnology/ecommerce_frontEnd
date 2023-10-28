import React from 'react'
import { Controller } from 'react-hook-form';
import { LoadingButton } from "@mui/lab";
import {Box, Grid, TextField, Select, MenuItem, Checkbox, FormControlLabel } from '@mui/material';


export default function TextBox(props) {
    const {handleChange, control, errors, isSubmitting, handleSubmit} = props

  return (
    <>
        <form onSubmit={handleSubmit(handleChange)}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Controller
                        name={"textbox"}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextField
                                required
                                onChange={onChange}
                                value={value}
                                label={"Textbox Name"}
                                size="medium"
                                error={errors.email}
                                helperText={errors.email?.message}
                                fullWidth
                            />
                        )}
                    />
                </Grid>

                <Grid item xs={12}>
                <Controller
                        name="fieldtype"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <Select {...field} variant="outlined" style={{width:'100%'}} required>
                                <MenuItem value="text">Text</MenuItem>
                                <MenuItem value="number">Number</MenuItem>         
                                fullWidth
                            </Select>
                        )}
                    />
                </Grid>

                <Grid item xs={12} className="forgotCtr">
                    <Controller
                        name="checkbox"
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
