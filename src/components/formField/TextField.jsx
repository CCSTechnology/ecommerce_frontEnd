// src/form-component/FormInputText.tsx
import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";


export const FormInputText = ({ name, control, label, value, onChange, error }) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({
                // field: { onChange, value },
                // fieldState: { error },
                // formState,
                field
            }) => (
                <TextField
                    {...field}
                    inputRef={field.ref}
                    helperText={error}
                    size="small"
                    placeholder={label}
                    error={error}
                    // onChange={onChange}
                    // value={value}
                    fullWidth
                    label={label}
                    variant="outlined"
                // inputRef={field.ref}
                />
            )}
        />
    );
};