import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#439889",
      main: "#00695c",
      dark: "#003d33",
      contrastText: "#ffffff",
    },
    secondary: {
      light: "#a2cf6e",
      main: "#8bc34a",
      dark: "#618833",
      contrastText: "#000000",
    },
  },
});

export default theme;
