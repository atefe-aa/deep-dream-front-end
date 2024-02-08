import React, { createContext, useContext, useState } from 'react';

const SlideSelectionContext = createContext();

export const SlideSelectionProvider = ({ children }) => {
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [selectedRegions, setSelectedRegions] = useState({});

  // Add all your state logic here

  return (
    <SlideSelectionContext.Provider value={{ selectedCheckboxes, setSelectedCheckboxes, selectedRegions, setSelectedRegions }}>
      {children}
    </SlideSelectionContext.Provider>
  );
};

export const useSlideSelection = () => useContext(SlideSelectionContext);
