/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Table,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Drawer,
} from "@mui/material";
import { Page, Pagejob } from "helpers/images";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { authEndPoints } from "helpers/endpoints";
import { jobCalenderList } from "redux/api/services/jobService";
import { errorAlert } from "helpers/globalFunctions";
import JobCardLoader from "components/TableLoader/jobCardLoader";
import dayjs from "dayjs";
import DrawerForm from "../tasks/drawerForm";
import { Select, MenuItem } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SearchInput from "components/searchInput";
import { useDebounce } from "use-debounce";

const jobcalendar = ({onClick}) => {
  const dispatch = useDispatch();
  const jobListData = useSelector((state) => state.job.jobCalenderList);
  const role = localStorage.getItem("roleName");
  const [day, setDay] = useState("week");
  const [dateRange, setDateRange] = useState([dayjs().format("YYYY-MM-DD"), dayjs().add(2, 'month').format("YYYY-MM-DD")]);
  const [startDate, endDate] = dateRange;
  const [searchKey, setSearchKey] = useState("");
  const [searchValue] = useDebounce(searchKey, 1000);
  const [filterJob, setFilterJob] = useState("All")
  const [jobUpdate, setJobUpdate] = useState("")

  const handleChange = (event) => {
    setDay(event.target.value);
  };

  const [drawer, setDrawer] = useState({
    open: false,
    type: null,
    taskId: null,
    date: dayjs(),
  });

  //list api
  const jobCalenderListApi = async () => {
    const parameters = {
      url: `${authEndPoints.job.jobCalenderList}?start_date=${startDate}&end_date=${endDate}&search=${searchKey}&type=${startDate || endDate ? '' : day}&job_type=${jobUpdate}`,
    };
    try {
      await dispatch(jobCalenderList(parameters)).unwrap();
    } catch (errors) {
      errorAlert(errors?.error);
    }
  };

  // cancel search
  const cancelSearch = () => {
    setSearchKey("");
  };

  //on search
  const onSearch = (e) => {
    setSearchKey(e.target.value);
  };

  const handleTask = (event) => {
    setFilterJob(event.target.value);
    setJobUpdate(event.target.value);
  };

  useEffect(() => {
    jobCalenderListApi();
  }, [searchValue, day, dateRange, jobUpdate]);



  return (
    <Box>
      <Stack
        direction={{ xs: "column", sm: "column", md: "row" }}
        flexGrow={1}
        justifyContent="space-between"
        gap={2}
        sx={{
          border: "1px solid #d8d7d7;",
          p: 1,
          borderRadius: "10px",
          background: "#5FBC61",
        }}
      >
        <Grid item md={2} className="calenderSearch">
          <SearchInput
            sx={{
              border: "1px solid #ffff",
              borderRadius: "20px",
              height: "32.69px",
              "&.Mui-focused ": {
                border: "1px solid #ffff",
              },
              width: { xs: "100%", sm: "100%", md: "165px", lg: "340px" },
            }}
            value={searchKey || ""}
            onChange={(e) => onSearch(e)}
            cancelSearch={cancelSearch}
          />
        </Grid>

        <Stack
          direction="row"
          display="flex"
          flexDirection={{ xs: "column", sm: "column", md: "row" }}
          justifyContent={"space-between"}
          gap={2}
        >
          <Stack direction={{ lg: "row", sm: "row" }} gap={{ xs: 2, sm: 3, md: 2 }} justifyContent="space-between">
            <Stack direction={{ xs: "column", sm: 'row', md: 'row', lg: 'row' }} gap={2} justifyContent="space-between">
              <Box>
                <Select
                  sx={{ width: { xs: "100%", sm: "100%", md: "100px", lg: "120px" } }}
                  className="custom-select"
                  fullWidth
                  value={filterJob}
                  defaultValue=""
                  size="small"
                  // label="All"
                  onChange={handleTask}
                >
                  <MenuItem value={"All"}>All</MenuItem>
                  <MenuItem value={"recurring"}>Task</MenuItem>
                  <MenuItem value={"quick"}>Quick Job</MenuItem>
                </Select>
              </Box>
              <Box className="custom-select-wrapper">
                <Select
                  sx={{ width: { xs: "100%", sm: "140px", md: "100px", lg: "120px" } }}
                  className="custom-select"
                  fullWidth
                  value={day}
                  size="small"
                  onChange={handleChange}
                >
                  <MenuItem value={"week"}>Week</MenuItem>
                  <MenuItem value={"month"}>Month</MenuItem>
                </Select>
              </Box>

              <Box className="datepicker-wrapper">
                <DatePicker
                  selectsRange={true}
                  startDate={startDate ? dayjs(startDate).toDate() : ""}
                  endDate={endDate ? dayjs(endDate).toDate() : ""}
                  onChange={(update) => {
                    setDateRange([
                      update[0] ? dayjs(update[0]).format("YYYY-MM-DD") : "",
                      update[1] ? dayjs(update[1]).format("YYYY-MM-DD") : "",
                    ]);
                  }}
                  placeholderText="Start date - End date"
                  isClearable={true}
                  className="custom-datepicker"
                  onKeyDown={(e) => e.preventDefault()}
                />
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </Stack>

      <Box sx={{ my: 5 }}>
        <Grid container>
          <Grid item xs={12}>
            {jobListData.loading ? (
              <JobCardLoader />
            ) : (
              <TableContainer className="calendertable">
                <Table
                  stickyHeader
                  aria-label="simple table"
                  style={{ tableLayout: "fixed" }}
                >

                  <TableHead>
                    <TableRow>
                      <TableCell align="center" className="bg-stickyHeader">
                        Employee Name
                      </TableCell>
                      {jobListData?.data?.data?.header.map((header, i) => (
                        <TableCell align="center">
                          {dayjs(header?.date).format("DD/MM/YYYY")}
                          <Stack
                            direction={"row"}
                            gap={2}
                            justifyContent={"center"}
                            alignItems={"center"}
                            sx={{ mt: 1 }}
                          >
                            <Box>
                              {/* <img src={Clock} /> */}
                              {/* <Typography sx={{ fontSize: 12 }}>
                                {header?.total_hours.slice(0, 2)}
                              </Typography> */}
                            </Box>
                            <Box>
                              <img src={Pagejob} />
                              <Typography sx={{ fontSize: 12 }}>
                                {header?.job}
                              </Typography>
                            </Box>
                            <Box>
                              {/* <img src={Persons} /> */}
                              {/* <Typography sx={{ fontSize: 12 }}>
                                {header?.emmployee}
                              </Typography> */}
                            </Box>
                          </Stack>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  {jobListData?.data?.data?.row ?
                    <TableBody>
                      {jobListData?.data?.data.row.map((rowData, i) => (
                        <TableRow>
                          <TableCell
                            className="sticky"
                            component="th"
                            scope="row"
                          >
                            {rowData?.name}
                          </TableCell>
                          {rowData?.job?.map((jobDataArray, i) => (
                            <TableCell align="left">
                              <Box sx={{ height: "100px", overflow: "auto" }}>
                                {jobDataArray.map((jobData, i) => (
                                  <Box>
                                    {jobData.id ? (
                                      <Box
                                        component={"div"}
                                        onClick={() => {
                                          setDrawer({
                                            taskId: jobData.id,
                                            type: "readOnly",
                                            open: true,
                                          });
                                        }}
                                        sx={{
                                          background: jobData?.type === 'quick' ? "#C19393" : "#5FBC61",
                                          mb: 2,
                                          p: 1,
                                          color: "white",
                                          borderLeft: "8px solid black",
                                          borderRadius: "5px",
                                          cursor: "pointer",
                                        }}
                                      >
                                        <Typography
                                          variant="caption"
                                          display="block"
                                          gutterBottom
                                        >
                                          {jobData?.name}
                                        </Typography>
                                        <Typography
                                          variant="caption"
                                          display="block"
                                          gutterBottom
                                        >
                                          {jobData?.address}
                                        </Typography>
                                      </Box>
                                    ) : (
                                      <Box className="calenderAddJob">
                                        {role === "admin" && (
                                          <Box
                                            className="calenderAddBttn"
                                            component={"div"}
                                            onClick={() => {
                                              setDrawer((prev) => ({
                                                ...prev,
                                                open: true,
                                                type: "add",
                                                date: dayjs(jobData.date),
                                              }));
                                            }}
                                          >
                                            +
                                          </Box>
                                        )}
                                      </Box>
                                    )}
                                  </Box>
                                ))}
                              </Box>
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody> :
                    <Box sx={{ my: 2 }}>
                      <Typography>No data found</Typography>
                    </Box>
                  }
                  {drawer.open && (
                    <Drawer
                    onClick={onClick}
                      className="taskListDrawer"
                      anchor={"right"}
                      open={drawer}
                      onClose={() => {
                        setDrawer({
                          open: false,
                          taskId: null,
                          type: null,
                          date: dayjs(),
                        });
                      }}
                    >
                      <DrawerForm
                     onChange={onClick}
                        date={drawer.date}
                        handleRefetch={() => {
                          setDrawer({
                            open: false,
                            taskId: null,
                            type: null,
                            date: dayjs(),
                          });
                          jobCalenderListApi();
                        }}
                        readOnly={drawer.type === "readOnly" ? true : false}
                        disabled={drawer.type === "readOnly" && true}
                        type={drawer.type}
                        taskId={drawer.taskId}
                      />
                    </Drawer>
                  )}
                </Table>
              </TableContainer>
            )}
          </Grid>

        </Grid>
      </Box>
    </Box>
  );
};

export default jobcalendar;
