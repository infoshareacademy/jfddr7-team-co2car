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
      light: "#ff8a50",
      main: "#ff5722",
      dark: "#c41c00",
      contrastText: "#000000",
    },
  },
});

export default theme;
