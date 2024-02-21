import { hasRole } from "../../utils/helper";
import { useAuth } from "../auth";
import { BarChart } from "./components/BarChart";
import { LineChart } from "./components/LineChart";
import { RadarChart } from "./components/RadarChart";
import { useChart } from "./hooks/useChart";

export function Statistics() {
  const { currentUser } = useAuth();
  const query1 = "x=laboratories&y=number";
  const { isLoading, chartData } = useChart({ query: query1, chart: "chart" });

  const query2 = "x=laboratories&y=price";
  const { isLoading: isLoading2, chartData: chartData2 } = useChart({
    query: query2,
    chart: "chart",
  });
  const query3 = "x=testTypes&y=price";
  const { isLoading: isLoading3, chartData: chartData3 } = useChart({
    query: query3,
    chart: "chart",
  });
  const query4 = "x=testTypes&y=number";
  const { isLoading: isLoading4, chartData: chartData4 } = useChart({
    query: query4,
    chart: "chart",
  });

  const query5 =
    "y=number&laboratories[]=13&laboratories[]=25&laboratories[]=36&laboratories[]=2&laboratories[]=5&laboratories[]=6&testTypes[]=1&testTypes[]=2&testTypes[]=3&testTypes[]=4&testTypes[]=5&testTypes[]=7r";
  const { isLoading: isLoading5, chartData: chartData5 } = useChart({
    query: query5,
    chart: "radarChart",
  });

  const query6 =
    "y=price&laboratories[]=13&laboratories[]=25&laboratories[]=36&laboratories[]=2&laboratories[]=5&laboratories[]=6&testTypes[]=1&testTypes[]=2&testTypes[]=3&testTypes[]=4&testTypes[]=5&testTypes[]=7r";
  const { isLoading: isLoading6, chartData: chartData6 } = useChart({
    query: query6,
    chart: "radarChart",
  });

  return (
    <div className="row gy-5 g-xxl-8">
      {/* begin::Col */}
      {currentUser && hasRole(currentUser, "superAdmin") && (
        <>
          <div className="col-lg-6">
            {isLoading ? (
              <span>Loading....</span>
            ) : (
              <BarChart
                totals={chartData.totals}
                series={chartData.series}
                chartTitle="Tests Number"
                unit=" tests"
                xaxisCategories={chartData.xAxisCategories}
                className="mb-5 mb-xl-8"
                chartColor="info"
                chartHeight="365px"
              />
            )}
          </div>
          <div className="col-lg-6">
            {isLoading2 ? (
              <span>Loading....</span>
            ) : (
              <BarChart
                unit=" (R)"
                totals={chartData2.totals}
                series={chartData2.series}
                chartTitle="Tests Price(R)"
                xaxisCategories={chartData2.xAxisCategories}
                className=" mb-xl-8"
                chartColor="primary"
                chartHeight="365px"
              />
            )}
          </div>
        </>
      )}
      <div className="col-lg-6">
        {isLoading3 ? (
          <span>Loading....</span>
        ) : (
          <LineChart
            chartHeight=""
            chartTitle=""
            totals={chartData3.totals}
            series={chartData3.series}
            xaxisCategories={chartData3.xAxisCategories}
            unit=" (R)"
            className=" mb-5 mb-xl-8"
            color="danger"
            description="Test Types Prices(R)"
            change={
              currentUser && hasRole(currentUser, "superAdmin")
                ? "All Laboratories"
                : currentUser?.data?.labName
            }
          />
        )}
      </div>
      <div className="col-lg-6">
        {isLoading4 ? (
          <span>Loading....</span>
        ) : (
          <LineChart
            chartHeight=""
            chartTitle=""
            totals={chartData4.totals}
            series={chartData4.series}
            xaxisCategories={chartData4.xAxisCategories}
            unit=" Tests"
            className=" mb-xl-8"
            color="success"
            description="Test Types Numbers"
            change={
              currentUser && hasRole(currentUser, "superAdmin")
                ? "All Laboratories"
                : currentUser?.data?.labName
            }
          />
        )}
      </div>
      {currentUser && hasRole(currentUser, "superAdmin") && (
        <>
          <div className="col-lg-6">
            {isLoading5 ? (
              <span>Loading....</span>
            ) : (
              <RadarChart
                series={chartData5.series}
                unit=" (R)"
                className="mb-5 mb-xl-8 "
                svgIcon="basket"
                color="success"
                description="Price(R) Base"
                xaxisCategories={chartData5.xAxisCategories}
                totals={chartData5.totals}
              />
            )}
          </div>
          <div className="col-lg-6">
            {isLoading6 ? (
              <span>Loading....</span>
            ) : (
              <RadarChart
                series={chartData6.series}
                unit=" tests"
                className=" mb-xl-8 "
                svgIcon="basket"
                color="success"
                description="Test Number Base"
                xaxisCategories={chartData6.xAxisCategories}
                totals={chartData6.totals}
              />
            )}
          </div>
        </>
      )}
      {/* end::Col */}
    </div>
  );
}
