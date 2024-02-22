
import { OldStatistics } from "../../modules/statistics/Statistics";
import { Registrations } from "../../modules/tests/Registrations";
import { FilterChartProvider } from "../../ui/search-and-filter/FilterChartProvider";

const DashboardWrapper = () => {
  return (
    <>
      <FilterChartProvider>
        <OldStatistics />
        <Registrations />
      </FilterChartProvider>
    </>
  );
};

export { DashboardWrapper };
