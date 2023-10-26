/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { Box, Grid, Typography, Button, DialogTitle, Stack, Dialog } from "@mui/material";
import TopBreaccrumb from "components/TopBreadcrumb";
import React, { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from "react-redux"
import { deleteRoleData, rolesList } from "redux/api/services/roleService";
import { authEndPoints } from "helpers/endpoints";
import { errorAlert, successAlert } from "helpers/globalFunctions";
import TableRowsLoader from "components/TableLoader";
import TableHeader from "./tableHeader";
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import AddRoleForm from "../AddRoleForm";
import DeleteModal from "components/deleteModal";
import { Link } from "react-router-dom";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Roles = () => {

    const [open, setOpen] = React.useState(false);
    const [singleData, setSingleData] = useState(null)
    const dispatch = useDispatch()
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [delid, setDelId] = useState(null)
    const role = localStorage.getItem("roleName");

    const stateValues = useSelector((state) => {
        return {
            deleteLoading: state.role.deleteRole.loading,
            rolesListData: state.role.rolesList
        }
    })

    const useListApi = async () => {
        const parameters = {
            url: authEndPoints.role.rolesList,
        };
        try {
            await dispatch(rolesList(parameters)).unwrap();
        } catch (errors) {
            errorAlert(errors?.error);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };


    const handleClickOpen = () => {
        setSingleData(null)
        setOpen(true);
    };


    const deleteDirectoryModalClose = () => {
        setDeleteModalOpen(false);
    }


    const editRole = (row) => {
        setSingleData(row)
        setOpen(true);
    }

    const deleteRole = (id) => {
        setDelId(id)
        setDeleteModalOpen(true);
    }

    const handleButtonClick = async () => {
        handleClose(); // Call handleClose to close the form
        await useListApi(); // Call handleAddDirectory to add directory data
    };


    const delteApiFn = async () => {

        const parameters = {
            url: `${authEndPoints.role.removeRole(delid)}`,
        };
        try {
            const response = await dispatch(deleteRoleData(parameters)).unwrap();
            setDeleteModalOpen(false);
            useListApi();
            successAlert(response.message)
        } catch (errors) {
            errorAlert(errors?.error);
        }
    }
    useEffect(() => {
        useListApi();
    }, [])

    return <Box className="indexBox">
        <TopBreaccrumb title={'Masters'} to={`/${role}/dashboard`} />

        <Box>

            <Grid>
                <Stack direction={'row'} gap={2} alignItems={'center'}>
                    <Typography sx={{ fontSize: '18px', fontWeight: 700 }}>Roles</Typography>
                    <Button className='AddBtn' onClick={handleClickOpen}>Add</Button>
                </Stack>
                {open === true ? (
                    <Dialog
                        fullWidth={true}
                        maxWidth={'sm'}
                        open={open}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleClose}
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogTitle><Stack direction={'row'}
                            alignItems={'center'} justifyContent={'space-between'}>
                            <Box> {"Add Role"}</Box>
                            <Box>
                                <CloseIcon onClick={handleClose} sx={{ cursor: 'pointer' }} />
                            </Box>
                        </Stack></DialogTitle>
                        <AddRoleForm initialData={singleData} onClick={handleButtonClick} />
                    </Dialog>
                ) : null}

            </Grid>


            <Grid container spacing={2} sx={{ my: 3 }}>
                <Grid item md={6} sm={12} xs={12}>
                    <TableContainer className="rolesPageTable">
                        <Table>
                            <TableHeader />
                            <TableBody>
                                {stateValues.rolesListData.loading ? (
                                    <TableRowsLoader rowsNum={2} colsNum={4} />
                                ) : (
                                    stateValues.rolesListData?.data?.data?.data?.map((row, i) => (
                                        <TableRow key={row.id}>
                                            <TableCell onClick={() => editRole(row)} sx={{ cursor: 'pointer' }}>{row.id}</TableCell>
                                            <TableCell onClick={() => editRole(row)} sx={{ cursor: 'pointer' }}>{row.name}</TableCell>
                                            <TableCell>{row.status === 1 ? 'Active' : 'InActive'}</TableCell>
                                            <TableCell align="center">
                                                <Stack direction={'row'} gap={2}>
                                                    {/* <Link to={`/${role}/roleandPermission/${row.id}`}>
                                                        <EditIcon className="table-icons" sx={{ color: "black" }} />
                                                    </Link> */}
                                                    <DeleteIcon className="table-icons" onClick={() => deleteRole(row.id)} />
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {stateValues.rolesListData?.data?.data?.data?.length === 0 && <Box sx={{ my: 2 }}>
                        <Typography>No Data Found</Typography>
                    </Box>}
                    {deleteModalOpen &&
                        <DeleteModal open={deleteModalOpen} close={() => deleteDirectoryModalClose()}
                            title={'Delete Role'}
                            content={'Are you sure want to delete this Role?'}
                            submit={delteApiFn}
                            loading={stateValues.deleteLoading}
                        />
                    }
                </Grid>
            </Grid>
        </Box>
    </Box >

}

export default Roles;