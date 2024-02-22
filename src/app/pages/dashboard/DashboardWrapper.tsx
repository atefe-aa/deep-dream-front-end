import { OldStatistics } from "../../modules/statistics/OldStatistics";
import { Statistics } from "../../modules/statistics/Statistics";
import { Registrations } from "../../modules/tests/Registrations";
import { FilterChartProvider } from "../../ui/search-and-filter/FilterChartProvider";

const DashboardWrapper = () => {
  return (
    <>
      <FilterChartProvider>
        <OldStatistics />
        {/* <Statistics /> */}
        <Registrations />
      </FilterChartProvider>
    </>
  );
};

export { DashboardWrapper };
