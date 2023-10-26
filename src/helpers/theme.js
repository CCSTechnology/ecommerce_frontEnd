import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  	palette: {
    	primary: {
      		main: "#1f8c3a",
    	},
  	},
  	typography: {
  		h4:{
  			fontSize: 28,
  		}
  	}
});

export {
    theme
}