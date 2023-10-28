import React, { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form';
import { LoadingButton } from "@mui/lab";
import {Box, Grid, TextField, Select, MenuItem, Checkbox, FormControlLabel} from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function FileUpload(props) {
    const {handleChange, control, errors, isSubmitting, handleSubmit} = props

   

  return (
    <>
        <form onSubmit={handleSubmit(handleChange)} >
            <Grid container spacing={3}>
               
                    <Grid item xs={12}>
                        <Controller
                            name="fileupload"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <TextField
                                    required
                                    onChange={onChange}
                                    value={value}
                                    label={"Upload label Name"}
                                    size="medium"
                                    // error={errors[`checkbox${index + 1}`]}
                                    // helperText={errors[`checkbox{index + 1}`]?.message}
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
                                    control={<Checkbox                   
                                                {...field} />}
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
