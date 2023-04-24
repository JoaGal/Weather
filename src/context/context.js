'use client';
import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [dataUser, setDataUser] = useState({
    username: "",
    email: "",
    image: "",
    password: "",
    confirmPassword: "",
  });

  return (
    <UserContext.Provider value={{user, setUser, dataUser, setDataUser}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
