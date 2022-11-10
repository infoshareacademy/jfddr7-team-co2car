import { FC, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
// import Input from "@mui/material/Input";
// import FormHelperText from "@mui/material/FormHelperText";

export const Home: FC = () => {
  const [vehicleMakes, setVehicleMakes] = useState<string[]>([
    "AlfaRomeo",
    "Ferrari",
    "Toyota",
  ]);
  const [vehicleModels, setVehicleModels] = useState<string[]>([
    "model1",
    "model2",
    "model3",
  ]);

  return (
    <div>
      <h2>Oblicz emisję dwutlenku węgla swojego samochodu </h2>
      <form>
        <FormControl sx={{ minWidth: 200 }}>
          <TextField
            id="dystans"
            label="Dystans"
            // onChange={handleChange}
          ></TextField>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="marka">Marka</InputLabel>
          <Select
            labelId="marka"
            id="marka"
            label="Marka"
            // onChange={handleChange}
          >
            {vehicleMakes.map((make, index) => (
              <MenuItem value={make} key={index}>
                {make}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="model">Model</InputLabel>
          <Select
            labelId="model"
            id="model"
            label="Model"
            // onChange={handleChange}
          >
            {vehicleModels.map((model, index) => (
              <MenuItem value={model} key={index}>
                {model}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button variant="contained" color="primary">
          Oblicz emisję
        </Button>
        <div> to jest div pokazujący wynik</div>
      </form>

      {/* <Wykres/> tutaj później włożyc komponent z wykresem*/}
      <Button variant="contained" color="primary">
        Zapisz wynik
      </Button>
    </div>
  );
};
