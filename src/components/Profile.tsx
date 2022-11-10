import { Container, Typography, Box } from "@mui/material";

export const Profile = () => {
  return (
    <Container maxWidth="md">
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        margin={"auto"}
      >
        <Typography variant="h5" padding={3} textAlign="center">
          Moje dane, fetch z Firebase, też możbna go zrobic jako sobny komponent
        </Typography>
        <Box sx={{ width: 200, height: 100 }}>Tu miejsce na tabelkę</Box>
        <Typography variant="h6" padding={3} textAlign="center">
          Wielkośc rocznej emisji dwutlenku węgla z twojego samochodu
        </Typography>
        <Box>Miejsce na komponent z wykresem</Box>
      </Box>
    </Container>
  );
};

export default Profile;
