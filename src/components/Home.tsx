import { FC, useState, useEffect } from "react";
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
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/Styles";

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
  const API_KEY = "jXRLfddDOE8RZeuDZtugQ";

  const [vehicleMakes, setVehicleMakes] = useState<SingleCar[]>([emptyCar]);
  const [vehicleModels, setVehicleModels] = useState<SingleCar[]>([emptyCar]);
  const [carbon, setCarbon] = useState(0);
  const [makeId, setMakeId] = useState(0);
  const [chosenMake, setChosenMake] = useState("");
  const [chosenModel, setChosenModel] = useState("");
  const [distance, setDistance] = useState(0);

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
        if (!response.ok) throw Error("Did not recieve expected data");
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
        if (!response.ok) throw Error("Did not recieve expected data");
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

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Typography
          marginTop={5}
          marginBottom={5}
          variant="h5"
          padding={3}
          textAlign="center"
          color="primary.main"
        >
          Oblicz emisję dwutlenku węgla swojego samochodu
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
              id="dystans"
              label="Dystans (km)"
              type="number"
              onChange={(e) => handleDistance(e)}
            ></TextField>
          </FormControl>

          <FormControl sx={{ minWidth: 300, m: 1 }}>
            <InputLabel id="marka">Marka</InputLabel>
            <Select
              labelId="marka"
              id="marka"
              label="Marka"
              defaultValue=""
              value={chosenMake}
              onChange={(e) => handleChangeMake(e)}
            >
              <MenuItem value={""}>-</MenuItem>
              {vehicleMakes.map((element, index) => (
                <MenuItem value={element.makeId} key={index}>
                  {element.make}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 300, m: 1 }}>
            <InputLabel id="model">Model</InputLabel>
            <Select
              labelId="model"
              id="model"
              label="Model"
              defaultValue=""
              value={chosenModel}
              onChange={(e) => handleChangeModel(e)}
            >
              <MenuItem value={""}>-</MenuItem>
              {vehicleModels.map((element, index) => (
                <MenuItem value={element.modelId} key={index}>
                  {element.model}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" sx={{ m: 1 }}>
            Oblicz emisję
          </Button>
          <div> to jest div pokazujący wynik</div>

          {/* <Wykres/> tutaj później włożyc komponent z wykresem*/}
          <Button variant="contained" color="primary" sx={{ m: 1 }}>
            Zapisz wynik
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
