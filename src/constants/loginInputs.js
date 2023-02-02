export const loginInputs = [
  {
    helperText: "Please enter valid first name.",
    margin: "normal",
    id: "firstname",
    type: "text",
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
    type: "text",
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
    type: "email",
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
    type: "password",
    autoComplete: "password",
    register: {
      required: true,
      minLength: 6,
    },
  },
  {
    helperText: "Password must be at least 6 characters.",
    margin: "normal",
    id: "repassword",
    type: "password",
    label: "Repeat Password",
    autoComplete: "password",
    register: {
      required: true,
      minLength: 6,
    },
  },
];

export const changePassword = [
  {
    helperText: "Password must be at least 6 characters.",
    margin: "normal",
    id: "password",
    label: "New password",
    type: "password",
    autoComplete: "password",
    register: {
      required: true,
      minLength: 6,
    },
  },
  {
    helperText: "Password must be at least 6 characters.",
    margin: "normal",
    id: "repassword",
    label: "Repeat new password",
    type: "password",
    autoComplete: "password",
    register: {
      required: true,
      minLength: 6,
    },
  },
];
