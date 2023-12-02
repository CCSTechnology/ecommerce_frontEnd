import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { styled } from '@mui/material';
import { Link } from 'react-router-dom';



// const breadcrumbs = [
//     <Link underline="hover" key="1" color="inherit" href="/"
//     >
//         MUI
//     </Link>,
//     <Link
//         underline="hover"
//         key="2"
//         color="inherit"
//         href="/"
//     >
//         Core
//     </Link>,
//     <Typography key="3" color="text.primary">
//         Breadcrumb
//     </Typography>,
// ];

export default function CustomBreadcrumbs({ breadcrumbs }) {


    return (
        <CustomBreadcrumbsWrapper spacing={2} display={'flex'} alignItems={"start"} >
            <StyledBreadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb"
            >
                {breadcrumbs.map((breadcrumb) => {
                    return breadcrumb?.link ? <Link to={breadcrumb.link}>{breadcrumb.label}</Link> : <Typography key="3" color="text.primary">
                        {breadcrumb.label}
                    </Typography>
                })}
            </StyledBreadcrumbs>
        </CustomBreadcrumbsWrapper>
    );
}

const CustomBreadcrumbsWrapper = styled(Stack)(({ theme }) => ({
    height: "80px",
}))


const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({

    "& .MuiBreadcrumbs-ol": {
        height: "80px",
    },
    padding: "0px 20px"
}))