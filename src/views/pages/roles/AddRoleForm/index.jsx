import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Box, Stack } from '@mui/material';
import { authEndPoints } from "helpers/endpoints";
import { useDispatch } from 'react-redux';
import { errorAlert, successAlert } from 'helpers/globalFunctions';
import { yupResolver } from "@hookform/resolvers/yup"
import { addRoleData } from 'redux/api/services/roleService';
import { LoadingButton } from '@mui/lab';
import TextFormField from 'components/reusableFormFields/TextField';
import { roleFormValidation } from "helpers/validate";

function AddRoleForm(props) {
    const { initialData, onClick } = props;
    const { handleSubmit, control, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(roleFormValidation),
        mode: 'onSubmit'
    });
    const dispatch = useDispatch()
    // Add Directory Api
    const handleAddRole = async (values) => {
        const parameters = {
            url: initialData ? `${authEndPoints.role.editRole(initialData.id)}` : authEndPoints.role.newRole,
            data: values,
            method: initialData ? "PUT" : "POST",
        };
        try {
            const response = await dispatch(addRoleData(parameters)).unwrap();
            onClick();
            successAlert(response.message)
        } catch (error) {
            errorAlert(error.error);
        }
    };

    return (
        <Box sx={{ mx: 2 }}>
            <form onSubmit={handleSubmit(handleAddRole)}>
                <TextFormField
                    placeholder="Enter Your Role"
                    name="name"
                    control={control}
                    Controller={Controller}
                    label="Shift title"
                    disabled={true}
                    error={errors?.name?.message}
                    type="text"
                />
                <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} gap={5} sx={{ p: 3 }}>
                    <LoadingButton
                        loadingPosition="center"
                        loading={isSubmitting}
                        variant="contained"
                        type="submit"
                        className="submitBtnn">
                        Submit
                    </LoadingButton>
                </Stack>

            </form>
        </Box >

    );
}

export default AddRoleForm
