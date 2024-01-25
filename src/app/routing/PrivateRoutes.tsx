import { FC, lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { MasterLayout } from "../modules/MasterLayout";
import TopBarProgress from "react-topbar-progress-indicator";
import { DashboardWrapper } from "../pages/dashboard/DashboardWrapper";
import { getCSSVariableValue } from "../../_metronic/assets/ts/_utils";
import { WithChildren } from "../../_metronic/helpers";
import { ScanningPage } from "../pages/scanning/ScanningPage";
import ManualModePage from "../pages/manual-mode-page/ManualModePage";
import SettingsPage from "../pages/settings-page/SettingsPage";
import { QueryRequestProvider } from "../ui/table/QueryRequestProvider";

const PrivateRoutes = () => {
  const UsersPage = lazy(() => import("../pages/users-page/UsersPage"));

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path="auth/*" element={<Navigate to="/dashboard" />} />
        {/* Pages */}
        <Route path="dashboard" element={<DashboardWrapper />} />
        <Route path="scanning" element={<ScanningPage />} />
        <Route path="settings/*" element={<SettingsPage />} />
        <Route path="manual-mode" element={<ManualModePage />} />

        {/* Lazy Modules */}
        <Route
          path="/user-management/*"
          element={
            <SuspensedView>
              <QueryRequestProvider>
                <UsersPage />
              </QueryRequestProvider>
            </SuspensedView>
          }
        />
        {/* Page Not Found */}
        <Route path="*" element={<Navigate replace to="/error/404" />} />
      </Route>
    </Routes>
  );
};

const SuspensedView: FC<WithChildren> = ({ children }) => {
  const baseColor = getCSSVariableValue("--bs-primary");
  TopBarProgress.config({
    barColors: {
      "0": baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  });
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>;
};

export { PrivateRoutes };
