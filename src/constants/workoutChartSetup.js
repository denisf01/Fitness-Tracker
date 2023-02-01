export const datasets = [
  {
    label: "Total time(h)",
    backgroundColor: [
      "rgba(255, 99, 132, 0.9)",
      "rgba(54, 162, 235, 0.9)",
      "rgba(222,255,84,0.9)",
      "rgba(75, 192, 192, 0.9)",
      "rgba(153, 102, 255, 0.9)",
      "rgba(255, 159, 64, 0.9)",
      "rgba(41,245,13,0.9)",
      "rgba(188,17,255,0.9)",
      "rgba(255,0,61,0.9)",
      "rgba(55,0,161,0.9)",
      "rgba(255,120,120,0.9)",
    ],
    borderColor: [
      "rgba(255, 99, 132, 1)",
      "rgba(54, 162, 235, 1)",
      "rgba(222,255,84,1)",
      "rgba(75, 192, 192, 1)",
      "rgba(153, 102, 255, 1)",
      "rgba(255, 159, 64, 1)",
      "rgba(41,245,13,1)",
      "rgba(188,17,255,1)",
      "rgba(255,0,61,1)",
      "rgba(55,0,161,1)",
      "rgba(255,120,120,1)",
    ],
    borderWidth: 1,
  },
];

export const options = {
  plugins: {
    legend: {
      display: true,
      labels: {
        color: "rgb(255,255,255)",
        font: {
          size: 16,
          weight: "bolder",

        },
      },
    },
  },

  responsive: true,
};
