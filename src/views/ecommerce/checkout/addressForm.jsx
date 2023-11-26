import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid , Box} from '@mui/material';
import MobileField from '../../../components/reusableFormFields/TextField/mobileField';
import { FormInputText } from '../../../components/formField/TextField';
import { LoadingButton } from '@mui/lab';

export default function AddressPopUp({ AddressForm, open, setOpen, submit }) {
    const { handleSubmit, reset, control, formState: { isSubmitting, errors } } = AddressForm

    const inputs = React.useMemo(() => {
        return [{
            name: "name",
            label: "Name",
            show: true,
        }, {
            name: "cart_id",
            label: "Cart Id",
            show: false,
        }, {
            name: "phone_number",
            label: "Phone Number",
            type: "number",
            show: true,
        },
        {
            name: "same_address",
            label: "Same Address",
            type: "switch",
            show: true,
        },
        {
            name: "email",
            type: "email",
            label: "Email",
            show: true,
        }, {
            name: "country",
            label: "Country",
            show: true,
        }, {
            name: "state",
            label: "state",
            show: true,
        }, {
            name: "city",
            label: "City",
            show: true,
        }, {
            name: "street_name",
            label: "Area",
            show: true,
        }, {
            name: "line1",
            label: "Street Details",
            show: true,
        }, {
            name: "zipcode",
            label: "pincode",
            show: true,
        }, {
            name: "address",
            label: "Address",
            show: false,
        }]
    }, [])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Dialog open={open} onClose={handleClose} component={'form'} onSubmit={handleSubmit(submit)}>
                <DialogTitle>Please Fill Address</DialogTitle>
                <DialogContent>
                    <Grid container spacing={3}>
                        {
                            inputs.map((input, index) => {
                                const { type, name, show, label } = input
                                switch (type) {
                                    case 'phone':
                                        return <Grid item span={6} key={index}>
                                            <MobileField
                                                name={name}
                                                control={control}
                                                label="Mobile"
                                                error={errors?.phone_number?.message}
                                            // InputProps={{
                                            //     startAdornment: <InputAdornment position="start">+61</InputAdornment>,
                                            // }}
                                            />
                                        </Grid>
                                    default:
                                        return <Grid item lg={6} key={index}>
                                            <FormInputText control={control} name={name} label={label} />
                                        </Grid>
                                }
                            })
                        }
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Add Address</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
