import { useUserContext } from "@/context/context";

export const DataInputs = () => {
  const { dataUser } = useUserContext();
     const inputslogin = [
        {
          id: 1,
          name: "email",
          type: "email",
          placeholder: "Email",
          errorMessage: "It should be a valid email address!",
          label: "Email",
          required: true,
        },
        {
          id: 2,
          name: "password",
          type: "password",
          placeholder: "Password",
          errorMessage:
            "Password should be 6-20 characters and include at least 1 letter, 1 number or more!",
          label: "Password",
          pattern: `^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,20}$`,
          required: true,
        },
      ];

      const inputsRegister = [
        {
          id: 1,
          name: "username",
          type: "text",
          placeholder: "Username",
          errorMessage:
            "Username should be 3-10 characters and shouldn't include any special character!",
          label: "Username",
          pattern: "^[A-Za-z0-9]{3,10}$",
          required: true,
        },
        {
          id: 2,
          name: "email",
          type: "email",
          placeholder: "Email",
          errorMessage: "It should be a valid email address!",
          label: "Email",
          required: true,
        },
        {
          id: 3,
          name: "password",
          type: "password",
          placeholder: "Password",
          errorMessage:
            "Password should be 6-20 characters and include at least 1 letter, 1 number or more!",
          label: "Password",
          pattern: `^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,20}$`,
          required: true,
        },
        {
          id: 4,
          name: "confirmPassword",
          type: "password",
          placeholder: "Confirm Password",
          errorMessage: "Passwords don't match!",
          label: "Confirm Password",
          pattern: dataUser.password,
          required: true,
        },
      ];
    return {inputslogin, inputsRegister}
  }
  