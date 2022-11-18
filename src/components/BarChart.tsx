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
import { Link } from "@mui/material";
import { useTranslation } from "react-i18next";
import "../i18n";

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
      // text: "My carbon footprint",
    },
  },
};

export const BarChart = () => {
  const { t } = useTranslation();
  const { emission } = useContext(Context);
  const labels = [""];
  const data = {
    labels,
    datasets: [
      {
        label: `${t("chartLabelMine")} [kg]`,
        //data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        // data: [emission / 1000],
        data: [emission],
        backgroundColor: "#af4448",
      },
      {
        label: `${t("chartLabelEUMonth")} [700 kg]`,
        //data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        data: [0.7 * 1000],
        backgroundColor: "#e57373",
      },
      {
        label: `${t("chartLabelAcceptable")} [600 kg]`,
        //data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        data: [0.6 * 1000],
        backgroundColor: "#46a38c",
        //"#00695c",
      },
    ],
  };

  return (
    <>
      <div style={{ width: "50vw", margin: "auto auto", marginBottom: "2em" }}>
        <Bar options={options} data={data} />
        <Link
          href="https://www.myclimate.org/"
          target="blank"
          color="#babdbe"
          fontSize={10}
          underline="hover"
        >
          * {t("source")}
        </Link>
      </div>
    </>
  );
};
