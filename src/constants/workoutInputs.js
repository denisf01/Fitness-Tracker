export const workoutInputs = [
  {
    helperText: "Please enter valid weight.",
    margin: "normal",
    type: "number",
    id: "weight",
    label: "Weight(kg)",
    inputProps: {
      step: 0.1,
    },
    autoComplete: "",
    register: {
      required: false,
      min: 0,
    },
  },
  {
    helperText: "Please enter valid number of repetitions.",
    margin: "normal",
    type: "number",
    id: "reps",
    inputProps: {
      step: 1,
    },
    label: "Number of repetitions",
    autoComplete: "",
    register: {
      required: false,
      min: 0,
    },
  },
  {
    helperText: "Please enter valid number of RPE scale.",
    margin: "normal",
    id: "rpe",
    type: "number",
    inputProps: {
      step: 1,
    },
    label: "RPE (4-10)",
    autoComplete: "",
    register: {
      required: true,
      min: 4,
      max: 10,
    },
  },
];

export const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Exercise name",
  },
  {
    id: "time",
    numeric: true,
    disablePadding: false,
    label: "Time",
  },
  {
    id: "weight",
    numeric: true,
    disablePadding: false,
    label: "Weight (kg)",
  },
  {
    id: "num",
    numeric: true,
    disablePadding: false,
    label: "Number of repetition",
  },
  {
    id: "rpe",
    numeric: true,
    disablePadding: false,
    label: "RPE",
  },
];
