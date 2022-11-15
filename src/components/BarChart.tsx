import React, { useContext } from "react";
import { Context } from "./../ContextProvider";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
// import { ThemeProvider } from "@mui/material/styles";
// import theme from "./styles/Styles";
//import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  indexAxis: "y" as const,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "bottom" as const,
    },
    title: {
      display: true,
      text: "My carbon footprint",
    },
  },
};

export const BarChart = () => {
  const { emission } = useContext(Context);
  const labels = [""];
  const data = {
    labels,
    datasets: [
      {
        label: "My emission",
        //data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        data: [emission / 1000],
        backgroundColor: "#af4448",
      },
      {
        label:
          "This is the average annual amount of CO₂ generated by a single person in the EU",
        //data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        data: [8.4],
        backgroundColor: "#e57373",
      },
      {
        label:
          "Maximum amount of CO₂ that can be generated by a single person in a year to stop climate change",
        //data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        data: [0.6],
        backgroundColor: "#00695c",
      },
    ],
  };

  return (
    <>
      {/* <ThemeProvider theme={theme}> */}
      <div style={{ width: "600px", margin: "auto auto" }}>
        <Bar options={options} data={data} />
      </div>
      {/* </ThemeProvider> */}
    </>
  );
};