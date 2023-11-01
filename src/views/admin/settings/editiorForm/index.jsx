import React, { useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import { Controller, get, useFieldArray, useForm } from "react-hook-form";
import TextFormField from "../../../../components/reusableFormFields/TextField";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { authEndPoints } from "../../../../helpers/endpoints";
import { errorAlert, successAlert } from "../../../../helpers/globalFunctions";
import {
  ContentAddAboutus,
  ContentViewAboutus,
} from "../../../../redux/api/admin/settingService";

function EditorForm(props) {
  const { contentHome } = props;
  console.log(contentHome);
  const dispatch = useDispatch();
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: contentHome?.data,
    mode: "onChange",
  });
  const handleAddContent = async (values) => {
    if (editorRef.current) {
      const data = editorRef.current.getContent();
      values.data = data;
      // Now you can include `editorContent` in your `values` object or handle it as needed.
    }
    console.log(values);
    const parameters = {
      url: `${authEndPoints.setting.addContent}`,
      data: values,
    };
    try {
      const response = await dispatch(ContentAddAboutus(parameters)).unwrap();
      successAlert(response.message);
    } catch (error) {
      errorAlert(error.error);
      console.log(errors);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleAddContent)}>
      <Box sx={{ mx: 2 }}>
        <Grid container spacing={5} sx={{ mb: 2 }}>
          <Grid item xs={6} direction={"column"}>
            <TextFormField
              name="title"
              control={control}
              Controller={Controller}
              label="Title"
              error={errors?.title?.message}
            />
          </Grid>
        </Grid>
        <Grid container spacing={5} sx={{ mb: 2 }}>
          <Grid item xs={6} direction={"column"}>
            <TextFormField
              name="subtitle"
              control={control}
              Controller={Controller}
              label="Sub Title"
              error={errors?.subtitle?.message}
            />
          </Grid>
        </Grid>
        <Grid container spacing={5} sx={{ mb: 2 }}>
          <Grid item xs={6} direction={"column"}>
            <TextFormField
              name="type"
              control={control}
              Controller={Controller}
              label="Type"
              error={errors?.url?.message}
            />
          </Grid>
        </Grid>
        <Grid container spacing={5} sx={{ mb: 2 }}>
          <Grid item xs={6} direction={"column"}>
            <Editor
              apiKey="your-api-key"
              onInit={(evt, editor) => (editorRef.current = editor)}
              initialValue="<p>Online Document Editor.</p>"
              init={{
                height: 500,
                menubar: false,
                plugins:
                  "powerpaste casechange searchreplace autolink directionality advcode visualblocks visualchars image link media mediaembed codesample table charmap pagebreak nonbreaking anchor tableofcontents insertdatetime advlist lists checklist wordcount tinymcespellchecker editimage help formatpainter permanentpen charmap tinycomments linkchecker emoticons advtable export print autosave",
                toolbar:
                  "undo redo print spellcheckdialog formatpainter | blocks fontfamily fontsize | bold italic underline forecolor backcolor | link image addcomment showcomments  | alignleft aligncenter alignright alignjustify lineheight | checklist bullist numlist indent outdent | removeformat",
                height: "700px",
                toolbar_sticky: true,
                icons: "thin",
                skin: "material-classic",
                icons: "material",
                content_style: "material-classic",
              }}
            />
            <button onClick={log}>Log editor content</button>
          </Grid>
        </Grid>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={5}
          sx={{ p: 3 }}
        >
          <LoadingButton
            loadingPosition="center"
            loading={isSubmitting}
            variant="contained"
            type="submit"
            className="submitBtnn"
          >
            Submit
          </LoadingButton>
        </Stack>
      </Box>
    </form>
  );
}

export default EditorForm;
