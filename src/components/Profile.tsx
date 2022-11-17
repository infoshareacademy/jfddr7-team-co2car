import { Container, Typography, Box } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/Styles";
import { useEffect, useContext } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { firebaseDb } from "..";
import { Wrapper } from "./styles/Wrapper.styles";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { Context } from "./../ContextProvider";

export const Profile = () => {
  //   const { username } =  useContext(Context);
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try{
  //         const q = query(collection(firebaseDb, "Trips"), where("owner", "==", username));
  // const myData = await getDocs(q)
  // myData.forEach(()=>{

  // })
  //       }
  //     };
  //     fetchData();
  //   }, []);

  return (
    <Wrapper>
      <Navigation />
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
            My Data
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
            The amount of your car's annual carbon emission
          </Typography>
          <Box>Miejsce na komponent z wykresem</Box>
        </Box>
      </Container>
      <Footer />
    </Wrapper>
  );
};

export default Profile;
