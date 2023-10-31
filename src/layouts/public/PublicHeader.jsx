import {MenuItem, Tooltip, Button, Avatar, Container, Menu, Typography, IconButton, Toolbar, Box, AppBar, Drawer } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import * as React from 'react';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

function TemporaryDrawer({handleSearchDrawer, open}) { 

    return (
      <React.Fragment key={"1"}>
            <Button onClick={()=>handleSearchDrawer()}>{open}</Button>
            <Drawer
              anchor={open}
              open={open}
              onClose={()=>handleSearchDrawer()}
            >
             Helo
            </Drawer>
          </React.Fragment>
    );
  }

const pages = ['Products', 'Contact Us', 'About Us'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const icons = [{
    label : "Search",
    icon : <SearchIcon />
}, {
    label : "Cart",
    icon : <ShoppingBagIcon />
}, {
    label : "location",
    icon : <FmdGoodIcon />
}]

function PublicHeader({ content, options }) {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [searchDrawer, setSearchDrawer] = React.useState(null)

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleSearchDrawer = (event) => {
      setSearchDrawer((state)=> state ? null : "top");
  };


    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static" sx={{
            background: "white"
        }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{
                        width: "70px",
                        height: "40px",
                        display: { xs: 'none', md: 'flex' },
                        "& img": {
                            height: "100%",
                            width: "100%"
                        }
                    }}  >
                        <img src={content.logo} alt={"logo"} />
                    </Box>


                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none', color: "black" } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center" sx={{
                                        color: "black"
                                    }}>{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>


                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent :"center" }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'black', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>
                    <Box sx={{ flexGrow: 2, display: { xs: 'none', md: 'flex' }, justifyContent :"end", }}>
                        {icons.map((icon, index) => (
                            <Button
                                key={index}
                                onClick={handleSearchDrawer}
                                sx={{ my: 2, color: 'black', display: 'block' }}
                            >
                                {icon.icon}
                            </Button>
                        ))}
                    </Box>


                    <Box sx={{ flexGrow: 0, textAlign : "end" }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp"  />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    {/* {
                      searchDrawer && <TemporaryDrawer handleSearchDrawer={handleSearchDrawer} open={searchDrawer} />
                    } */}
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default PublicHeader;