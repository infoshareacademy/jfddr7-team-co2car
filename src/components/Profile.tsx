import { VertBarChart } from "./VertBarChart";
import {
  Container,
  Typography,
  Box,
  ListItem,
  IconButton,
  Avatar,
  ListItemAvatar,
  ListItemText,
  Tooltip,
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
import { useTranslation } from "react-i18next";
import "../i18n";

interface Trip {
  date: string;
  emission: number;
  owner: string;
}

export const Profile = () => {
  const { t } = useTranslation();
  const { username } = useContext(Context);
  const [elements, setElements] = useState<Trip[]>([]);
  //const [totalEmission, setTotalEmission] = useState<number | string>(0);
  const { totalEmission, setTotalEmission } = useContext(Context);
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
        let emiSum: number = 0;
        tmpArr.forEach((el) => {
          return (emiSum += el.emission);
        });
        console.log(emiSum);
        setTotalEmission(emiSum.toFixed(2));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  //stan aktualizuje się po wykonaniu funkcji fetchData()
  console.log(totalEmission);
  console.log(elements);

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
            sx={{
              width: "100%",
              height: "400",
              maxWidth: 650,
              bgcolor: "background.paper",
            }}
          >
            <div style={{ height: "200px", overflowY: "auto" }}>
              {elements.map((el, index) => (
                <ListItem
                  key={index}
                  disablePadding={true}
                  secondaryAction={
                    <Tooltip title="Delete" placement="right" arrow>
                      <IconButton edge="end" aria-label="delete">
                        <DeleteIcon style={{ color: "#62757f" }} />
                      </IconButton>
                    </Tooltip>
                  }
                >
                  <ListItemText
                    style={{ color: "#62757f", fontSize: "0.9rem" }}
                    primary={`The amount of emission from the trip made in a day ${el.date} is ${el.emission} kg`}
                  />
                </ListItem>
              ))}
            </div>
          </Box>
          <Typography
            variant="h6"
            padding={3}
            textAlign="center"
            color="primary.main"
            paddingTop="2em"
          >
            The amount of your car's annual carbon emission is {totalEmission}{" "}
            kg
          </Typography>
          <Box style={{ marginBottom: "3em", paddingRight: "4em" }}>
            <VertBarChart />
          </Box>
        </Box>
      </Container>
      <Footer />
    </Wrapper>
  );
};

export default Profile;
