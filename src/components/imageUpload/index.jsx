// import React from "react";
// import { useForm, Controller, useFieldArray } from "react-hook-form";
// import {
//   Avatar,
//   Box,
//   Button,
//   FormHelperText,
//   IconButton,
//   Stack,
//   Typography,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import AddIcon from "@mui/icons-material/Add";

// function ImageUploadComponent(props) {
//   const { label, Controller, control, name, error } = props;

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setValue(name, file);
//     }
//   };

//   const imageUrl = import.meta.env.REACT_APP_IMG_URL;

//   return (
//     <>
//       <Box>
//         <Typography variant="subtitle1">{label}</Typography>
//         <Stack direction="horizontal" gap={2} error={error}>
//           <Box>
//             <Button
//               variant="contained"
//               component="label"
//               endIcon={field.value ? <EditIcon /> : <AddIcon />}
//               sx={{ backgroundColor: "white", color: "#B2BEB5" }}
//             >
//               <Typography variant="">
//                 {field.value ? "Edit Image" : "Add Image"}
//               </Typography>
//               <input
//                 hidden
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageUpload}
//               />
//             </Button>
//           </Box>

//           {field.value && (
//             <Avatar
//               src={
//                 typeof field.value === "string"
//                   ? imageUrl + field.value
//                   : URL?.createObjectURL(field.value)
//               }
//             />
//           )}
//         </Stack>
//         <FormHelperText>{error}</FormHelperText>
//       </Box>
//     </>
//   );
// }
// export default ImageUploadComponent;
