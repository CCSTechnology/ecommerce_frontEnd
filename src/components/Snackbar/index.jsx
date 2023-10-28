import { Button, IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";

const Toast = (props) => {
	const { open, handleClick, message } = props;

	const action = (
		<React.Fragment>
			<Button color="secondary" size="small" onClick={handleClick}>
				UNDO
			</Button>
			<IconButton size="small" aria-label="close" color="inherit" onClick={handleClick}>
				<CloseIcon fontSize="small" />
			</IconButton>
		</React.Fragment>
	);

	return (
		<div>
			<Snackbar open={open} autoHideDuration={6000} onClose={handleClick} message={message} action={action} />
		</div>
	);
};

export default Toast;
