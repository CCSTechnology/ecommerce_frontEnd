import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import { headerSearch } from '../../redux/api/public/homeService';
import { Box, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';




export default function Asynchronous() {
    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = React.useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [options, setOptions] = React.useState([]);
    const loading = useSelector((state) => state.home.headerSearch.loading)
    async function getGlobalSearch(text) {
        try {
            const response = await dispatch(headerSearch({
                search: text,
            })).unwrap()
            console.log(response, "res")
            setOptions(response)
        } catch (error) {
            console.log(error, "getGlobalSearch")
        }
    }

    React.useEffect(() => {
        if (search) {
            getGlobalSearch(search)
        }
    }, [search])

    return (
        <Autocomplete
            id="asynchronous-demo"
            fullWidth
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            isOptionEqualToValue={(option, value) => option.label === value.label}
            getOptionLabel={(option) => option.label}
            options={options}
            loading={loading}
            onChange={(e, option) => {
                const value = option?.value || null
                if (value) {
                    navigate(`/product/${value}`)
                }
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    value={search}
                    onChange={(e) => {
                        e.preventDefault()
                        setSearch(e.target.value)
                    }}
                    placeholder='Search'
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <Box sx={{
                                ".MuiInputBase-root": {
                                    paddingRight: "0px"
                                }
                            }}>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {/* <IconButton onClick={(e)=>{
                                    e.preventDefault()
                                    navigate('/product/'+ search)
                                }}>
                                    <SearchIcon />
                                </IconButton> */}
                                {params.InputProps.endAdornment}
                            </Box>
                        ),
                    }}
                />
            )}
        />
    );
}