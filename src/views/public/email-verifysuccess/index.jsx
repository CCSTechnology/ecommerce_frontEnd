import React from "react";
import { Grid } from "@mui/material";
import { logo } from "../../../helpers/images";
import ImageComponent from "../../../components/Images";
import EmailForm from "../../../components/reusableFormFields/EmailForm";
import Img1 from "../../../assets/images/email.png";

const Email = (props) => {
  let { message } = useParams();
  console.log(message);
  return (
    <Grid container spacing={2} alignItems={"center"}>
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        lg={6}
        className="text-center-cls authLogo"
      >
        <ImageComponent src={logo} alt="logo" />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <EmailForm
          title={"Email Verified Successfully"}
          path={Img1}
          url={"emailverification"}
        />
      </Grid>
    </Grid>
  );
};

export default Email;
