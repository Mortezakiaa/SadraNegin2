import { createTheme  } from '@material-ui/core';
import { indigo } from '@material-ui/core/colors';

export const mainTheme = createTheme ({
    palette: {
        primary: { main : indigo[900] },
        secondary:{ main : indigo[700] },
    },
    typography: {
        fontFamily: [
            'Almarai',
            'Roboto',
            'sans-serif',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            '"Helvetica Neue"',
            'Arial',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
    
})