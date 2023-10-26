import React, { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form';
import { LoadingButton } from "@mui/lab";
import { Box, Grid, TextField, Checkbox, FormControlLabel } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';

export default function RadioBox(props) {
    const { handleChange, control, errors, isSubmitting, handleSubmit, setRadioOption} = props

    const [addTextField, setAddTextField] = useState(["radiogroup0"])

    const removeTextField = (index) => {

        setAddTextField((state) => {
            const newState = [...state];
            newState.splice(index, 1);
            return newState;
          });

    };

    const addNewTextField = (index) => {
        setAddTextField((state) => [...state, `radiogroup${index+1}`]);
    };

    useEffect(()=>{
        if(addTextField){
        setRadioOption(addTextField)
    }
    }, [addTextField])

    return (
        <>
            <form onSubmit={handleSubmit(handleChange)} >
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Controller
                            name={"radiobox"}
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <TextField
                                    required
                                    onChange={onChange}
                                    value={value}
                                    label={"Radiobox Name"}
                                    size="medium"
                                    error={errors.email}
                                    helperText={errors.email?.message}
                                    fullWidth
                                />
                            )}
                        />
                    </Grid>

                    {
                        addTextField?.map((_, index) => (
                            <Grid container item xs={12} key={index}>
                                <Grid item xs={8}>
                                    <Controller
                                        name={`radiogroup${index}`}
                                        control={control}
                                        render={({ field: { onChange, value } }) => (
                                            <TextField
                                                required
                                                onChange={onChange}
                                                value={value}
                                                label={`Radio Group Label ${index + 1}`}
                                                size="medium"
                                                // error={errors[`menuitem${index + 1}`]}
                                                // helperText={errors[`menuitem${index + 1}`]?.message}
                                                fullWidth
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={2} container style={{ alignItems: "center", paddingLeft: '10px' }}>
                                <AddBoxIcon onClick={()=>{addNewTextField(index)}} />
                                </Grid>
                                {
                                    addTextField.length > 1 && (
                                        <Grid item xs={2} container style={{ alignItems: "center" }}>
                                            <DeleteIcon onClick={() => { removeTextField(index) }} />
                                        </Grid>
                                    )
                                }

                            </Grid>
                        ))

                    }

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
