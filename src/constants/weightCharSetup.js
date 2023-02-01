export const options = {
  transition: 0.3,
  responsive: true,
  scales: {
    y: {
      ticks: { color: "white" },
      title: {
        display: true,
        text: "Weight(kg)",
        color: 'white'
      },
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
      text: "Body weight",
      color: "white",
    },
  },
};

export const datasets = [
  {
    label: "Dataset 1",
    borderColor: "rgb(255, 99, 132)",
    backgroundColor: "white",
    fill: {
      target: "origin", // 3. Set the fill options
      above: "rgba(255, 0, 0, 0.3)",
    },
  },
];
