import React, { useState, createContext } from "react";

export const AlertContext = createContext(false);

const AlertContextProvider = (props) => {
  const [alertShow, setAlertShow] = useState(false);

  const alertShowHandler = () => {
    setAlertShow((prevAlertShow) => !prevAlertShow);
    setTimeout(() => {
        setAlertShow((prevAlertShow) => !prevAlertShow);
    }, 500);
  };

  return (
    <AlertContext.Provider
      value={{
        alertShowHandler,
        alertShow,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertContextProvider;
