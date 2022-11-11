import { Container, Typography, Box } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/Styles";

export const Profile = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          margin={"auto"}
        >
          <Typography
            color="primary.main"
            variant="h5"
            padding={3}
            textAlign="center"
          >
            Moje dane
          </Typography>
          <Box sx={{ width: 200, height: 100 }}>
            Tu miejsce na tabelkę - fetch z Firebase, też można go zrobic jako
            sobny komponent
          </Box>
          <Typography
            variant="h6"
            padding={3}
            textAlign="center"
            color="primary.main"
          >
            Wielkośc rocznej emisji dwutlenku węgla z twojego samochodu
          </Typography>
          <Box>Miejsce na komponent z wykresem</Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Profile;
