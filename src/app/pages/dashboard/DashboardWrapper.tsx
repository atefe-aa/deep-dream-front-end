import { useIntl } from "react-intl";
import { PageLink, PageTitle } from "../../../_metronic/layout/core";

import { SearchAndFilter } from "../../ui/search-and-filter/SearchAndFilter";
import { Pagination } from "../../ui/Pagination";
import { BarChart } from "../../ui/charts/BarChart";
import {
  BarChartTotalsNumber,
  BarChartTotalsPrice,
  FAKE_DATA,
  TestTypeNumberSeries,
  TestTypePriceSeries,
  radarNumberSeries,
  radarPriceSeries,
  testNumberSeries,
  testPriceSeries,
  xaxisCategories,
  xaxisTestTypeCategories,
} from "../../utils/constants";
import { LineChart } from "../../ui/charts/LineChart";
import { RadarChart } from "../../ui/charts/RadarChart";
import { CustomTable } from "../../ui/table/CustomTable";
import { PatientsTableRow } from "../../ui/table/tests/PatientsTableRow";

const data = FAKE_DATA;

const dashboardBreadCrumbs: Array<PageLink> = [
  {
    title: "Home",
    path: "/dashboard",
    isSeparator: false,
    isActive: false,
  },
];

const DashboardPage = () => {
  return (
    <>
      {/* begin::Row */}
      <div className="row gy-5 g-xxl-8">
        {/* begin::Col */}
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
            unit=" (1000 R)"
            totals={BarChartTotalsPrice}
            series={testPriceSeries}
            chartTitle="Tests Price(R)"
            xaxisCategories={xaxisCategories}
            className=" mb-xl-8"
            chartColor="primary"
            chartHeight="365px"
          />
        </div>
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
            change="All Laboratories"
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
            change="All Laboratories"
          />
        </div>
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
        {/* end::Col */}
      </div>
      {/* end::Row */}

      <SearchAndFilter />

      {/* begin::Row */}
      <div className="row gy-5 g-xl-8 mt-1">
        {/* begin::Col */}
        <div className="col-xxl-12">
          <CustomTable
            tableTitle="Tests Statistics"
            className="card-xxl-stretch mb-5 mb-xl-8"
            columns={[
              "Admit Patient",
              "Patient",
              "Price(R)",
              "Number of Slides",
              "Admit Date & Time",
              "Sender Laboratory",
              "Scan Duration",
              "Progress",
            ]}
          >
            {data.map((test, _index) => (
              <PatientsTableRow key={_index} data={test} index={_index + 1} />
            ))}
          </CustomTable>
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
