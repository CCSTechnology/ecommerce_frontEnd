/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Box, TableContainer, Table, TableBody, TableRow, TableCell, Stack, Button, Dialog, IconButton, Typography } from '@mui/material'
import TableRowsLoader from 'components/TableLoader'
import TableHeader from './tableHeader'
import SearchInput from 'components/searchInput'
import { useDebounce } from 'use-debounce';
import { authEndPoints } from "helpers/endpoints";
import { useDispatch, useSelector } from "react-redux"
import { deleteDirectoryData, directoryList } from "redux/api/services/directoryService";
import { errorAlert, successAlert } from 'helpers/globalFunctions'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TablePagination from 'components/Pagination'
import DeleteModal from 'components/deleteModal'
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import CloseIcon from '@mui/icons-material/Close';
import AddDirectoryForm from '../addDirectoryform'
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from 'react-router-dom'

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Employees from 'views/pages/employees/list'
import TopBreaccrumb from 'components/TopBreadcrumb'
import { categoryList, categoryListDatas, deleteCategoryData } from 'redux/api/services/categoryService'
import AddCategoryForm from '../addCategoryform'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function CategoryList() {

    const [open, setOpen] = React.useState(false);
    const [delid, setDelId] = useState(null)
    const [searchKey, setSearchKey] = useState('');
    const [searchValue] = useDebounce(searchKey, 1000);
    const [page, setPage] = useState(1);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [singleData, setSingleData] = useState(null)
    const [addType, setAddType] = useState(null)
    const dispatch = useDispatch()
    const categoryListData = useSelector((state) => state.category.categoryList)
    const [directoryPage, setDirectoryPage] = useState('admin');
    // const role = localStorage.getItem("roleName");

    const stateValues = useSelector((state) => {
        return {
            deleteLoading: state.category.deleteCategory.loading
        }
    })

    // cancel search
    const cancelSearch = () => {
        setSearchKey('');
    };

    //on search
    const onSearch = e => {
        setSearchKey(e.target.value);
    };

    //list api
    const categoryListApi = async () => {
        const parameters = {
            url: `${authEndPoints.directory.list}?per_page=10&page=${page}`,
        };
        try {
            await dispatch(categoryListDatas(parameters)).unwrap();
        } catch (errors) {
            errorAlert(errors?.error);
        }
    };

    const handlePageChanges = (_event, pageValue) => {
        setPage(pageValue);
    }


    const handleClickOpen = () => {
        setSingleData(null)
        setOpen(true);
        setAddType("add")
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

    const delteApiFn = async () => {

        const parameters = {
            url: `${authEndPoints.category.removeCategory(delid)}`,
        };
        try {
            const response = await dispatch(deleteCategoryData(parameters)).unwrap();
            // setDeleteModalOpen(false);
            successAlert(response.message);
            categoryListApi()
        } catch (errors) {
            errorAlert(errors?.error);

        }
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleButtonClick = async () => {
        handleClose(); // Call handleClose to close the form
        await categoryListApi(); // Call handleAddDirectory to add directory data
    };

    const handleChange = (event) => {
        setDirectoryPage(event.target.value);
    };

    useEffect(() => {
        categoryListApi()
    }, [page, searchValue])


    return (
        <Box>
            
                <Box className="indexBox">
                    <TopBreaccrumb title={'Categories'} to={`/dashboard`} />
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
                            {/* <FormControl size="small" className="directorySelect">
                                <Select
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    value={directoryPage}
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
                            <TableHeader />
                            <TableBody>
                                {categoryListData?.loading ? (
                                    <TableRowsLoader rowsNum={10} colsNum={9} />
                                ) : (
                                    categoryListData?.data?.data?.data?.map((row, i) => (

                                        <TableRow key={row.id}>
                                            <TableCell>{i + 1}</TableCell>
                                            <TableCell>{row.unique_label}</TableCell>
                                            <TableCell>{row.label}</TableCell>
                                            <TableCell>description</TableCell>
                                       
                                          
                                            <TableCell align="center">
                                                <Stack direction={'row'} gap={2}>
                                                    <Link to={`/category/${row.unique_label}`} >
                                                        <VisibilityIcon className="table-icons" sx={{ color: "black" }} />
                                                    </Link>

                                                    <EditIcon className="table-icons" onClick={() => editDirectory(row)} />
                                                    <DeleteIcon className="table-icons"
                                                        onClick={() => deleteDirectory(row.id)} />
                                                </Stack>
                                            </TableCell>

                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {categoryListData?.data?.data?.data?.length === 0 ? <Box sx={{ my: 2 }}>
                        <Typography>No Data Found</Typography>
                    </Box> :
                        <TablePagination totalRecords={categoryListData?.data?.data?.total} handlePageChanges={handlePageChanges}
                            page={page} />
                    }
                    {deleteModalOpen &&
                        <DeleteModal open={deleteModalOpen} close={() => deleteDirectoryModalClose()}
                            title={'Delete Category'}
                            content={'Are you sure want to delete this category?'}
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
                            <DialogTitle>
                                <Stack direction={'row'}
                                    alignItems={'center'} justifyContent={'space-between'}>
                                    <Box> {singleData ? "Edit Directory" : "Add Directory"}
                                    </Box>
                                    <IconButton onClick={handleClose}>
                                        <CloseIcon />
                                    </IconButton>
                                </Stack>
                            </DialogTitle>
                                <AddCategoryForm onClick={handleButtonClick} initialData={singleData} type={addType} />
                        </Dialog>
                    ) : null}
                </Box> 
        </Box>
    )
}

export default CategoryList