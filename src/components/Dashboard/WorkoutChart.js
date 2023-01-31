import React, { useContext } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { datasets, options } from "../../constants/workoutChartSetup";

ChartJS.register(ArcElement, Tooltip, Legend);

const MyChart = (props) => {
  const labels = props.data.map((el) => el.name);
  const myData = props.data.map((el) => el.totalTime);
  const data = {
    labels,
    datasets: [{ ...datasets[0], data: myData }],
  };

  return <Pie options={options} data={data} />;
};

export default MyChart;
