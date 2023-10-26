/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
	Box,
	Grid,
	Stack,
	TableContainer,
	Table,
	TableRow,
	TableBody,
	TableCell,
	Button,
	Typography,
} from "@mui/material";
import TopBreaccrumb from "components/TopBreadcrumb";
import { useDebounce } from "use-debounce";
import SearchInput from "components/searchInput";
import { useNavigate } from "react-router-dom";
import TableHeader from "../tableHeader";
import { useDispatch, useSelector } from "react-redux";
import { deleteForm, formList } from "redux/api/services/formService";
import { errorAlert } from "helpers/globalFunctions";
import { authEndPoints } from "helpers/endpoints";
import TableRowsLoader from "components/TableLoader";
import dayjs from "dayjs";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteModal from "components/deleteModal";
import TablePagination from "components/Pagination";
import { toast } from "react-toastify";

function FormListComponent() {
	const dispatch = useDispatch();
	const [searchKey, setSearchKey] = useState("");
	const [searchValue] = useDebounce(searchKey, 1000);
	const [page, setPage] = useState(1);
	const [id, setId] = useState(null);
	const [formsData, setFormsData] = useState([]);
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const navigate = useNavigate();
	const role = localStorage.getItem("roleName");

	const formListData = useSelector((state) => state.form.formList)

	const handleClickOpen = () => {
		navigate(`/${role}/forms/add`);
	};

	// cancel search
	const cancelSearch = () => {
		setSearchKey("");
	};

	//on search
	const onSearch = (e) => {
		setSearchKey(e.target.value);
	};

	// formLis Api
	const formListApi = async () => {
		const parameter = {
			url: `${authEndPoints.form.formList}?per_page=10&page=${page}&search=${searchKey}`,
		};
		try {
			const response = await dispatch(formList(parameter)).unwrap();
			setFormsData(response.data);
		} catch (errors) {
			errorAlert(errors?.error);
		}
	};

	const handlePageChanges = (_event, pageValue) => {
		setPage(pageValue);
	};

	const editRole = (id) => { };

	const deleteRole = (id) => {
		setDeleteModalOpen(true);
		setId(id);
	};

	const deleteDirectoryModalClose = () => {
		setDeleteModalOpen(false);
	};

	const delteApiFn = async () => {
		try {
			const response = await dispatch(
				deleteForm({
					url: authEndPoints.form.deleteForm(id),
				})
			).unwrap();
			await formListApi();
			toast.success(response.message);
		} catch (errors) {
			errorAlert(errors?.error);
		}
	};

	useEffect(() => {
		formListApi();
	}, [page, searchValue]);

	return (
		<Box className="indexBox">
			<TopBreaccrumb title={"Forms"} to={`/${role}/dashboard`} />
			<Box sx={{ my: 3 }}>
				<Stack direction={{ lg: "row", md: 'row', sm: 'column' }} gap={2} alignItems={"center"}>
					<Box>
						<SearchInput
							sx={{
								border: "1px solid #303067",
								borderRadius: "20px",
								height: "32.69px",
								"&.Mui-focused ": {
									border: "1px solid #6473ff",
								},
								width: { xs: "100%", sm: "340px" },
							}}
							value={searchKey || ""}
							onChange={(e) => onSearch(e)}
							cancelSearch={cancelSearch}
						/>
					</Box>
					<Box>
						<Button className="AddBtn" onClick={handleClickOpen}>
							Create Form
						</Button>
					</Box>
				</Stack>
			</Box>
			<Grid container spacing={2} sx={{ my: 3 }}>
				<Grid item sm={12} xs={12} md={5}>
					<TableContainer className="rolesPageTable">
						<Table>
							<TableHeader />
							<TableBody>
								{formListData.loading ? (
									<TableRowsLoader rowsNum={5} colsNum={3} />
								) : (
									formListData?.data?.data?.data?.map((row, i) => (
										<TableRow key={row.id}>
											<TableCell>{row.name}</TableCell>
											<TableCell>
												{dayjs(row.created_at).format("DD/MM/YYYY")}
											</TableCell>
											<TableCell align="center">
												<Stack direction={"row"} gap={2}>
													<EditIcon
														className="table-icons"
														onClick={() => {
															editRole(row);
															navigate(`/${role}/forms/edit/${row.id}`);
														}}
													/>
													<DeleteIcon
														className="table-icons"
														onClick={() => deleteRole(row.id)}
													/>
												</Stack>
											</TableCell>
										</TableRow>
									))
								)}
							</TableBody>
						</Table>
					</TableContainer>
					{formListData?.data?.data?.data?.length === 0 ? <Box sx={{ my: 2 }}>
						<Typography>
							No Data Found
						</Typography>
					</Box> :
						<TablePagination
							totalRecords={formListData?.data?.data?.total}
							handlePageChanges={handlePageChanges}
							page={page}
						/>}

					{deleteModalOpen && (
						<DeleteModal
							open={deleteModalOpen}
							close={() => deleteDirectoryModalClose()}
							title={"Delete Form"}
							content={"Are you sure want to delete this form?"}
							submit={delteApiFn}
						/>
					)}
				</Grid>
			</Grid>
		</Box>
	);
}

export default FormListComponent;
