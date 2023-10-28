import React from 'react'
import { Grid, Container, Box, Typography, Skeleton, Table, TableContainer, TableBody, TableRow, TableCell, TableHead, } from '@mui/material'

function InvoiceViewLoader() {
    return (
        <Grid
            container
            spacing={2}
            sx={{ my: 4 }}
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
                                    <Skeleton variant="circular" width={40} height={40} />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container justifyContent="flex-end" sx={{ pr: 5 }}>
                            <Typography className="bg-text-typ" sx={{ mt: "4px" }}>
                                <Skeleton />
                            </Typography>
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
                            <Grid item xs={9} md={9}>
                                <Skeleton />
                            </Grid>
                            <Grid item xs={3} md={3}>
                                <Skeleton />
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
                            <Grid item xs={9} md={9}>
                                <Skeleton />
                            </Grid>
                            <Grid item xs={3} md={3}>
                                <Skeleton />
                            </Grid>
                        </Grid>
                        <Grid container xs={12} sx={{ mt: 2 }}>
                            <Grid item xs={12} md={12}>
                                <Skeleton />
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
                                <Skeleton />
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
                                <Skeleton />
                            </Grid>
                        </Grid>
                        <Grid container xs={12} sx={{ mt: 4 }}>
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
                                <Grid item xs={9} md={9}>
                                    <Skeleton />
                                </Grid>
                                <Grid item xs={3} md={3}>
                                    <Skeleton />
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
                                    <Skeleton />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={12} sx={{ mt: 4 }}>
                            <TableContainer className="taskTable">
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">  <Skeleton /></TableCell>
                                            <TableCell align="center">  <Skeleton /></TableCell>
                                            <TableCell align="center">  <Skeleton /></TableCell>
                                            <TableCell align="center">  <Skeleton /></TableCell>
                                            <TableCell align="center">  <Skeleton /></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="center"> <Skeleton /></TableCell>
                                            <TableCell align="center"> <Skeleton /></TableCell>
                                            <TableCell align="center"> <Skeleton /></TableCell>
                                            <TableCell align="center"> <Skeleton /></TableCell>
                                            <TableCell align="center"> <Skeleton /></TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                        <Box sx={{ my: 2 }}>
                            <Skeleton />
                            <Skeleton />
                            <Skeleton />
                        </Box>
                    </Box>
                </Container>
            </Grid>
        </Grid >
    )
}

export default InvoiceViewLoader