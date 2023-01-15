export const inputs = [
  {
    helperText: "Please enter valid first name.",
    margin: "normal",
    id: "firstname",
    label: "First name",
    autoComplete: "",
    register: {
      required: true,
      maxLength: 80,
      minLength: 2,
    },
  },
  {
    helperText: "Please enter valid last name.",
    margin: "normal",
    id: "lastname",
    label: "Last name",
    autoComplete: "",
    register: {
      required: true,
      maxLength: 80,
      minLength: 2,
    },
  },
  {
    helperText: "Please enter valid e-mail address.",
    margin: "normal",
    id: "email",
    label: "Email Address",
    autoComplete: "email",
    register: {
      required: true,
      pattern: /^\S+@\S+$/i,
    },
  },
  {
    helperText: "Password must be at least 6 characters.",
    margin: "normal",
    id: "password",
    label: "Password",
    autoComplete: "password",
    register: {
      required: true,
      minLength: 6,
    },
  },
];
