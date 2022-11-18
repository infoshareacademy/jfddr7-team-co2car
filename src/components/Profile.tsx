import { VertBarChart } from "./VertBarChart";
import {
  Container,
  Typography,
  Box,
  ListItem,
  IconButton,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { useEffect, useContext, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { firebaseDb } from "..";
import { Wrapper } from "./styles/Wrapper.styles";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { Context } from "./../ContextProvider";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";
import "../i18n";

interface Trip {
  date: string;
  emission: number;
  owner: string;
}

export const Profile = () => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const { username } = useContext(Context);
  const [elements, setElements] = useState<Trip[]>([]);
  const { totalEmission, setTotalEmission } = useContext(Context);

  const deleteLabel = {
    title: `${t("delete")}`,
  };

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
            {t("myData")}
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
                    <Tooltip {...deleteLabel} placement="right" arrow>
                      <IconButton edge="end" aria-label="delete">
                        <DeleteIcon style={{ color: "#62757f" }} />
                      </IconButton>
                    </Tooltip>
                  }
                >
                  {i18n.resolvedLanguage === "en" && (
                    <ListItemText
                      style={{ color: "#62757f", fontSize: "0.9rem" }}
                      primary={`On ${el.date} my car emitted ${el.emission} kg of CO₂`}
                    />
                  )}
                  {i18n.resolvedLanguage === "pl" && (
                    <ListItemText
                      style={{ color: "#62757f", fontSize: "0.9rem" }}
                      primary={`Dnia ${el.date} mój samochód wyemitował ${el.emission} kg CO₂`}
                    />
                  )}
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
            {t("annualAmount")} {totalEmission} kg
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
