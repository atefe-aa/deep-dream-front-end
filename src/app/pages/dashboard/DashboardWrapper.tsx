import { useEffect } from "react";
import { useIntl } from "react-intl";
import { PageLink, PageTitle } from "../../../_metronic/layout/core";

import { SearchAndFilter } from "../../ui/serach-and-filter/SearchAndFilter";
import { Pagination } from "../../ui/Pagination";
import { BarChart } from "../../ui/charts/BarChart";
import { FAKE_DATA, LABS_TESTS_DATA } from "../../utils/constants";
import { LineChart } from "../../ui/charts/LineChart";
import { RadarChart } from "../../ui/charts/RadarChart";
import { TestsTable } from "../../ui/table/TestsTable";

const data = FAKE_DATA;

const dashboardBreadCrumbs: Array<PageLink> = [
  {
    title: "Home",
    path: "/dashboard",
    isSeparator: false,
    isActive: false,
  },
];
const statistics = LABS_TESTS_DATA;

const DashboardPage = () => {
  useEffect(() => {
    // We have to show toolbar only for dashboard page
    document.getElementById("kt_layout_toolbar")?.classList.remove("d-none");
    return () => {
      document.getElementById("kt_layout_toolbar")?.classList.add("d-none");
    };
  }, []);

  const totals = [
    {
      title: "Total Tests",
      unit: "tests",
      value: statistics.reduce((acc, lab) => acc + lab.totalTests, 0),
    },
    {
      title: "Total Price",
      unit: "(R)",
      value: statistics
        .reduce((acc, lab) => acc + lab.totalPrice, 0)
        .toLocaleString(),
    },
  ];
  const testNumberSeries = [
    { name: "Total Tests", data: statistics.map((lab) => lab.totalTests) },
  ];
  const testPriceSeries = [
    {
      name: "Total Price",
      data: statistics.map((lab) => lab.totalPrice / 1000),
    },
  ];
  const xaxisCategories = statistics.map((lab) => lab.labName);

  const radarPriceSeries = statistics.map((lab) => {
    const testData = lab.tests.map((test) => test.totalPrice);
    return {
      name: lab.labName,
      data: testData,
    };
  }); 
  const radarNumberSeries = statistics.map((lab) => {
    const testData = lab.tests.map((test) => test.totalNamber);
    return {
      name: lab.labName,
      data: testData,
    };
  });
  return (
    <>
      <SearchAndFilter />

      {/* begin::Row */}
      <div className="row gy-5 g-xxl-8">
        {/* begin::Col */}
        <div className="col-lg-4">
          <BarChart
            totals={totals}
            series={testNumberSeries}
            chartTitle="Tests Number"
            unit=" tests"
            xaxisCategories={xaxisCategories}
            className="mb-5 mb-xl-8"
            chartColor="info"
            chartHeight="343px"
          />
          <BarChart
            unit=" (1000 R)"
            totals={totals}
            series={testPriceSeries}
            chartTitle="Tests Price"
            xaxisCategories={xaxisCategories}
            className=" mb-xl-8"
            chartColor="primary"
            chartHeight="343px"
          />
        </div>
        <div className="col-lg-4">
          <LineChart
            className=" mb-5 mb-xl-8"
            svgIcon="element-11"
            color="danger"
            description="Test Types Prices"
            change="750,000 (R)"
          />
          <LineChart
            className=" mb-xl-8"
            svgIcon="basket"
            color="success"
            description="Test Types Numbers"
            change="290 Tests"
          />
        </div>
        <div className="col-lg-4">
          <RadarChart
           series={radarPriceSeries}
           unit=" (R)"
            className="mb-5 mb-xl-8 "
            svgIcon="basket"
            color="success"
            description="Price Base"
            change="+259"
          />
          <RadarChart
          series={radarNumberSeries}
          unit=" tests"
            className=" mb-xl-8 "
            svgIcon="basket"
            color="success"
            description="Test Number Base"
            change="+259"
          />
        </div>
        {/* end::Col */}
      </div>
      {/* end::Row */}

      {/* begin::Row */}
      <div className="row gy-5 g-xl-8 mt-2">
        {/* begin::Col */}
        <div className="col-xxl-12">
          <TestsTable
            testsData={data}
            className="card-xxl-stretch mb-5 mb-xl-8"
          />
        </div>
        {/* end::Col */}
      </div>
      {/* end::Row */}

      <Pagination />
    </>
  );
};

const DashboardWrapper = () => {
  const intl = useIntl();
  return (
    <>
      <PageTitle breadcrumbs={dashboardBreadCrumbs}>
        {intl.formatMessage({ id: "MENU.DASHBOARD" })}
      </PageTitle>
      <DashboardPage />
    </>
  );
};

export { DashboardWrapper };
