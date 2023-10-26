import React, { useEffect, useState } from "react"
import {
    Box, Button, Dialog, FormControlLabel, Grid, IconButton, Stack, Table, TableBody, TableCell,
    TableContainer, TableRow, Typography
} from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchInput from "components/searchInput"
import TablePagination from 'components/Pagination'
import TableHeaders from "./tableHeaders"
import { authEndPoints } from "helpers/endpoints";
import { errorAlert, successAlert } from "helpers/globalFunctions";
import { customerListData, deleteEmployeeData} from "redux/api/services/employeeService";
import { useDebounce } from "use-debounce";
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import DeleteModal from 'components/deleteModal'
import AddEmployeeForm from "../addEmployeeform";
import TableRowsLoader from "components/TableLoader";
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { approvedChangeData } from "redux/api/services/approvedService";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from "react-router-dom";

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import TopBreaccrumb from "components/TopBreadcrumb";
import { add } from "@dnd-kit/utilities";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color:
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}));

const Customers = () => {

    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(false);
    const [searchKey, setSearchKey] = useState('');
    const [searchValue] = useDebounce(searchKey, 1000);
    const [page, setPage] = useState(1);
    const [delid, setDelId] = useState(null)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [singleData, setSingleData] = useState(null)
    const [customerData, setCustomerData] = useState(null)
    const [directoryPage, setDirectoryPage] = useState('employee');
    // const role = localStorage.getItem("roleName");
    const [addType, setAddType] = useState(null)



    const stateValues = useSelector((state) => {
        return {
            deleteLoading: state.employee.deleteEmployee.loading,
        }
    })
    const customerList = useSelector((state) => state)
    console.log(customerList)
    console.log(customerData)

    // cancel search
    const cancelSearch = () => {
        setSearchKey('');
    };

    //on search
    const onSearch = e => {
        setSearchKey(e.target.value);
    };

    const handlePageChanges = (_event, pageValue) => {
        setPage(pageValue);
    }

    const handleClickOpen = () => {
        setSingleData(null)
        setOpen(true);
        setAddType("add")
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteDirectory = (id) => {
        setDelId(id)
        setDeleteModalOpen(true);
    }

    const editDirectory = (row) => {
        setSingleData(row)
        setOpen(true);
        setAddType("edit")
    }

    const deleteDirectoryModalClose = () => {
        setDeleteModalOpen(false);
    }

    const handleCheck = async (values, e) => {
        console.log(e);
        const { id, is_approved } = values
        console.log(is_approved);
        if (is_approved === 0) {
            const formData = {
                is_approved: e.target.checked ? 1 : is_approved,
            };
            const parameters = {
                url: `${authEndPoints.approved.approvedData(id)}`,
                data: formData
            };
            try {
                const response = await dispatch(approvedChangeData(parameters)).unwrap();
                successAlert(response.message);
                customerListApi()
            } catch (error) {
                errorAlert(error.error);
            }
        }

    }

    const delteApiFn = async () => {
        const parameters = {
            url: `${authEndPoints.employee.removeEmployee(delid)}`,
        };
        try {
            const response = await dispatch(deleteEmployeeData(parameters)).unwrap();
            setDeleteModalOpen(false);
            successAlert(response.message);
            customerListApi()
        } catch (errors) {
            errorAlert(errors?.error);
        }
    }

    // customerlist Api
    const customerListApi = async () => {
        const parameter = {
            url: `${authEndPoints.employee.customerList}?per_page=10&page=${page}&search=${searchKey}`,

        };
        try {
            const res = await dispatch(customerListData(parameter)).unwrap();
            console.log(res)
            setCustomerData(res)


        } catch (errors) {
            errorAlert(errors?.error);
        }
    };

    const handleButtonClick = async () => {
        handleClose(); // Call handleClose to close the form
        await customerListApi(); // Call handleAddDirectory to add directory data
    };

    const handleChange = (event) => {
        setDirectoryPage(event.target.value);
    };

    useEffect(() => {
        customerListApi()
    }, [page, searchValue])

    return (
        <Box>

            <Box className="indexBox">
                <TopBreaccrumb title={'Customers'} to={`/dashboard`} />
                <Grid container spacing={0}>
                    <Grid item xs={12}>
                        <Box sx={{ my: 3 }}>
                            <Stack direction={{ lg: "row", sm: "column" }} gap={2} alignItems={'center'} justifyContent={'space-between'}>
                                <Stack direction={{ lg: "row", sm: "column" }} gap={2} alignItems={'center'}>
                                    <SearchInput
                                        sx={{
                                            border: '1px solid #303067',
                                            borderRadius: '20px',
                                            height: '32.69px',
                                            '&.Mui-focused ': {
                                                border: '1px solid #6473ff'
                                            },
                                            width: { xs: "100%", sm: "340px" },
                                        }}
                                        value={searchKey || ''}
                                        onChange={e => onSearch(e)}
                                        cancelSearch={cancelSearch}
                                    />
                                    <Button className='AddBtn' onClick={handleClickOpen}>Add</Button>
                                </Stack>
                                {/* <FormControl sx={{ m: 1 }} size="small" className="directorySelect">
                                        <Select
                                            labelId="demo-select-small-label"
                                            id="demo-select-small"
                                            value={directoryPage}
                                            label="Age"
                                            onChange={handleChange}
                                        >
                                            <MenuItem value={'admin'}>Admin</MenuItem>
                                            <MenuItem value={'employee'}>Employee</MenuItem>
                                        </Select>
                                    </FormControl> */}
                            </Stack>

                        </Box>
                        <TableContainer className="rolesPageTable">
                            <Table>
                                <TableHeaders />

                                <TableBody>
                                    {stateValues.employeeListData?.loading ? (<TableRowsLoader rowsNum={10} colsNum={10} />) : (
                                        stateValues.employeeListData?.data?.data?.data?.map((item, i) => (
                                            <TableRow key={item.id}>
                                                <TableCell>{i + 1}</TableCell>
                                                <TableCell>{item.first_name}</TableCell>
                                                <TableCell>{item.last_name}</TableCell>
                                                <TableCell sx={{ textTransform: 'lowercase' }}>{item.email}</TableCell>
                                                <TableCell>+61{item.mobile}</TableCell>
                                                {/* <TableCell>{item.address}</TableCell>
                                                    <TableCell>{item.country}</TableCell>
                                                    <TableCell>{item.zip_code}</TableCell> */}
                                                <TableCell align="center">
                                                    <FormControlLabel
                                                        control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                                                        label=""
                                                        checked={item.is_approved}
                                                        onChange={(e) => handleCheck(item, e)}
                                                    /></TableCell>
                                                <TableCell align="center">
                                                    <Stack direction={'row'} gap={2}>
                                                        {/* <Link to={`/${role}/employees/${item.id}`} >
                                                                <VisibilityIcon className="table-icons" sx={{ color: "black" }} />
                                                            </Link> */}
                                                        <EditIcon className="table-icons" onClick={() => editDirectory(item)} />
                                                        <DeleteIcon className="table-icons"
                                                            onClick={() => deleteDirectory(item.id)} />

                                                    </Stack>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}


                                </TableBody>
                            </Table>

                        </TableContainer>
                        {stateValues.employeeListData?.data?.data?.data?.length === 0 ? <Box sx={{ my: 2 }}>
                            <Typography>No Data Found</Typography>
                        </Box> :
                            <TablePagination totalRecords={stateValues.employeeListData?.data?.data?.total} handlePageChanges={handlePageChanges}
                                page={page} />
                        }

                        {deleteModalOpen &&
                            <DeleteModal open={deleteModalOpen} close={() => deleteDirectoryModalClose()}
                                title={'Delete Employee'}
                                content={'Are you sure want to delete this employee?'}
                                submit={delteApiFn}
                                loading={stateValues.deleteLoading}
                            />
                        }

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
                                    <Box> {singleData ? "Edit Employee" : "Add Employee"}</Box>
                                    <IconButton onClick={handleClose}>
                                        <CloseIcon />
                                    </IconButton>
                                </Stack></DialogTitle>
                                <AddEmployeeForm onClick={handleButtonClick} initialData={singleData} type={addType} />
                            </Dialog>
                        ) : null}

                    </Grid>
                </Grid>
            </Box>


        </Box>
    )
}

export default Customers
