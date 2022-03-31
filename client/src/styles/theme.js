import { createTheme } from "@mui/material/styles";
import { orange } from "@mui/material/colors";
/* Apple San Francisco Pro font */
import SFProDisplayRegular from "./fonts/SF-Pro-Display-Regular.woff2";
// import SFProDisplayMedium from "./fonts/SF-Pro-Display-Medium.woff2";
// import FilsonSoftRegular from "./fonts/Filson-Soft-W03-Regular.woff2";

const theme = createTheme({
  typography: {
    // add font-family name in array
    fontFamily: ["sf_pro_display_regular", "Roboto"].join(","),
    // sample code to add variant
    // poster: {
    //   color: "red",
    //   fontFamily: "filson_soft_regular",
    // },
    button: {
      fontWeight: 600,
      fontSize: "1em",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 785, // Mobile
      lg: 870, // FHD
      xl: 1300, // QHD
    },
  },
  palette: {
    hOrange: {
      main: orange[500],
      contrastText: "#fff",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `        
      @font-face {
          font-family: 'sf_pro_display_regular';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: url(${SFProDisplayRegular}) format('woff2');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }`,
      // sample code to add font-family
      // , `
      // @font-face {
      //     font-family: 'filson_soft_regular';
      //     font-style: normal;
      //     font-display: swap;
      //     font-weight: 400;
      //     src: url(${FilsonSoftRegular}) format('woff2');
      //     unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
      //   }`
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: orange[500],
          "&.Mui-checked": {
            color: orange[500],
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& label.Mui-focused": {
            color: orange[500],
          },
          "& .MuiOutlinedInput-root": {
            "&:hover fieldset": {
              borderColor: orange[400],
            },
            "&.Mui-focused fieldset": {
              borderColor: orange[500],
            },
          },
        },
      },
    },
  },
});

export default theme;
