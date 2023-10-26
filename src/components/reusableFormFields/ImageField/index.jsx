import React from 'react';
import { Avatar, Box, Button, IconButton, Stack, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useController } from 'react-hook-form';

function ImageFieldComponent(props) {
    const { label, Controller, control, name, setValue } = props;
    const { field } = useController({ name: name, control: control });

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            field.onChange([file]); // Set the value as an array
        }
    };

    const getObjectUrl = (file) => {
        if (file instanceof File) {
            return URL.createObjectURL(file);
        }
        return '';
    };

    return (
        <>
            <Box>
                <Typography variant="subtitle1">{label}</Typography>
                <Stack direction={'horizontal'} gap={2}>
                    <Box>
                        <Button variant="" component="label"
                            sx={{ backgroundColor: "white", color: "#B2BEB5" }}
                        >
                            <Typography variant="">{field.value ? 'Add Image' : 'Add Image'}</Typography>
                            <input hidden type="file" accept="image/*" onChange={handleImageUpload} />
                        </Button>
                    </Box>
                    {field.value && field.value[0] && (
                        <Avatar src={getObjectUrl(field.value[0])} />
                    )}
                    {field.value && field.value[0] && (
                        <IconButton onClick={() => setValue(name, [])}>
                            <DeleteIcon className="delete-icons" />
                        </IconButton>
                    )}
                </Stack>
            </Box>
        </>
    );
}

export default ImageFieldComponent;
