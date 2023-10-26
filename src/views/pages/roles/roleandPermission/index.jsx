/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Box, Checkbox, FormControlLabel, Grid, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import TopBreaccrumb from "components/TopBreadcrumb";
import TableHeader from "./tableHeader";
import { rolePermissionData } from "redux/api/services/roleService";
import { authEndPoints } from "helpers/endpoints";
import { useDispatch, useSelector } from "react-redux";
import { errorAlert } from "helpers/globalFunctions";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const RoleAndPermission = () => {

  const dispatch = useDispatch()
  const role = localStorage.getItem("roleName");
  const rolePermissions = useSelector((state) => state.role.rolePermission)

  // Role Permission  Api
  const rolePermissionApi = async () => {
    const parameter = {
      url: `${authEndPoints.role.permissionRole}`,

    };
    try {
      await dispatch(rolePermissionData(parameter)).unwrap();
    } catch (errors) {
      errorAlert(errors?.error);
    }
  };

  useEffect(() => {
    rolePermissionApi()
  }, [])


  return (
    <Box className="indexBox">
      <TopBreaccrumb title={'ADMIN'} to={`/${role}/dashboard`} />
      <Grid container spacing={2} sx={{ my: 3 }} >
        <Grid item xs={12} sm={12} md={12}>


          <TableContainer className="rolesPageTable">
            <Table>

              <TableHeader />

              <TableBody>

                {/* {rolePermissions.loading ? (
                  <PermissionCardLoader rowsNum={10} colsNum={10} />
                ) : ( */}
                {rolePermissions?.data?.data?.map((row, i) => (

                  < TableRow >

                    <TableCell>   <FormControlLabel control={<Checkbox />} label={row.module} /></TableCell>
                    <TableCell>
                      <Checkbox
                        {...label} checked={row.create === 0 ? false : true}
                        inputProps={{ 'aria-label': 'controlled' }} />
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        {...label} checked={row.read === 0 ? false : true}
                        inputProps={{ 'aria-label': 'controlled' }} />
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        {...label} checked={row.update === 0 ? false : true}
                        inputProps={{ 'aria-label': 'controlled' }} />
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        {...label} checked={row.delete === 0 ? false : true}
                        inputProps={{ 'aria-label': 'controlled' }} />
                    </TableCell>
                  </TableRow>
                ))}
                {/* )} */}
              </TableBody>
            </Table>
          </TableContainer>

        </Grid>

      </Grid>
    </Box >

  )
}

export default RoleAndPermission

