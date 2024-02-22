import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { I18nProvider } from "../_metronic/i18n/i18nProvider";
import { LayoutProvider, LayoutSplashScreen } from "../_metronic/layout/core";
import { MasterInit } from "../_metronic/layout/MasterInit";
import { AuthInit } from "./modules/auth";
import { ThemeModeProvider } from "../_metronic/partials";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 60 * 24, // 24 hours
      },
    },
  });

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <I18nProvider>
        <QueryClientProvider client={queryClient}>
          <LayoutProvider>
            <ThemeModeProvider>
              <AuthInit>
                <Outlet />
                <MasterInit />
              </AuthInit>
            </ThemeModeProvider>
          </LayoutProvider>
          <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{ margin: "8px" }}
            toastOptions={{
              success: {
                duration: 3000,
              },
              error: {
                duration: 8000,
              },
              style: {
                fontSize: "16px",
                maxWidth: "500px",
                padding: "16px 24px",
                backgroundColor: "var(--bs-gray-100)",
                color: "var(--bs-gray-700)",
              },
            }}
          />
        </QueryClientProvider>
      </I18nProvider>
    </Suspense>
  );
};

export { App };
