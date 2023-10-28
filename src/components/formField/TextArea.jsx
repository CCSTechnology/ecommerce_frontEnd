import React from 'react'
import { Controller } from 'react-hook-form';
import { LoadingButton } from "@mui/lab";
import { Box, Grid, TextField, Checkbox, FormControlLabel } from '@mui/material';

export default function TextArea(props) {
    const { handleChange, control, errors, isSubmitting, handleSubmit } = props

    return (
        <>
            <form onSubmit={handleSubmit(handleChange)}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Controller
                            name={"textarea"}
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <TextField
                                    required
                                    onChange={onChange}
                                    value={value}
                                    label={"TextArea Name"}
                                    size="medium"
                                    error={errors.email}
                                    helperText={errors.email?.message}
                                    fullWidth
                                />
                            )}
                        />
                    </Grid>

                    {/* <Grid item xs={12}>
                    <Controller
                        name={"maxrow"}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextField
                                onChange={onChange}
                                value={value}
                                label={"Max rows"}
                                size="medium"
                                type='number'
                                // error={errors.email}
                                // helperText={errors.email?.message}
                                fullWidth
                            />
                        )}
                    />
                </Grid>
                            
                <Grid item xs={12}>
                    <Controller
                        name={"minrow"}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextField
                                onChange={onChange}
                                value={value}
                                label={"Min rows"}
                                size="medium"
                                type='number'                                // error={errors.email}
                                // helperText={errors.email?.message}
                                fullWidth
                            />
                        )}
                    />
                </Grid> */}

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

