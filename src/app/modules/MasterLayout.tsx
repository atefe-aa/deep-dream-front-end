import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AsideDefault } from "../../_metronic/layout/components/aside/AsideDefault";
import { Footer } from "../../_metronic/layout/components/Footer";
import { HeaderWrapper } from "../../_metronic/layout/components/header/HeaderWrapper";
import { ScrollTop } from "../../_metronic/layout/components/ScrollTop";
import { Content } from "../../_metronic/layout/components/Content";
import { PageDataProvider } from "../../_metronic/layout/core";
import { AddNewTest, DrawerMessenger } from "../../_metronic/partials";
import { MenuComponent } from "../../_metronic/assets/ts/components";

const MasterLayout = () => {
  const location = useLocation();

  useEffect(() => {
    setTimeout(() => {
      MenuComponent.reinitialization();
    }, 500);
  }, [location.key]);

  return (
    <PageDataProvider>
      <div className="d-flex flex-column flex-root">
        {/* begin::Page */}
        <div className="page d-flex flex-row flex-column-fluid">
          <AsideDefault />
          {/* begin::Wrapper */}
          <div
            className="wrapper d-flex flex-column flex-row-fluid"
            id="kt_wrapper"
          >
            <HeaderWrapper />

            {/* begin::Content */}
            <div
              id="kt_content"
              className="content d-flex flex-column flex-column-fluid"
            >
              <Content>
                <Outlet />
              </Content>
            </div>
            {/* end::Content */}
            <Footer />
          </div>
          {/* end::Wrapper */}
        </div>
        {/* end::Page */}
      </div>

      {/* begin:: Drawers */}
      <DrawerMessenger />
      {/* end:: Drawers */}

      {/* begin:: Modals */}
      <AddNewTest />
      {/* end:: Modals */}

      <ScrollTop />
    </PageDataProvider>
  );
};

export { MasterLayout };
