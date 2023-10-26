import React from 'react'
import { Table, TableContainer, TableBody, TableRow, TableCell, TableHead, Stack, Skeleton } from "@mui/material";

function JobCardLoader() {
    return (
        <TableContainer className="calendertable">
            <Table
                stickyHeader
                aria-label="simple table"
                style={{ tableLayout: "fixed" }}
            >
                <TableHead>
                    <TableRow>
                        <TableCell align="center" className="bg-stickyHeader">
                            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                        </TableCell>
                        <TableCell align="center">
                            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                            <Stack direction={"row"} gap={2} justifyContent={'center'} alignItems={'center'} sx={{ mt: 1 }}>
                                <Skeleton variant="circular" width={20} height={20} />
                                <Skeleton variant="circular" width={20} height={20} />
                                <Skeleton variant="circular" width={20} height={20} />
                            </Stack>
                        </TableCell>
                        <TableCell align="center">
                            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                            <Stack direction={"row"} gap={2} justifyContent={'center'} alignItems={'center'} sx={{ mt: 1 }}>
                                <Skeleton variant="circular" width={20} height={20} />
                                <Skeleton variant="circular" width={20} height={20} />
                                <Skeleton variant="circular" width={20} height={20} />
                            </Stack>
                        </TableCell>
                        <TableCell align="center">
                            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                            <Stack direction={"row"} gap={2} justifyContent={'center'} alignItems={'center'} sx={{ mt: 1 }}>
                                <Skeleton variant="circular" width={20} height={20} />
                                <Skeleton variant="circular" width={20} height={20} />
                                <Skeleton variant="circular" width={20} height={20} />
                            </Stack>
                        </TableCell>
                        <TableCell align="center">
                            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                            <Stack direction={"row"} gap={2} justifyContent={'center'} alignItems={'center'} sx={{ mt: 1 }}>
                                <Skeleton variant="circular" width={20} height={20} />
                                <Skeleton variant="circular" width={20} height={20} />
                                <Skeleton variant="circular" width={20} height={20} />
                            </Stack>
                        </TableCell>
                        <TableCell align="center">
                            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                            <Stack direction={"row"} gap={2} justifyContent={'center'} alignItems={'center'} sx={{ mt: 1 }}>
                                <Skeleton variant="circular" width={20} height={20} />
                                <Skeleton variant="circular" width={20} height={20} />
                                <Skeleton variant="circular" width={20} height={20} />
                            </Stack>
                        </TableCell>
                        <TableCell align="center">
                            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                            <Stack direction={"row"} gap={2} justifyContent={'center'} alignItems={'center'} sx={{ mt: 1 }}>
                                <Skeleton variant="circular" width={20} height={20} />
                                <Skeleton variant="circular" width={20} height={20} />
                                <Skeleton variant="circular" width={20} height={20} />
                            </Stack>
                        </TableCell>
                        <TableCell align="center">
                            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                            <Stack direction={"row"} gap={2} justifyContent={'center'} alignItems={'center'} sx={{ mt: 1 }}>
                                <Skeleton variant="circular" width={20} height={20} />
                                <Skeleton variant="circular" width={20} height={20} />
                                <Skeleton variant="circular" width={20} height={20} />
                            </Stack>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell
                            className="sticky"
                            component="th"
                            scope="row"
                        ><Skeleton variant="rounded" height={60} /></TableCell>
                        <TableCell align="left"><Skeleton variant="rounded" height={60} /></TableCell>
                        <TableCell align="left">
                            <Skeleton variant="rounded" height={60} />
                        </TableCell>
                        <TableCell align="left"><Skeleton variant="rounded" height={60} /></TableCell>
                        <TableCell align="left"><Skeleton variant="rounded" height={60} /></TableCell>
                        <TableCell align="left"><Skeleton variant="rounded" height={60} /></TableCell>
                        <TableCell align="left"><Skeleton variant="rounded" height={60} /></TableCell>
                        <TableCell align="left"><Skeleton variant="rounded" height={60} /></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell
                            className="sticky"
                            component="th"
                            scope="row"
                        ><Skeleton variant="rounded" height={60} /></TableCell>
                        <TableCell align="left"><Skeleton variant="rounded" height={60} /></TableCell>
                        <TableCell align="left">
                            <Skeleton variant="rounded" height={60} />
                        </TableCell>
                        <TableCell align="left"><Skeleton variant="rounded" height={60} /></TableCell>
                        <TableCell align="left"><Skeleton variant="rounded" height={60} /></TableCell>
                        <TableCell align="left"><Skeleton variant="rounded" height={60} /></TableCell>
                        <TableCell align="left"><Skeleton variant="rounded" height={60} /></TableCell>
                        <TableCell align="left"><Skeleton variant="rounded" height={60} /></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell
                            className="sticky"
                            component="th"
                            scope="row"
                        ><Skeleton variant="rounded" height={60} /></TableCell>
                        <TableCell align="left"><Skeleton variant="rounded" height={60} /></TableCell>
                        <TableCell align="left">
                            <Skeleton variant="rounded" height={60} />
                        </TableCell>
                        <TableCell align="left"><Skeleton variant="rounded" height={60} /></TableCell>
                        <TableCell align="left"><Skeleton variant="rounded" height={60} /></TableCell>
                        <TableCell align="left"><Skeleton variant="rounded" height={60} /></TableCell>
                        <TableCell align="left"><Skeleton variant="rounded" height={60} /></TableCell>
                        <TableCell align="left"><Skeleton variant="rounded" height={60} /></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default JobCardLoader