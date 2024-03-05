export type DateRangeState = {
  fromDate: string;
  toDate: string;
};
export type LaboratoriesState = number[];
export type TestTypesState = number[];

export type FilterState = DateRangeState & {
  laboratories: LaboratoriesState;
  testTypes: TestTypesState;
};

export type ComponentName = "lineChart" | "radarChart" | "barChart";

export type EntityFilterState = {
  barChart: FilterState;
  lineChart: FilterState;
  radarChart: FilterState;
};

export type FilterChartContextProps = {
  state: EntityFilterState;
  updateState: (
    entity: keyof EntityFilterState,
    updates: Partial<FilterState>
  ) => void;
};

export const initialFilterState: FilterState = {
  fromDate: "",
  toDate: "",
  laboratories: [],
  testTypes: [],
};

export const initialEntityFilterState = {
  barChart: initialFilterState,
  lineChart: initialFilterState,
  radarChart: initialFilterState,
};
