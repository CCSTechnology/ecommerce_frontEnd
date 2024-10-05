import React from "react";
import SuccessError from "../../../components/reusableFormFields/success";
import { Box, Button, Container } from "@mui/material";
import Faliure from "../../../assets/images/failure.png";
import { Link } from "react-router-dom";

const Error = ({ title }) => {
  return (
    <Container
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box>
        <SuccessError title={"Faliure Payment"} path={Faliure} />
        <Box
          sx={{
            marginTop: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Link to="/" className="link">
            <Button
              style={{ fontSize: "15px", fontWeight: 600, color: "#951e76" }}
              className="email-verify"
            >
              Redirect to Home
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default Error;

// import React from "react";
// import { Form, CloseButton } from "react-bootstrap";
// import { Controller } from "react-hook-form";

// const CustomSelectBox = ({ index, control, errors, products }) => {
//   return (
//     <Form.Group
//       controlId={`products.${index}.selectcategory`}
//       className="select-group"
//     >
//       <Form.Label>Select Option</Form.Label>
//       <Controller
//         name={`products.${index}.selectcategory`}
//         control={control}
//         render={({ field }) => (
//           <div style={{ position: "relative" }}>
//             <Form.Select
//               {...field}
//               isInvalid={!!errors?.products?.[index]?.selectcategory}
//               className="custom-select"
//               style={{ paddingRight: field.value ? "2.5rem" : "1rem" }}
//             >
//               <option value="">Select Category</option>
//               <option value="1">One</option>
//               <option value="2">Two</option>
//               <option value="3">Three</option>
//             </Form.Select>
//             {field.value && (
//               <button
//                 type="button"
//                 className="close-icon"
//                 onClick={() => field.onChange("")}
//                 style={{
//                   position: "absolute",
//                   top: "50%",
//                   right: "0.5rem",
//                   transform: "translateY(-50%)",
//                   background: "transparent",
//                   border: "none",
//                   padding: "0",
//                   cursor: "pointer",
//                 }}
//               >
//                 <CloseButton />
//               </button>
//             )}
//           </div>
//         )}
//       />
//       <Form.Control.Feedback type="invalid">
//         {errors?.products?.[index]?.selectcategory?.message}
//       </Form.Control.Feedback>
//     </Form.Group>
//   );
// };

// export default CustomSelectBox;
