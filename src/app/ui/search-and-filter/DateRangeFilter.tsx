import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_en from "react-date-object/locales/persian_en";
import { useState } from "react";
import type { DateObject, Value } from "react-multi-date-picker";
import { useFilterChart } from "./FilterChartProvider";

type Props = {
  componentName: ComponentName;
};
type ComponentName = "lineChart" | "radarChart" | "barChart";
const DateRangeFilter: React.FC<Props> = ({ componentName }) => {
  const { state, updateState } = useFilterChart();
  const relevantState = state[componentName];

  const [dateRange, setDateRange] = useState<Value>([
    relevantState.fromDate,
    relevantState.toDate,
  ]);

  function handleDateChange(
    date: DateObject | DateObject[] | null,
    options: any
  ) {
    const dateArray = options.validatedValue;
    if (Array.isArray(dateArray) && dateArray.length === 2) {
      setDateRange(dateArray);

      const updatedFilters = {
        ...state,
        [componentName]: {
          ...relevantState,
          fromDate: dateArray[0].toString(),
          toDate: dateArray[1].toString(),
        },
      };
      localStorage.setItem("entityFilterState", JSON.stringify(updatedFilters));

    }
  }
    
  return (
    <div className="mb-10">
      <label className="form-label fw-bold">Date Range:</label>
      <DatePicker
        value={dateRange}
        onChange={(date, options) => {
          handleDateChange(date, options);
        }}
        calendar={persian}
        locale={persian_en}
        range
        calendarPosition="bottom-right"
      />
    </div>
  );
};
export { DateRangeFilter };
