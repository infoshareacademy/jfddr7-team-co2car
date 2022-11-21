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
import { doc, deleteDoc } from "firebase/firestore";
import { useTranslation } from "react-i18next";
import "../i18n";

interface Trip {
  date: string;
  emission: number;
  owner: string;
  id: string;
}

export const Profile = () => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const { username } = useContext(Context);
  const { totalEmission, setTotalEmission } = useContext(Context);
  const [elements, setElements] = useState<Trip[]>([]);
  const [reloader, setReloader] = useState(false);

  const deleteLabel = {
    title: `${t("delete")}`,
  };

  const deleteTrip = async (tripId: string): Promise<void> => {
    try {
      await deleteDoc(doc(firebaseDb, "Trips", tripId));
    } catch (error) {
      console.log(error);
    }
    setReloader(!reloader);
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
          const { date, emission, owner, id } = el.data();
          tmpArr.push({ date, emission, owner, id });
          // console.log(tmpArr);
          // console.log(el.data());
        });
        setElements(tmpArr);
        let emiSum: number = 0;
        tmpArr.forEach((el) => {
          return (emiSum += el.emission);
        });
        // console.log(emiSum);
        setTotalEmission(emiSum.toFixed(2));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [reloader]);
  //stan aktualizuje się po wykonaniu funkcji fetchData()
  // console.log(totalEmission);
  // console.log(elements);

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
            <div
              style={{
                height: "200px",
                overflowY: "auto",
                maxWidth: "525px",
                margin: "0 auto",
              }}
            >
              {elements.map((el, index) => (
                <ListItem
                  key={index}
                  disablePadding={true}
                  secondaryAction={
                    <Tooltip {...deleteLabel} placement="right" arrow>
                      <IconButton
                        onClick={() => {
                          deleteTrip(el.id);
                        }}
                        edge="end"
                        aria-label="delete"
                      >
                        <DeleteIcon style={{ color: "#62757f" }} />
                      </IconButton>
                    </Tooltip>
                  }
                >
                  <div style={{ width: "90%" }}>
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
                  </div>
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
          <Box style={{ marginBottom: "3em" }}>
            <VertBarChart />
          </Box>
        </Box>
      </Container>
      <Footer />
    </Wrapper>
  );
};

export default Profile;
