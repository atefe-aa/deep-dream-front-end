import { hasRole } from "../../utils/helper";
import { useAuth } from "../auth";
import { BarChart } from "./components/BarChart";
import { LineChart } from "./components/LineChart";
import { RadarChart } from "./components/RadarChart";

export function Statistics() {
  const { currentUser } = useAuth();
  return (
    <div className="row gy-5 g-xxl-8">
      {/* begin::Col */}
      {currentUser && hasRole(currentUser, "superAdmin") && (
        <>
          <div className="col-lg-6">
            <BarChart
              unit=" (R)"
              y="price"
              chartTitle="Tests Price(R)"
              className=" mb-xl-8"
              color="primary"
              chartHeight="365px"
            />
          </div>
          <div className="col-lg-6">
            <BarChart
              y="number"
              chartTitle="Tests Number"
              unit=" tests"
              className="mb-5 mb-xl-8"
              color="info"
              chartHeight="365px"
            />
          </div>
        </>
      )}

      <div className="col-lg-6">
        <LineChart
          y="price"
          unit=" (R)"
          className=" mb-5 mb-xl-8"
          color="danger"
          description="Test Types Prices(R)"
        />
      </div>
      <div className="col-lg-6">
        <LineChart
          y="number"
          unit=" Tests"
          className=" mb-xl-8"
          color="success"
          description="Test Types Numbers"
        />
      </div>

      {currentUser && hasRole(currentUser, "superAdmin") && (
        <>
          <div className="col-lg-6">
            <RadarChart
              y="price"
              unit=" (R)"
              className="mb-5 mb-xl-8 "
              color="success"
              description="Price(R) Base"
            />
          </div>
          <div className="col-lg-6">
            <RadarChart
              y="number"
              unit=" tests"
              className=" mb-xl-8 "
              color="success"
              description="Test Number Base"
            />
          </div>
        </>
      )}

      {/* end::Col */}
    </div>
  );
  {
    /* end::Row */
  }
}
