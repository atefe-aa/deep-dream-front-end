/* eslint-disable react-refresh/only-export-components */
import { FC, useState, createContext, useContext } from "react";
import {
  QueryRequestContextProps,
  QueryState,
  initialQueryRequest,
  initialEntityQueryState,
  EntityQueryState,
} from "../../_metronic/helpers";

const QueryRequestContext =
  createContext<QueryRequestContextProps>(initialQueryRequest);

const QueryRequestProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState(initialEntityQueryState);

  const updateState = (
    entity: keyof EntityQueryState,
    updates: Partial<QueryState>
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
    <QueryRequestContext.Provider value={{ state, updateState }}>
      {children}
    </QueryRequestContext.Provider>
  );
};

const useQueryRequest = () => useContext(QueryRequestContext);
export { QueryRequestProvider, useQueryRequest };
