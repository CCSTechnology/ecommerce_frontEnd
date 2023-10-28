import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { CircularProgress } from "@mui/material";
import { LoadingButton } from "@mui/lab";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

function DeleteModal({ open, close, title, content, submit, loading }) {



	const handleDelete = async () => {
		await submit();
		await close();
	};

	return (
		<Dialog
			open={open}
			TransitionComponent={Transition}
			keepMounted
			onClose={close}
			aria-describedby="alert-dialog-slide-description">
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-slide-description">{content}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={close} style={{color:"white"}}>Cancel</Button>
				<LoadingButton
					loadingPosition="center"
					loading={loading}
					variant="contained"
					type="submit"
					onClick={handleDelete}
					className="submitBtnn">
					Delete
				</LoadingButton>
			</DialogActions>
		</Dialog>
	);
}

export default DeleteModal;
