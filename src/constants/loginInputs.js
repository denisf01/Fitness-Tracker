import i18next from "../i18n/i18n";

export const loginInputs = [
  {
    helperText: i18next.t("firstNameError"),
    margin: "normal",
    id: "firstname",
    type: "text",
    label: i18next.t("firstName"),
    autoComplete: "",
    register: {
      required: true,
      maxLength: 80,
      minLength: 2,
    },
  },
  {
    helperText: i18next.t("lastNameError"),
    margin: "normal",
    id: "lastname",
    type: "text",
    label: i18next.t("lastName"),
    autoComplete: "",
    register: {
      required: true,
      maxLength: 80,
      minLength: 2,
    },
  },
  {
    helperText: i18next.t("emailError"),
    margin: "normal",
    id: "email",
    type: "email",
    label: i18next.t("email"),
    autoComplete: "email",
    register: {
      required: true,
      pattern: /^\S+@\S+$/i,
    },
  },
  {
    helperText: i18next.t("passwordError"),
    margin: "normal",
    id: "password",
    label: i18next.t("password"),
    type: "password",
    autoComplete: "password",
    register: {
      required: true,
      minLength: 6,
    },
  },
  {
    helperText: i18next.t("passwordError"),
    margin: "normal",
    id: "repassword",
    type: "password",
    label: i18next.t("repasswordLabel"),
    autoComplete: "password",
    register: {
      required: true,
      minLength: 6,
    },
  },
];

export const changePassword = [
  {
    helperText: i18next.t("passwordError"),
    margin: "normal",
    id: "password",
    label: i18next.t("newPassword"),
    type: "password",
    autoComplete: "password",
    register: {
      required: true,
      minLength: 6,
    },
  },
  {
    helperText: i18next.t("passwordError"),
    margin: "normal",
    id: "repassword",
    label: i18next.t("newRepassword"),
    type: "password",
    autoComplete: "password",
    register: {
      required: true,
      minLength: 6,
    },
  },
];
