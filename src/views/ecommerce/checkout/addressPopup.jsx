import CloseIcon from '@mui/icons-material/Close';
import { Divider } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { useSelector } from 'react-redux';

const AddressComponent = React.memo(function AddressMemoComponents({ address, user, setUser, setOpen }) {
  return <AddressWrapper onClick={(e)=>{
    e.preventDefault()
    const dat = {
      id: address?.id || null,
      same_address: 1,
      country: address?.country || "",
      state: address?.state || "",
      city: address?.city || "",
      street_name: address?.street_name || "",
      line1: address?.line1 || "",
      zipcode: address?.zipcode || "",
      address: address?.address || "",
  }
  setUser((state)=>({
    ...state,
    ...dat
  }))
  setOpen(false)
  }}>
    <Box sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems : "center",
    }}>
      <span>{address.type}</span>
      {
        user?.id === address?.id && <Box sx={{
          color: "red"
        }}>Selected Address</Box>
      }

    </Box>
    <div>
      <span>{address.line1}</span>{' '}
      <span>{address.street_name}</span>{' '}
    </div>
    <div>
      <span>{address.state}</span>
      <span>{address.country}</span>
      <span>{address.zipcode}</span>
    </div>
  </AddressWrapper>
})


export default React.memo(function AddressPopup({ user, setUser }) {
  const userState = useSelector((state) => state.publicAuth.publicGetMe.data)
  const [open, setOpen] = React.useState(false);
  const [userData, setUserData] = React.useState(userState)
  const userAddress = userData?.addresses || []

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    if (userState) {
      setUserData(userState)
    }
  }, [userState])

  return (
    <React.Fragment>
      <Button variant="text" onClick={handleClickOpen}>
        Choose Address
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="address-popup"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="address-popup">
          Choose Address
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContentStyled dividers>
          {
            userAddress?.map((address, index) => {
              return <React.Fragment key={index}>
                <AddressComponent address={address} user={user} setUser={setUser} setOpen={setOpen} />
                {index !== userAddress.length && <Divider />}
              </React.Fragment>
            })
          }
        </DialogContentStyled>
      </BootstrapDialog>
    </React.Fragment>
  )
})





const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));


const DialogContentStyled = styled(DialogContent)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "10px"
}));


const AddressWrapper = styled(Box)`
  width: 500px;
  border-radius: 10px;
  cursor: pointer;
  padding: 20px;
`