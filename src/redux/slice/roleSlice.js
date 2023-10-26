import { createSlice } from "@reduxjs/toolkit"
import { rolesList, addRoleData, deleteRoleData, rolePermissionData, roleSavePermission } from "redux/api/services/roleService"

const initialState = {
    rolesList: {
        loading: false,
        data: [],
        error: null,
    },

    addRole: {
        loading: false,
        data: [],
        error: null,
    },

    deleteRole: {
        loading: false,
        data: [],
        error: null,
    },

    rolePermission: {
        loading: false,
        data: [],
        error: null,
    },
    savePermission: {
        loading: false,
        data: [],
        error: null,
    }
}

export const roleSlice = createSlice({
    name: "roles",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //Get me
            .addCase(rolesList.pending, (state, action) => {
                state.rolesList.loading = true;
            })
            .addCase(rolesList.fulfilled, (state, action) => {
                state.rolesList.loading = false;
                state.rolesList.data = action.payload;
                state.rolesList.error = null;
            })
            .addCase(rolesList.rejected, (state, action) => {
                state.rolesList.loading = false;
                state.rolesList.error = action.payload;
            })

            //Add Role
            .addCase(addRoleData.pending, (state, action) => {
                state.addRole.loading = true;
            })
            .addCase(addRoleData.fulfilled, (state, action) => {
                state.addRole.loading = false;
                state.addRole.data = action.payload;
                state.addRole.error = null;
            })
            .addCase(addRoleData.rejected, (state, action) => {
                state.addRole.loading = false;
                state.addRole.error = action.payload;
            })

            //Delete Role
            .addCase(deleteRoleData.pending, (state, action) => {
                state.deleteRole.loading = true;
            })
            .addCase(deleteRoleData.fulfilled, (state, action) => {
                state.deleteRole.loading = false;
                state.deleteRole.data = action.payload;
                state.deleteRole.error = null;
            })
            .addCase(deleteRoleData.rejected, (state, action) => {
                state.deleteRole.loading = false;
                state.deleteRole.error = action.payload;
            })

            // Role Permission
            .addCase(rolePermissionData.pending, (state, action) => {
                state.rolePermission.loading = true;
            })
            .addCase(rolePermissionData.fulfilled, (state, action) => {
                state.rolePermission.loading = false;
                state.rolePermission.data = action.payload;
                state.rolePermission.error = null;
            })
            .addCase(rolePermissionData.rejected, (state, action) => {
                state.rolePermission.loading = false;
                state.rolePermission.error = action.payload;
            })

            // save Permission
            .addCase(roleSavePermission.pending, (state, action) => {
                state.savePermission.loading = true;
            })
            .addCase(roleSavePermission.fulfilled, (state, action) => {
                state.savePermission.loading = false;
                state.savePermission.data = action.payload;
                state.savePermission.error = null;
            })
            .addCase(roleSavePermission.rejected, (state, action) => {
                state.savePermission.loading = false;
                state.savePermission.error = action.payload;
            })

    }
})

export default roleSlice.reducer