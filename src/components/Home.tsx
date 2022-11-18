import { FC, useState, useEffect, useContext } from "react";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
  Typography,
  Box,
  SelectChangeEvent,
  Tooltip,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { firebaseDb } from "..";
import { doc, setDoc } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { Context } from "./../ContextProvider";
import { BarChart } from "./BarChart";
import { Wrapper } from "./styles/Wrapper.styles";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { useTranslation } from "react-i18next";
import "../i18n";

interface Date {
  day: number;
  month: number;
  year: number;
}

interface SingleCar {
  make: string;
  makeId: string;
  model?: string;
  modelId?: string;
}

interface ApiCarMake {
  data: {
    attributes: {
      name: string;
      number_of_models?: number;
      vehicle_make?: string;
      year?: number;
    };
    id: string;
    type: string;
  };
}

const emptyCar: SingleCar = {
  make: "",
  makeId: "",
  model: "",
  modelId: "",
};

export const Home: FC = () => {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const { t } = useTranslation();
  const { username, trip, setTrip, emission, setEmission } =
    useContext(Context);
  const [vehicleMakes, setVehicleMakes] = useState<SingleCar[]>([emptyCar]);
  const [vehicleModels, setVehicleModels] = useState<SingleCar[]>([emptyCar]);
  const [chosenMake, setChosenMake] = useState("");
  const [chosenModel, setChosenModel] = useState("");
  const [distance, setDistance] = useState(0);
  const [date, setDate] = useState<Dayjs | null>(null);

  const distanceLabel = {
    label: `${t("distanceLabel")}`,
  };
  const tooltipLabel = {
    title: `${t("tooltip")}`,
  };

  useEffect(() => {
    return () => {
      setEmission(0);
    };
  }, []);

  const handleChangeMake = (e: SelectChangeEvent<string>) => {
    setChosenMake(e.target.value);
  };

  const handleChangeModel = (e: SelectChangeEvent<string>) => {
    setChosenModel(e.target.value);
  };

  const handleDistance = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDistance(Number(e.target.value));
  };

  const sortedMakes = () => {
    return vehicleMakes.sort((a, b) => {
      if (a.make && b.make) {
        const model1 = a.make.toUpperCase();
        const model2 = b.make.toUpperCase();
        if (model1 < model2) return -1;
        if (model1 > model2) return 1;
        return 0;
      }
      return 0;
    });
  };

  const sortedModels = () => {
    return vehicleModels.sort((a, b) => {
      if (a.model && b.model) {
        const model1 = a.model.toUpperCase();
        const model2 = b.model.toUpperCase();
        if (model1 < model2) return -1;
        if (model1 > model2) return 1;
        return 0;
      }
      return 0;
    });
  };

  useEffect(() => {
    const fetchMakes = async () => {
      try {
        const response = await fetch(
          "https://www.carboninterface.com/api/v1/vehicle_makes",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${API_KEY}`,
            },
          }
        );
        if (!response.ok) throw Error("Did not receive expected data");
        const listMakes = await response.json();
        setVehicleMakes(
          listMakes.map((element: ApiCarMake) => ({
            make: element.data.attributes.name,
            makeId: element.data.id,
          }))
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchMakes();
  }, []);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch(
          `https://www.carboninterface.com/api/v1/vehicle_makes/${chosenMake}/vehicle_models`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${API_KEY}`,
            },
          }
        );
        if (!response.ok) throw Error("Did not receive expected data");
        const listModels = await response.json();
        setVehicleModels(
          listModels
            .map((element: ApiCarMake) => {
              return {
                model: `${element.data.attributes.name}, ${element.data.attributes.year}`,
                modelId: element.data.id,
              };
            })
            .filter(
              (element: SingleCar, index: number, models: SingleCar[]) =>
                index ===
                models.findIndex(
                  (insideElement) => insideElement.model === element.model
                )
            )
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchModels();
  }, [chosenMake]);

  const fetchEmission = async () => {
    try {
      const response = await fetch(
        "https://www.carboninterface.com/api/v1/estimates",
        {
          method: "POST",
          mode: "cors",
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: "vehicle",
            distance_unit: "km",
            distance_value: distance,
            vehicle_model_id: chosenModel,
          }),
        }
      );
      if (!response.ok) throw Error("Did not receive expected data");
      const object = await response.json();
      const currentEmission = object.data.attributes.carbon_kg;
      setEmission(currentEmission);
    } catch (error) {
      console.log(error);
    }
  };

  const addTrip = async (): Promise<void> => {
    if (trip) {
      try {
        const tripId = uuid();
        await setDoc(doc(firebaseDb, "Trips", tripId), {
          emission: emission,
          date: dayjs(date, "MM/DD/YYYY").format("MM/DD/YYYY"),
          owner: username,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Wrapper>
      <Navigation />
      <Container className="mainContent" maxWidth="md">
        <Typography
          marginTop={3}
          marginBottom={1}
          variant="h5"
          padding={3}
          textAlign="center"
          color="primary.main"
        >
          {t("calculateYour")}
        </Typography>
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          margin={"auto"}
        >
          <FormControl sx={{ minWidth: 300, m: 1 }}>
            <TextField
              {...distanceLabel}
              id="dystans"
              type="number"
              onChange={(e) => handleDistance(e)}
            ></TextField>
          </FormControl>
          <FormControl sx={{ minWidth: 300, m: 1 }}>
            <InputLabel id="marka">{t("makeLabel")}</InputLabel>
            <Select
              labelId="marka"
              id="marka"
              label="Brand"
              defaultValue=""
              value={chosenMake}
              onChange={(e) => handleChangeMake(e)}
            >
              <MenuItem value={""}>-</MenuItem>

              {sortedMakes().map((element, index) => (
                <MenuItem value={element.makeId} key={index}>
                  {element.make}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 300, m: 1 }}>
            <InputLabel id="model">{t("modelLabel")}</InputLabel>
            <Select
              labelId="model"
              id="model"
              label="Model"
              defaultValue=""
              value={chosenModel}
              onChange={(e) => handleChangeModel(e)}
            >
              <MenuItem value={""}>-</MenuItem>
              {sortedModels().map((element, index) => (
                <MenuItem value={element.modelId} key={index}>
                  {element.model}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 300, m: 1 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date"
                value={date}
                onChange={setDate}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            sx={{ m: 1, marginTop: "2em" }}
            onClick={fetchEmission}
          >
            {t("calculateButton")}
          </Button>
          <Typography
            marginTop={1}
            marginBottom={0}
            variant="h5"
            padding={1}
            textAlign="center"
            color="primary.main"
          >
            {emission}
            {""}
            {t("resultUnit")}
          </Typography>
          <BarChart />
          {!!username && (
            <Button
              variant="contained"
              color="primary"
              sx={{ m: 1, marginBottom: 5 }}
              onClick={addTrip}
            >
              {t("save")}
            </Button>
          )}
          {!username && (
            <Tooltip
              {...tooltipLabel}
              placement="bottom-start"
              arrow
            >
              <div>
                <Button
                  disabled
                  variant="contained"
                  color="primary"
                  sx={{ marginBottom: 7 }}
                  onClick={addTrip}
                >
                  {t("save")}
                </Button>
              </div>
            </Tooltip>
          )}
        </Box>
      </Container>
      <Footer />
    </Wrapper>
  );
};
