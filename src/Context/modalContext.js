import React, { useState, createContext } from "react";

export const ModalContext = createContext(false);

const ModalContextProvider = (props) => {
  const [editModal, setEditModal] = useState(false);

  const editModalHander = (part) => {
    setEditModal((prevEditModal) => !prevEditModal);
  };

  return (
    <ModalContext.Provider
      value={{
        editModalHander,
        setEditModal,
        editModal,
      }}
    >
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalContextProvider;
