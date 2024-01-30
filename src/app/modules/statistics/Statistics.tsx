import {
  BarChartTotalsNumber,
  BarChartTotalsPrice,
  TestTypeNumberSeries,
  TestTypePriceSeries,
  radarNumberSeries,
  radarPriceSeries,
  testNumberSeries,
  testPriceSeries,
  xaxisCategories,
  xaxisTestTypeCategories,
} from "../../utils/constants";
import { useAuth } from "../auth";
import { BarChart } from "./components/BarChart";
import { LineChart } from "./components/LineChart";
import { RadarChart } from "./components/RadarChart";

export function Statistics() {
  const { currentUser } = useAuth();

  return (
    <div className="row gy-5 g-xxl-8">
      {/* begin::Col */}
      {currentUser &&
        currentUser.data.roles &&
        currentUser.data.roles.length > 0 &&
        currentUser.data.roles.includes("superAdmin") && (
          <>
            <div className="col-lg-6">
              <BarChart
                totals={BarChartTotalsNumber}
                series={testNumberSeries}
                chartTitle="Tests Number"
                unit=" tests"
                xaxisCategories={xaxisCategories}
                className="mb-5 mb-xl-8"
                chartColor="info"
                chartHeight="365px"
              />
              {/* <ChartsWidget1 className='mb-5 mb-xxl-8' /> */}
            </div>
            <div className="col-lg-6">
              <BarChart
                unit=" (R)"
                totals={BarChartTotalsPrice}
                series={testPriceSeries}
                chartTitle="Tests Price(R)"
                xaxisCategories={xaxisCategories}
                className=" mb-xl-8"
                chartColor="primary"
                chartHeight="365px"
              />
            </div>
          </>
        )}
      <div className="col-lg-6">
        <LineChart
          chartHeight=""
          chartTitle=""
          totals={BarChartTotalsPrice}
          series={TestTypePriceSeries}
          xaxisCategories={xaxisTestTypeCategories}
          unit=" (R)"
          className=" mb-5 mb-xl-8"
          color="danger"
          description="Test Types Prices(R)"
          change={
            currentUser &&
            currentUser.data.roles &&
            currentUser.data.roles.length > 0 &&
            currentUser.data.roles.includes("superAdmin")
              ? "All Laboratories"
              : currentUser?.data?.labName
          }
        />
      </div>
      <div className="col-lg-6">
        <LineChart
          chartHeight=""
          chartTitle=""
          totals={BarChartTotalsNumber}
          series={TestTypeNumberSeries}
          xaxisCategories={xaxisTestTypeCategories}
          unit=" Tests"
          className=" mb-xl-8"
          color="success"
          description="Test Types Numbers"
          change={
            currentUser &&
            currentUser.data.roles &&
            currentUser.data.roles.length > 0 &&
            currentUser.data.roles.includes("superAdmin")
              ? "All Laboratories"
              : currentUser?.data?.labName
          }
        />
      </div>
      {currentUser &&
        currentUser.data.roles &&
        currentUser.data.roles.length > 0 &&
        currentUser.data.roles.includes("superAdmin") && (
          <>
            <div className="col-lg-6">
              <RadarChart
                series={radarPriceSeries}
                unit=" (R)"
                className="mb-5 mb-xl-8 "
                svgIcon="basket"
                color="success"
                description="Price(R) Base"
                totals={BarChartTotalsPrice}
              />
            </div>
            <div className="col-lg-6">
              <RadarChart
                series={radarNumberSeries}
                unit=" tests"
                className=" mb-xl-8 "
                svgIcon="basket"
                color="success"
                description="Test Number Base"
                totals={BarChartTotalsNumber}
              />
            </div>
          </>
        )}
      {/* end::Col */}
    </div>
  );
}
