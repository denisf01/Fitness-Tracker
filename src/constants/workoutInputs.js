import i18next from "../i18n/i18n";

export const workoutInputs = [
  {
    helperText: i18next.t("weightError"),
    margin: "normal",
    type: "number",
    id: "weight",
    label: i18next.t("weightLabel"),
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
    helperText: i18next.t("repsError"),
    margin: "normal",
    type: "number",
    id: "reps",
    inputProps: {
      step: 1,
    },
    label: i18next.t("reps"),
    autoComplete: "",
    register: {
      required: false,
      min: 0,
    },
  },
  {
    helperText: i18next.t("rpeError"),
    margin: "normal",
    id: "rpe",
    type: "number",
    inputProps: {
      step: 1,
    },
    label: i18next.t("rpe"),
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
    label: i18next.t("exerciseName"),
  },
  {
    id: "time",
    numeric: true,
    disablePadding: false,
    label: i18next.t("time"),
  },
  {
    id: "weight",
    numeric: true,
    disablePadding: false,
    label: i18next.t("weightLabel"),
  },
  {
    id: "num",
    numeric: true,
    disablePadding: false,
    label: i18next.t("reps"),
  },
  {
    id: "rpe",
    numeric: true,
    disablePadding: false,
    label: "RPE",
  },
];
