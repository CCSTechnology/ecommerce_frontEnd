/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Box, Container, Grid, Table, TableContainer, TableBody, TableRow, TableCell, TableHead, Typography, Dialog, DialogTitle, IconButton, TextField, InputLabel, } from "@mui/material";
import companyLogo from "assets/images/company-logo.svg";
import "./style.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { authEndPoints } from "helpers/endpoints";
import { useNavigate, useParams } from "react-router-dom";
import { errorAlert, successAlert } from "helpers/globalFunctions";
import { invoiceApproveData, invoiceMiscDeleteData, viewInvoiceData } from "redux/api/services/invoiceService";
import { useDispatch, useSelector } from "react-redux";
import InvoiceViewLoader from "components/TableLoader/invoiceViewLoader";
import TopBreaccrumb from "components/TopBreadcrumb";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Slide from '@mui/material/Slide';
import CloseIcon from '@mui/icons-material/Close';
import DeleteModal from "components/deleteModal";
import EditMiscForm from "../editMiscForm";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


function Notifications() {

  let { id } = useParams();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = React.useState(false);
  const [miscData, setMiscData] = useState(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [delid, setDelId] = useState(null)
  const role = localStorage.getItem("roleName");
  const imageUrl = process.env.REACT_APP_IMG_URL

  const deleteLoading = useSelector((state) => state.invoice.invoiceMiscDelete.loading)


  const handleClickOpen = (row) => {
    const data = {
      ...row,
      receipt: imageUrl + '/' + row.receipt[0]
    }
    setMiscData(data)
    setOpen(true);

  };
  const handleClose = () => {
    setOpen(false);
  };

  const invoiceViewData = useSelector((state) => state.invoice.viewInvoiceData)

  const viewInvoice = async () => {
    const parameters = {
      url: `${authEndPoints.invoice.invoiceView(id)}`,
    };
    try {
      await dispatch(viewInvoiceData(parameters)).unwrap();
    } catch (errors) {
      errorAlert(errors?.error);
    }
  };

  const approveInvoice = async () => {
    const parameters = {
      url: `${authEndPoints.invoice.approveInvoice(id)}`,
      status: "approved"
    };
    try {
      const response = await dispatch(invoiceApproveData(parameters)).unwrap();
      successAlert(response.message)
      navigate("/admin/invoice")
    } catch (errors) {
      errorAlert(errors?.error);
    }
  };

  const rejectInvoice = async () => {
    const parameters = {
      url: `${authEndPoints.invoice.approveInvoice(id)}`,
      status: "reject"
    };
    try {
      const response = await dispatch(invoiceApproveData(parameters)).unwrap();
      successAlert(response.message)
      navigate("/admin/invoice")
    } catch (errors) {
      errorAlert(errors?.error);
    }
  };

  // Delete Misc

  const deleteDirectoryModalClose = () => {
    setDeleteModalOpen(false);
  }

  const miscDelete = (id) => {
    setDelId(id)
    setDeleteModalOpen(true);
  }


  const delteApiFn = async (id) => {
    console.log(id);
    const parameters = {
      url: `${authEndPoints.invoice.miscDeleteInvoice(delid)}`,
    };
    try {
      const response = await dispatch(invoiceMiscDeleteData(parameters)).unwrap();
      successAlert(response.message);
      viewInvoice()

    } catch (errors) {
      errorAlert(errors?.error);
    }
  }



  useEffect(() => {
    viewInvoice()
  }, []);

  return (
    <Box sx={{ background: "#DDF1DE" }} className="indexBox">
      <TopBreaccrumb title={'Invoice View'} to={`/${role}/invoice`} />

      {invoiceViewData.loading ? <InvoiceViewLoader /> :
        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          <Grid
            item
            xs={12}
            sm={12}
            md={10}
            lg={10}
            sx={{ backgroundColor: "#fff", my: 4 }}
          >
            <Container>
              <Box>
                <Grid
                  container
                  spacing={3}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Grid>
                      <img className="logo-img" src={companyLogo} alt="logo" />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container justifyContent="flex-end" sx={{ paddingRight: { sm: 5 } }}>
                  <Typography className="bg-text-typ" sx={{ mt: "4px" }}>
                    Invoice Number : {invoiceViewData?.data?.data?.reference_no}
                  </Typography>
                </Grid>
                <Grid
                  container
                  xs={12}

                  sx={{
                    mt: 1,
                    border: "1px solid #979797",
                    minheight: "25px",
                    display: "flex",
                    borderBottom: 'none',
                  }}
                >
                  <Grid item xs={12} md={9} sm={9} lg={10} >
                    <Typography className="bg-title" sx={{ ml: 1, mt: "3px"}}>
                      {invoiceViewData?.data?.data?.user?.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={3} md={3} lg={2}  >
                    <Typography className="bg-text"  sx={{ mt: "5px",}}>
                      {/* Invoice date: {invoiceViewData?.data?.data?.created_at} */}
                      Invoice date: {new Date(invoiceViewData?.data?.data?.created_at).toLocaleDateString("en-GB")}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  container
                  xs={12}
                  sx={{
                    border: "1px solid #979797",
                    height: "25px",
                    display: "flex",
                  }}
                >
                  <Grid item xs={12} md={9}>
                    <Typography className="text-typ" sx={{ ml: 1, mt: "5px" }}>
                      {/* {invoiceViewData?.data?.data?.user?.address} */}
                      Email: {invoiceViewData?.data?.data?.user?.email}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    {/* <Typography className="bg-text" sx={{ mt: "5px" }}>
                      Due date: {invoiceViewData?.data?.data?.to_date}
                    </Typography> */}
                  </Grid>
                </Grid>
                <Grid container xs={12} sx={{ mt: 2 }}>
                  <Grid item xs={12} md={12}>
                    <Typography className="text-bill" sx={{ mt: "3px" }}>
                      BILL TO
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  container
                  xs={12}
                  sx={{
                    mt: 1,
                    border: "1px solid #979797",
                    height: "25px",
                    display: "flex",
                    borderBottom: 'none',
                  }}
                >
                  <Grid item xs={12} md={12}>
                    <Typography className="bg-text-typ" sx={{ ml: 1, mt: "3px" }}>
                      CLEAN GROUP
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  container
                  xs={12}
                  sx={{
                    border: "1px solid #979797",
                    height: "25px",
                    display: "flex",
                  }}
                >
                  <Grid item xs={12} md={12}>
                    <Typography className="bg-bill-id" sx={{ ml: 1, mt: "5px" }}>
                      AUSTRALIA
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={12} sx={{ mt: 4 }}>
                  <TableContainer className="taskTable">
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">SL.No</TableCell>
                          <TableCell align="center">Task Description</TableCell>
                          <TableCell align="center">Task Type</TableCell>
                          <TableCell align="center">Quantity</TableCell>
                          <TableCell align="center">Amount</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {invoiceViewData?.data?.data?.job.length === 0 ? (
                          <Box sx={{ my: 2, m: 2 }} justifyContent="center">
                            <Typography>No Data Found</Typography>
                          </Box>
                        ) :
                          (invoiceViewData?.data?.data?.job?.map((item, i) => (
                            <TableRow key={item.id}>
                              <TableCell align="center">{i + 1}</TableCell>
                              <TableCell align="center">{item.name}</TableCell>
                              <TableCell align="center">{item.type === "recurring" ? "Task" : "Quick Job"}</TableCell>
                              <TableCell align="center">{item.count}</TableCell>
                              <TableCell align="center">${item.amount}</TableCell>
                            </TableRow>
                          )))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>

                <Grid
                  container
                  justifyContent="flex-end"
                  sx={{ background: "rgba(95, 188, 97, 0.21)" }}
                >
                  <Stack direction={'row'} sx={{ pr: 3 ,pb:2}}>
                    <Typography className="bg-total">
                      Sub Total
                    </Typography>
                    <Typography className="bg-total">
                      : ${invoiceViewData?.data?.data?.total_amount}
                    </Typography>
                  </Stack>
                </Grid>



                <Grid container sx={{ background: "rgba(95, 188, 97, 0.21)" }}>
                  <Container>
                    <Grid item xs={12} md={12}>
                      {invoiceViewData?.data?.data?.expenses.length === 0 ? "" :
                        <>
                          <TableContainer className="billPageTable">
                            <Table aria-label="simple table">
                              <TableHead>
                                <TableRow>
                                  <TableCell align="center">Item</TableCell>
                                  <TableCell align="center">Quantity</TableCell>
                                  <TableCell align="center">Amount</TableCell>
                                  <TableCell align="center">Actions</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>

                                {invoiceViewData?.data?.data?.expenses?.map((row, index) =>

                                  <TableRow key={row.id}>
                                    <TableCell align="center">{row.item}</TableCell>
                                    <TableCell align="center">{row.qty}</TableCell>
                                    <TableCell align="center">${row.price}</TableCell>
                                    <TableCell align="center"  width={'25'}>
                                      <Stack direction={'row'} gap={2}>
                                        <EditIcon className="table-icons" onClick={() => handleClickOpen(row)} />
                                        <DeleteIcon className="table-icons" onClick={() => miscDelete(row.id)}
                                        />
                                      </Stack>
                                    </TableCell>
                                  </TableRow>
                                )}

                              </TableBody>
                            </Table>
                          </TableContainer>
                        </>
                      }
                    </Grid>
                  </Container>
                </Grid>
                <Grid
                  container
                  justifyContent="flex-end"
                  sx={{ background: "rgba(95, 188, 97, 0.21)" }}
                >
                  <Stack direction={'row'} sx={{ pr: 3 }}>
                    <Typography className="bg-total">
                      MISC
                    </Typography>
                    <Typography className="bg-total">
                      : ${invoiceViewData?.data?.data?.misc_total_amount}
                    </Typography>
                  </Stack>
                </Grid>

                <Grid
                  container
                  justifyContent="flex-end"
                  sx={{ background: "rgba(95, 188, 97, 0.21)" }}
                >
                  <Stack direction={'row'} sx={{ pr: 3 }}>
                    <Typography className="bg-total">
                      GST
                    </Typography>
                    <Typography className="bg-total">
                      : {invoiceViewData?.data?.data?.is_gst}%
                    </Typography>
                  </Stack>
                </Grid>
                <Grid
                  container
                  justifyContent="flex-end"
                  sx={{ background: "rgba(95, 188, 97, 0.21)" }}
                >
                  <Stack direction={'row'} sx={{ py: 2, pr: 3 }}>
                    <Typography className="bg-total">
                      Grant Total
                    </Typography>
                    <Typography className="bg-total">
                      : ${invoiceViewData?.data?.data?.grant_total}
                    </Typography>
                  </Stack>
                </Grid>

                <Grid container justifyContent="flex-end" sx={{ p: 2, }}>
                  {invoiceViewData?.data?.data?.status === "pending" ?
                    <Stack spacing={5} direction="row">
                      <Button variant="contained" sx={{ borderRadius: "10px", background: '#049457', width: '130px', height: '38px' }}
                        onClick={() => rejectInvoice()}>
                        Reject
                      </Button>
                      <Button variant="contained" sx={{ borderRadius: "10px", background: '#049457', width: '130px', height: '38px' }}
                        onClick={() => approveInvoice()}>
                        Approve
                      </Button>
                    </Stack> : ""}
                </Grid>

              </Box>
            </Container>
          </Grid>
        </Grid>
      }

      {
        open === true ? (
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
                <Box>
                  Edit MISC
                </Box>
                <IconButton onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              </Stack>
            </DialogTitle>
            <EditMiscForm invoiceMiscData={miscData} />
          </Dialog>
        ) : null
      }
      {deleteModalOpen &&
        <DeleteModal open={deleteModalOpen} close={() => deleteDirectoryModalClose()}
          title={'Delete Employee'}
          content={'Are you sure want to delete this employee?'}
          submit={delteApiFn}
          loading={deleteLoading}
        />
      }
    </Box >
  );
}

export default Notifications;
