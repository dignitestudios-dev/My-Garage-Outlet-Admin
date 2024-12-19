import React, { createContext } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const test = "";
  // const token = Cookies.get("token") ? JSON.parse(Cookies.get("token")) : null;
  return (
    <GlobalContext.Provider value={{ test, navigate }}>
      {children}
    </GlobalContext.Provider>
  );
};
