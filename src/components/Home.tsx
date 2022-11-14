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
import {
  DatePicker,
  LocalizationProvider,
  // AdapterDayjs,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
// import "dayjs/locale/pl";
// import { pl } from "dayjs/locale";
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
  const [chosenMake, setChosenMake] = useState("");
  const [chosenModel, setChosenModel] = useState("");
  const [distance, setDistance] = useState(0);
  const [emission, setEmission] = useState(0);
  const [date, setDate] = useState<Dayjs | null>(null);

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

  const fetchEmission = async () => {
    console.log(distance);
    console.log(chosenModel);
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
      if (!response.ok) throw Error("Did not recieve expected data");
      const object = await response.json();
      const currentEmission = object.data.attributes.carbon_kg;
      console.log(currentEmission);
      setEmission(currentEmission);
    } catch (error) {
      console.log(error);
    }
  };

  // const addSong = async (): Promise<void> => {
  //   if (newSong) {
  //     try {
  //       const songId = uuid();
  //       await setDoc(doc(firebaseDb, "Songs", songId), {
  //         name: newSong,
  //         owner: username,
  //       });
  //       const updatedSongs = [...songs, newSong];
  //       setSongs(updatedSongs);
  //       if (inputRef.current) {
  //         inputRef.current.value = "";
  //       }
  //       setNewSong("");
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };

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

              {sortedMakes().map((element, index) => (
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
              {sortedModels().map((element, index) => (
                <MenuItem value={element.modelId} key={index}>
                  {element.model}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 300, m: 1 }}>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              // locale={pl}
            >
              <DatePicker
                label="Data"
                value={date}
                onChange={(newDate) => {
                  setDate(newDate);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            sx={{ m: 1 }}
            onClick={fetchEmission}
          >
            Oblicz emisję
          </Button>
          <Typography
            marginTop={1}
            marginBottom={1}
            variant="h5"
            padding={3}
            textAlign="center"
            color="primary.main"
          >
            {emission} kg
          </Typography>

          {/* <Wykres/> tutaj później włożyc komponent z wykresem*/}
          <Button variant="contained" color="primary" sx={{ m: 1 }}>
            Zapisz wynik
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
