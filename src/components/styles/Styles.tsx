import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#48a890",
      main: "#006e52",
      dark: "#004c39",
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
