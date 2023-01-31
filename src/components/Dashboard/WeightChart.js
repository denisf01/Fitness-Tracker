import React, { useContext } from "react";
import { Colors } from "chart.js";
import { options, datasets } from "../../constants/weightCharSetup";
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
import Context from "../../store/context";

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

export function WeightChart() {
  const ctx = useContext(Context);
  const labels = ctx.weightData.map((el) => el.date);
  const myData = ctx.weightData.map((el) => el.weight);
  const data = {
    labels,
    datasets: [{ ...datasets[0], data: myData }],
  };
  return <Line options={options} data={data} />;
}
