import { OldStatistics } from "../../modules/statistics/OldStatistics";
import { Statistics } from "../../modules/statistics/Statistics";
import { Registrations } from "../../modules/tests/Registrations";

const DashboardWrapper = () => {

  return (
    <>
    <OldStatistics />
      <Statistics />
      <Registrations />
    </>
  );
};

export { DashboardWrapper };
