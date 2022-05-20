import React, { useState, createContext } from "react";

export const PartContext = createContext({
  partid: 0,
  partManufacturer: "",
  partModel: "",
  partCreated: "",
  partUpdated: "",
  partQuantity: "",
  partCategoryId: 1,
  partCategoryName: "",
  partReleased: "",
  categoryName: "",
  imagePath: "",
});

const PartContextProvider = (props) => {
  const [selectedPart, setSelectedPart] = useState({
    partid: 0,
    partManufacturer: "",
    partModel: "",
    partCreated: "",
    partUpdated: "",
    partQuantity: "",
    partCategoryId: 0,
    partCategoryName: "",
    partReleased: "",
    categoryName: "",
    imagePath: "",
  });


  return (
    <PartContext.Provider
      value={{
        setSelectedPart,
        selectedPart,
      }}
    >
      {props.children}
    </PartContext.Provider>
  );
};

export default PartContextProvider;
