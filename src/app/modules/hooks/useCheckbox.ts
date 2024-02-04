import { useState } from "react";

// Assuming checkboxes are identified by numbers. Adjust the type as needed (e.g., string if using ids).
type CheckboxValue = number;

// Define the type for the initial state or any other props as needed.
interface UseCheckboxLogicProps {
  initialCheckboxes: CheckboxValue[];
  initialSelected?: CheckboxValue[]; // Make this optional if you don't always want to start with some checkboxes selected.
}

// Custom hook for managing checkboxes, now with type definitions
export const useCheckbox = ({
  initialCheckboxes,
  initialSelected = [],
}: UseCheckboxLogicProps) => {
  const [selectedCheckboxes, setSelectedCheckboxes] =
    useState<CheckboxValue[]>(initialSelected);
  const [selectAll, setSelectAll] = useState<boolean>(false);

  // Handles the select all checkbox change
  const handleSelectAllChange = (isChecked: boolean) => {
    setSelectAll(isChecked);
    setSelectedCheckboxes(isChecked ? initialCheckboxes : []);
  };

  // Handles individual checkbox changes
  const handleCheckboxChange = (value: CheckboxValue, isChecked: boolean) => {
    let updatedSelectedCheckboxes = isChecked
      ? [...selectedCheckboxes, value]
      : selectedCheckboxes.filter((checkbox) => checkbox !== value);

    setSelectedCheckboxes(updatedSelectedCheckboxes);
    setSelectAll(updatedSelectedCheckboxes.length === initialCheckboxes.length);
  };

  return {
    selectAll,
    selectedCheckboxes,
    handleSelectAllChange,
    handleCheckboxChange,
  };
};
