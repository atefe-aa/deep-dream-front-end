import React from "react";
import { useAuth } from "../auth";
import { BarChart } from "./components/BarChart";
import { LineChart } from "./components/LineChart";
import { RadarChart } from "./components/RadarChart";
import { useChart } from "./hooks/useChart";
import { hasRole } from "../../utils/helper";

// Define a type for your chart configurations to improve type checking
type ChartConfig = {
  query: string;
  chartType: "BarChart" | "LineChart" | "RadarChart"; // Specify exact string literals here
  title: string;
  unit: string;
  color: string;
  className: string;
  chartHeight: string;
  description: string;
  change?: string | null;
};

const chartComponents = {
  BarChart,
  LineChart,
  RadarChart,
};

export function Statistics() {
  const { currentUser } = useAuth();

  const chartQueries: ChartConfig[] = [
    {
      query: "x=laboratories&y=number",
      chartType: "BarChart",
      title: "Tests Number",
      className: "mb-5 mb-xl-8",
      unit: " tests",
      color: "info",
      chartHeight: "365px",
      description: "",
    },
    {
      query: "x=laboratories&y=price",
      chartType: "BarChart",
      title: "Tests Price(R)",
      unit: " (R)",
      color: "primary",
      className: " mb-xl-8",
      chartHeight: "365px",
      description: "",
    },
    {
      query: "x=testTypes&y=price",
      chartType: "LineChart",
      title: "Test Types Prices(R)",
      unit: " (R)",
      color: "danger",
      className: " mb-5 mb-xl-8",
      description: "Test Types Prices(R)",
      chartHeight: "",
      change:
        currentUser && hasRole(currentUser, "superAdmin")
          ? "All Laboratories"
          : currentUser?.data?.labName,
    },
    {
      query: "x=testTypes&y=number",
      chartType: "LineChart",
      title: "Test Types Numbers",
      unit: " Tests",
      color: "success",
      className: " mb-xl-8",
      description: "Test Types Numbers",
      change:
        currentUser && hasRole(currentUser, "superAdmin")
          ? "All Laboratories"
          : currentUser?.data?.labName,
      chartHeight: "",
    },
    {
      query:
        "y=number&laboratories[]=13&laboratories[]=25&laboratories[]=36&laboratories[]=2&laboratories[]=5&laboratories[]=6&testTypes[]=1&testTypes[]=2&testTypes[]=3&testTypes[]=4&testTypes[]=5&testTypes[]=7r",
      chartType: "RadarChart",
      title: "Test Number Base",
      unit: " tests",
      color: "success",
      className: "mb-5 mb-xl-8 ",
      description: "Price(R) Base",
      chartHeight: "",
    },
    {
      query:
        "y=price&laboratories[]=13&laboratories[]=25&laboratories[]=36&laboratories[]=2&laboratories[]=5&laboratories[]=6&testTypes[]=1&testTypes[]=2&testTypes[]=3&testTypes[]=4&testTypes[]=5&testTypes[]=7r",
      chartType: "RadarChart",
      title: "Price(R) Base",
      unit: " (R)",
      color: "success",
      className: " mb-xl-8",
      description: "Test Number Base",
      chartHeight: "",
    },
  ];

  return (
    <div className="row gy-5 g-xxl-8">
      {chartQueries.map(
        (
          {
            query,
            chartType,
            title,
            unit,
            color,
            className,
            chartHeight,
            description,
            change,
          },
          index
        ) => {
          const chart = chartType === "RadarChart" ? "radarChart" : "chart";
          const { isLoading, chartData } = useChart({ query, chart });

          // Ensure ChartComponent cannot be undefined by asserting the type here
          const ChartComponent = chartComponents[
            chartType
          ] as React.ElementType;

          if (
            chartType === "BarChart" &&
            (!currentUser || !hasRole(currentUser, "superAdmin"))
          ) {
            return null;
          }

          return (
            <div className="col-lg-6" key={index}>
              {isLoading ? (
                <span>Loading...</span>
              ) : (
                <ChartComponent
                  totals={chartData.totals}
                  series={chartData.series}
                  chartTitle={title}
                  unit={unit}
                  xaxisCategories={chartData.xAxisCategories}
                  className={className}
                  color={color}
                  chartHeight={chartHeight}
                  change={change || ""}
                  description={description || ""}
                />
              )}
            </div>
          );
        }
      )}
    </div>
  );
}
