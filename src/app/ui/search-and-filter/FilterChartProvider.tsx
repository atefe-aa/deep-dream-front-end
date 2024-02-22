import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  EntityFilterState,
  FilterChartContextProps,
  FilterState,
  initialEntityFilterState,
} from "./_models";

// Using null! as the default value and asserting it matches FilterContextType
const FilterChartContext = createContext<FilterChartContextProps>(null!);

const FilterChartProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<EntityFilterState>(() => {
    const savedState = localStorage.getItem("entityFilterState");
    return savedState ? JSON.parse(savedState) : initialEntityFilterState;
  });

  useEffect(() => {
    // Save state to local storage whenever it changes
    localStorage.setItem("entityFilterState", JSON.stringify(state));
  }, [state]);

  const updateState = (
    entity: keyof EntityFilterState,
    updates: Partial<FilterState>
  ) => {
    setState((prevState) => ({
      ...prevState,
      [entity]: {
        ...prevState[entity],
        ...updates,
      },
    }));
  };
  return (
    <FilterChartContext.Provider value={{ state, updateState }}>
      {children}
    </FilterChartContext.Provider>
  );
};
const useFilterChart = () => useContext(FilterChartContext);
export { FilterChartProvider, useFilterChart };
