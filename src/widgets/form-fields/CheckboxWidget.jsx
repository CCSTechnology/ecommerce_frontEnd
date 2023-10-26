import React from "react";
import { Grid, TextField, Checkbox, List, ListItem, IconButton  } from '@mui/material';
import AddSharpIcon from '@mui/icons-material/AddSharp';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const CheckboxWidget = (props) => {
    return (
            <Grid
			  	container
			  	direction="row"
			  	justifyContent="flex-start"
			  	alignItems="flex-start">
			  	<Grid item xs={5}>
			  		<TextField
				        id="standard-helperText"
				        label="Label"
				        variant="standard"
				        fullWidth
				    />
			  	</Grid>
			  	<Grid item xs={5}>
			      	<List>
						<ListItem
		                  	secondaryAction={
		                    	<IconButton edge="end" aria-label="add"><AddSharpIcon /></IconButton>
		                  	}>
			                <TextField
					          label="Options"
					          id="outlined-size-small"
					          variant="standard"
					        />
	                	</ListItem>
			  		</List>				  		
			  	</Grid>
			  	<Grid item xs={2}>
			  		<Checkbox
			        	{...label}						        	
			        	sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
			      	/>
			  	</Grid>
			</Grid>
    )
}

export default CheckboxWidget;