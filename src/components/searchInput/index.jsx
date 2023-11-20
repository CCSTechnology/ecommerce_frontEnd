import * as React from 'react';
import InputBase from '@mui/material/InputBase';
import Grid from '@mui/material/Grid';
import SearchIcon from '@mui/icons-material/Search';
import { Close } from '@mui/icons-material';
import './style.css';
import { IconButton } from '@mui/material';

export default function SearchInput(props) {
    const { value, onChange, cancelSearch, sx, disabled } = props;
    return (
        <InputBase
            disabled={disabled}
            placeholder="Search"
            className="inputSearch"
            fullWidth
            value={value || ''}
            inputProps={{
                autoComplete: 'off'
            }}
            sx={sx}
            onChange={onChange}
            startAdornment={
                <Grid sx={{ paddingLeft: '5px' }}>
                    <SearchIcon />
                </Grid>
            }
            endAdornment={
                <Grid sx={{ paddingRight: '5px' }}>
                    {value ? (
                        <Close onClick={cancelSearch} sx={{ cursor: 'pointer' }} />
                    ) : (
                        ''
                    )}
                </Grid>
            }
        />
    );
}
