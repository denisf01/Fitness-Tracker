export const workoutInputs = [
  {
    helperText: "Please enter valid time.",
    margin: "normal",
    id: "time",
    label: "",
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
    helperText: "Please enter valid weight.",
    margin: "normal",
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
    inputProps: {
      step: 1,
    },
    label: "RPE (4-10)",
    autoComplete: "",
    register: {
      required: false,
      min: 4,
      max: 10,
    },
  },
];
