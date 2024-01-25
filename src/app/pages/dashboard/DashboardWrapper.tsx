import { useIntl } from "react-intl";
import { PageLink, PageTitle } from "../../../_metronic/layout/core";

import { SearchAndFilter } from "../../ui/search-and-filter/SearchAndFilter";
import { Pagination } from "../../ui/Pagination";
import { BarChart } from "../../modules/statistics/components/BarChart";
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
import { LineChart } from "../../modules/statistics/components/LineChart";
import { RadarChart } from "../../modules/statistics/components/RadarChart";
import { CustomTable } from "../../ui/table/CustomTable";
import { PatientsTableRow } from "../../modules/tests/components/PatientsTableRow";
import { useRegistration } from "../../modules/tests/hooks/useRegistrations";
import { KTCardBody, stringifyRequestQuery } from "../../../_metronic/helpers";
import { Search } from "../../ui/search-and-filter/Search";
import { NoRecordRow } from "../../ui/table/NoRecordRow";
import { TestsModel } from "../../modules/tests/core/_models";
import { ListLoading } from "../../ui/ListLoading";
import { useEffect, useMemo, useState } from "react";
import { useQueryRequest } from "../../ui/table/QueryRequestProvider";

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
  const { state, updateState } = useQueryRequest();
  const [query, setQuery] = useState<string>(stringifyRequestQuery(state));
  const updatedQuery = useMemo(() => stringifyRequestQuery(state), [state]);

  useEffect(() => {
    if (query !== updatedQuery) {
      setQuery(updatedQuery);
    }
  }, [updatedQuery]);
  const {
    isLoading: isLoadingRegistration,
    registrations,
    meta,
  } = useRegistration();

  const onChangePage = (page: number) => {
    updateState({ ...state, page });
  };
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
            change="All registrations"
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
            change="All registrations"
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

      <KTCardBody className="py-4">
        <Search />
        <div className="table-responsive">
          <CustomTable
            className=""
            accordionId="labsPanel"
            columns={[
              "registration",
              "Patient",
              "National ID",
              "registration Date & Time",
              "Sender Laboratory",
              "Progress",
            ]}
            modalId="kt_modal_add_new_laboratory"
          >
            {!isLoadingRegistration && !registrations && <NoRecordRow />}

            {!isLoadingRegistration &&
              registrations &&
              registrations.map((tets: TestsModel, index: number) => (
                <PatientsTableRow key={tets.id} data={tets} index={index + 1} />
              ))}
          </CustomTable>
        </div>
        {!isLoadingRegistration && registrations && (
          <Pagination onPageChange={onChangePage} meta={meta} />
        )}
        {isLoadingRegistration && <ListLoading />}
      </KTCardBody>

      {/* <Pagination /> */}
    </>
  );
};

const DashboardWrapper = () => {
  const intl = useIntl();
  return (
    <>
      <DashboardPage />
    </>
  );
};

export { DashboardWrapper };
