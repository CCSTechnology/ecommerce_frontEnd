import {
    TextField,
} from "@mui/material"

export const InputField = ({
    name,
    type,
    label,
    errors,
    touched,
    values,
    setFieldValue,
    getFieldMeta,
    InputProps,
    ...others
}) => {
    return (
        <TextField
            fullWidth
            name={name}
            id={name}
            InputProps={InputProps}
            className={name === "webusername" ? "d-none" : ""}
            value={values[name]}
            label={label}
            type={type ? type : "text"}
            error={touched[name] && Boolean(errors[name])}
            helperText={touched[name] && errors[name]}
            {...others}
        />
    )
}
