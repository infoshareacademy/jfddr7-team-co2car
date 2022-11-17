import {
  Container,
  Typography,
  Box,
  ListItem,
  IconButton,
  Avatar,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/Styles";
import { useEffect, useContext, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { firebaseDb } from "..";
import { Wrapper } from "./styles/Wrapper.styles";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { Context } from "./../ContextProvider";
import DeleteIcon from "@mui/icons-material/Delete";
import FolderIcon from "@mui/icons-material/Folder";

interface Trip {
  date: string;
  emission: number;
  owner: string;
}

export const Profile = () => {
  const { username } = useContext(Context);
  const [elements, setElements] = useState<Trip[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(
          collection(firebaseDb, "Trips"),
          where("owner", "==", username)
        );
        const myData = await getDocs(q);
        const tmpArr: Trip[] = [];
        myData.forEach((el) => {
          const { date, emission, owner } = el.data();
          tmpArr.push({ date, emission, owner });
        });
        setElements(tmpArr);
        console.log(elements);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <Wrapper>
      <Navigation />
      <Container className="mainContent" maxWidth="md">
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          margin={"auto"}
          marginTop={"2em"}
          justifyContent={"space-between"}
        >
          <Typography
            color="primary.main"
            variant="h5"
            padding={3}
            textAlign="center"
          >
            My Data
          </Typography>
          <Box
            sx={{ width: "40em" }}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            {elements.map((el, index) => (
              <ListItem
                key={index}
                disablePadding={true}
                secondaryAction={
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon style={{ color: "#62757f" }} />
                  </IconButton>
                }
              >
                <ListItemText
                  style={{ color: "#62757f", fontSize: "0.9rem" }}
                  primary={`The amount of emission from the trip made in a day ${el.date} is ${el.emission} kg`}
                  // secondary={secondary ? "Secondary text" : null}
                />
              </ListItem>
            ))}
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
