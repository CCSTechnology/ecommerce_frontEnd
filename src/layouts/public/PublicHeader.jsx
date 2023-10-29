import * as React from 'react';
import { Autocomplete, TextField, MenuItem, Tooltip, Button, Avatar, Container, Menu, Typography, IconButton, Toolbar, Box, AppBar } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';



const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function PublicHeader({ content, options }) {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
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
                    {/* <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Autocomplete
                            freeSolo
                            // id="free-solo-2-demo"
                            // disableClearable
                            fullWidth
                            options={options.map((option) => option.title)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    fullWidth
                                    InputProps={{
                                        ...params.InputProps,
                                        type: 'search',
                                    }}
                                />
                            )}
                        />
                    </Box> */}


                    <Box sx={{ flexGrow: 1, textAlign : "end" }}>
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
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default PublicHeader;