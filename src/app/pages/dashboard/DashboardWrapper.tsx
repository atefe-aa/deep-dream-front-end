import { Statistics } from "../../modules/statistics/Statistics";
import { Statistics2 } from "../../modules/statistics/Statistics2";
import { Registrations } from "../../modules/tests/Registrations";

const DashboardWrapper = () => {

  return (
    <>
      {/* <Statistics /> */}
      <Statistics2 />
      <Registrations />
    </>
  );
};

export { DashboardWrapper };
