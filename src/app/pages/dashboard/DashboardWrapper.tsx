import { useEffect } from "react";
import { useIntl } from "react-intl";
import { PageLink, PageTitle } from "../../../_metronic/layout/core";
import {
  StatisticsWidget4,
  TablesWidget9,
} from "../../../_metronic/partials/widgets";
import { SearchAndFilter } from "../../ui/serach-and-filter/SearchAndFilter";
import { Pagination } from "../../ui/Pagination";
import { BarChart } from "../../ui/charts/BarChart";
import { FAKE_DATA, LABS_TESTS_DATA } from "../../utils/constants";
import { LineChart } from "../../ui/charts/LineChart";

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

  return (
    <>
      <SearchAndFilter />

      {/* begin::Row */}
      <div className="row gy-5 g-xl-8">
        {/* begin::Col */}
        <div className="col-xxl-4">
          <BarChart
            totals={totals}
            series={testNumberSeries}
            chartTitle="Tests Number"
            unit=" tests"
            xaxisCategories={xaxisCategories}
            maxY={100}
            minY={0}
            className="card-xl-stretch mb-xl-8"
            chartColor="info"
            chartHeight="250px"
          />
        </div>
        <div className="col-xxl-4">
          <BarChart
            maxY={10000}
            minY={0}
            unit=" (1000 R)"
            totals={totals}
            series={testPriceSeries}
            chartTitle="Tests Price"
            xaxisCategories={xaxisCategories}
            className="card-xl-stretch mb-xl-8"
            chartColor="primary"
            chartHeight="250px"
          />
        </div>
        {/* end::Col */}
        {/* begin::Col */}
        <div className="col-xxl-4">
          <LineChart
            className="card-xxl-stretch mb-5 mb-xl-8"
            svgIcon="element-11"
            color="danger"
            description="Weekly Income"
            change="750$"
          />
        </div>
        <div className="col-xxl-4">
          <LineChart
            className="card-xxl-stretch mb-xl-8"
            svgIcon="basket"
            color="success"
            description="Sales Change"
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
          <TablesWidget9
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
