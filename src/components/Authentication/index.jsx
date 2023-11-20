import React from "react";
import VerificationPage from "./verificationpage";
import { NearMeDisabledSharp } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { useSearchParams } from "react-router-dom";

const Authentication = () => {
	const [searchParams] = useSearchParams();
	const message = searchParams.get("message");
	return <VerificationPage message={message} />;
};

export default Authentication;
