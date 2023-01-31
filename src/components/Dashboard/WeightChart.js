import React from "react";
import { Colors } from "chart.js";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Colors,
  Filler
);

export const options = {
  transition: 0.3,
  responsive: true,
  scales: {
    y: {
      ticks: { color: "white" },
    },
    x: {
      ticks: { color: "white" },
    },
  },
  plugins: {
    colors: {
      enabled: true,
      backgroundColor: "white",
    },
    legend: {
      display: false,
      position: "top",
      labels: {
        color: "white",
      },
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
      color: "white",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [1, 7, 10, 15],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "white",
      fill: {
        target: "origin", // 3. Set the fill options
        above: "rgba(255, 0, 0, 0.3)",
      },
    },
  ],
};

export function WeightChart() {
  return <Line options={options} data={data} />;
}
