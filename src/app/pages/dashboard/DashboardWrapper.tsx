import { useEffect } from "react";
import { useIntl } from "react-intl";
import { PageLink, PageTitle } from "../../../_metronic/layout/core";
import {
  ListsWidget2,
  ListsWidget3,
  ListsWidget4,
  ListsWidget6,
  ListsWidget9,
  MixedWidget3,
  MixedWidget8,
  StatisticsWidget4,
  TablesWidget1,
  TablesWidget2,
  TablesWidget3,
  TablesWidget5,
  TablesWidget9,
} from "../../../_metronic/partials/widgets";
import { SearchAndFilter } from "../../../_metronic/layout/components/SearchAndFilter";

const dashboardBreadCrumbs: Array<PageLink> = [
  {
    title: "Home",
    path: "/dashboard",
    isSeparator: false,
    isActive: false,
  },
];

const DashboardPage = () => {
  useEffect(() => {
    // We have to show toolbar only for dashboard page
    document.getElementById("kt_layout_toolbar")?.classList.remove("d-none");
    return () => {
      document.getElementById("kt_layout_toolbar")?.classList.add("d-none");
    };
  }, []);

  return (
    <>
      <SearchAndFilter />

      {/* begin::Row */}
      <div className="row gy-5 g-xl-8">
        {/* begin::Col */}
        <div className="col-xxl-4">
          <MixedWidget3
            className="card-xl-stretch mb-xl-8"
            chartColor="primary"
            chartHeight="250px"
          />
        </div>
        {/* end::Col */}

        {/* begin::Col */}
        <div className="col-xxl-8">
          <TablesWidget9 className="card-xxl-stretch mb-5 mb-xl-8" />
        </div>
        {/* end::Col */}
      </div>
      {/* end::Row */}

      {/* begin::Row */}
      <div className="row gy-5 g-xl-8">
        {/* begin::Col */}
        <div className="col-xxl-4">
          <StatisticsWidget4
            className="card-xxl-stretch-50 mb-5 mb-xl-8"
            svgIcon="element-11"
            color="danger"
            description="Weekly Income"
            change="750$"
          />

          <StatisticsWidget4
            className="card-xxl-stretch-50 mb-xl-8"
            svgIcon="basket"
            color="success"
            description="Sales Change"
            change="+259"
          />
        </div>
        {/* end::Col */}
      </div>
      {/* end::Row */}
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
