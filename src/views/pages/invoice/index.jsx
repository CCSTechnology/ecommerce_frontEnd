import React, { useEffect, useState } from "react";
import { Box, Stack, TableContainer, Table, TableBody, TableRow, TableCell, FormControlLabel, Typography, Dialog, IconButton, DialogTitle } from "@mui/material";
import TopBreaccrumb from "components/TopBreadcrumb";
import { useDebounce } from 'use-debounce';
import SearchInput from 'components/searchInput'
import TableHeader from "./tableHeader";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import TablePagination from "components/Pagination";
import { invoiceList, invoicePdfDownloadData } from "redux/api/services/invoiceService";
import { useDispatch, useSelector } from "react-redux";
import { authEndPoints } from "helpers/endpoints";
import { errorAlert } from "helpers/globalFunctions";
import TableRowsLoader from "components/TableLoader";
import DownloadIcon from '@mui/icons-material/Download';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { Link } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { AddIcon, AddnewIcon } from "helpers/images";
import AddMiscForm from "./addMiscForm";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const Tasks = () => {

    const [searchKey, setSearchKey] = useState('');
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const [searchValue] = useDebounce(searchKey, 1000);
    const [page, setPage] = useState(1);
    const [invoiceMiscData, setInvoiceMiscData] = useState(null)

    const invoiceListData = useSelector((state) => state.invoice.invoiceList)
    const role = localStorage.getItem("roleName");

    // cancel search
    const cancelSearch = () => {
        setSearchKey('');
    };

    //pagination

    const handlePageChanges = (_event, pageValue) => {
        setPage(pageValue);
    }


    const handleClickOpen = (row) => {
        setInvoiceMiscData(row)
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    //on search
    const onSearch = e => {
        setSearchKey(e.target.value);
    };

    //list api
    const invoiceListApi = async () => {
        const parameters = {
            url: `${authEndPoints.invoice.invoiceList}?per_page=10&page=${page}&search=${searchKey}`,
        };
        try {
            await dispatch(invoiceList(parameters)).unwrap();
        } catch (errors) {
            errorAlert(errors?.error);
        }
    };

    //pdf downloadapi
    const pdfDownload = async (id) => {
        console.log(id);
        const parameters = {
            url: `${authEndPoints.invoice.pdfInvoice(id)}`,
        };
        try {
            await dispatch(invoicePdfDownloadData(parameters)).unwrap();
        } catch (errors) {
            errorAlert(errors?.error);
        }
    };


    useEffect(() => {
        invoiceListApi()
    }, [page, searchValue])


    return (
        <Box className="indexBox">
            <TopBreaccrumb title={'Invoice'} to={`/${role}/dashboard`} />
            <Box sx={{ my: 3 }}>
                <Stack direction={{ lg: "row", sm: "column" }} gap={2} alignItems={"center"}>
                    <Box>
                        <SearchInput
                            sx={{
                                border: '1px solid #303067',
                                borderRadius: '20px',
                                height: '32.69px',
                                width: { xs: "100%", sm: "340px" },
                                '&.Mui-focused ': {
                                    border: '1px solid #6473ff',
                                },

                            }}
                            value={searchKey || ''}
                            onChange={e => onSearch(e)}
                            cancelSearch={cancelSearch}
                        />
                    </Box>
                </Stack>
            </Box>
            <TableContainer className="rolesPageTable">
                <Table>
                    <TableHeader />
                    <TableBody>
                        {invoiceListData.loading ? (
                            <TableRowsLoader rowsNum={10} colsNum={8} />
                        ) : (
                            invoiceListData?.data?.data?.data.map((row, i) => (
                                <TableRow key={row.id}>
                                    <TableCell>{new Date(row.from_date).toLocaleDateString("en-GB")} - {new Date(row.to_date).toLocaleDateString("en-GB")}</TableCell>
                                    <TableCell>{row.user_name}</TableCell>
                                    <TableCell>{row.reference_no}</TableCell>
                                    {/* <TableCell>{row.month}</TableCell>
                                    <TableCell>{row.month}</TableCell> */}
                                    <TableCell>${row.grant_total}</TableCell>
                                    <TableCell>{row.status}</TableCell>
                                    <TableCell align="center" width={'25'}>
                                        <Stack direction={'row'} gap={2}>
                                            <DownloadIcon className="table-icons" onClick={() => pdfDownload(row.id)} />
                                            <Link to={`/${role}/invoiceView/${row.id}`}>
                                                <RemoveRedEyeIcon className="table-icons" sx={{ color: 'black' }} />
                                            </Link>
                                            <img src={AddIcon} height="17px" className="table-icons" sx={{ color: 'black' }} onClick={() => handleClickOpen(row)} />{" "}
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            {invoiceListData?.data?.data?.data.length === 0 ?
                <Box sx={{ my: 2 }}>
                    <Typography>No Data Found</Typography>
                </Box> :
                <TablePagination totalRecords={invoiceListData?.data?.data?.total} handlePageChanges={handlePageChanges}
                    page={page} />}


            {open === true ? (
                <Dialog
                    fullWidth={true}
                    maxWidth={'md'}
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"

                >
                    <DialogTitle><Stack direction={'row'}
                        alignItems={'center'} justifyContent={'space-between'}>
                        <Box>Add MISC</Box>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Stack></DialogTitle>
                    <AddMiscForm onClose={handleClose} invoiceData={invoiceMiscData} />
                </Dialog>
            ) : null}
        </Box>
    )
}

export default Tasks;