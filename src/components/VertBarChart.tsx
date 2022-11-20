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
  responsive: true,
  plugins: {
    legend: {
      position: "bottom" as const,
    },
    title: {
      display: true,
    },
  },
};

export const VertBarChart = () => {
  const { t } = useTranslation();
  const { totalEmission } = useContext(Context);
  const labels = [""];
  const data = {
    labels,
    datasets: [
      {
        label: `${t("chartLabelMine")} [t]`,
        data: [+totalEmission / 1000],
        backgroundColor: "#af4448",
      },

      {
        label: `${t("chartLabelAcceptable")} [0.6 t]`,
        data: [0.6],
        backgroundColor: "#46a38c",
      },

      {
        label: `${t("chartLabelEUYear")} [8.4 t]`,
        data: [8.4],
        backgroundColor: "#e57373",
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
