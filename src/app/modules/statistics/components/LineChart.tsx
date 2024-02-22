import React, { useEffect, useMemo, useRef, useState } from "react";
import { useThemeMode } from "../../../../_metronic/partials";
import ApexCharts, { ApexOptions } from "apexcharts";
import {
  KTIcon,
  isNotEmpty,
  stringifyFilterChartQuery,
} from "../../../../_metronic/helpers";
import clsx from "clsx";
import {
  getCSS,
  getCSSVariableValue,
} from "../../../../_metronic/assets/ts/_utils";
import { FilterDropdown } from "../../../ui/search-and-filter/FilterDropdown";
import ScreenshotButton from "../../../ui/ScreenshotButton";
import { useFilterChart } from "../../../ui/search-and-filter/FilterChartProvider";
import { useChart } from "../hooks/useChart";
import { FilterState } from "../../../ui/search-and-filter/_models";
import { Spinner } from "react-bootstrap";
import { useAuth } from "../../auth";
import { hasRole } from "../../../utils/helper";

interface TotalItem {
  title: string;
  value: number | string;
  unit: string;
}
interface ChartDataItem {
  name: string;
  data: number[];
}
type Props = {
  className: string;
  color: string;
  description: string;
  unit: string;
  y: string;
};

const LineChart: React.FC<Props> = ({
  className,
  unit,
  color,
  description,
  y,
}) => {
  const { currentUser } = useAuth();
  const chartRef = useRef<HTMLDivElement | null>(null);
  const { mode } = useThemeMode();

  const { state, updateState } = useFilterChart();
  const lineChart = state.lineChart;
  const initialQuery =
    `x=testTypes&y=${y}&` + stringifyFilterChartQuery(lineChart);
  const [query, setQuery] = useState<string>(initialQuery);
  const updatedQuery = useMemo(
    () => stringifyFilterChartQuery(lineChart),
    [lineChart]
  );

  useEffect(() => {
    if (query !== updatedQuery) {
      setQuery(`x=testTypes&y=${y}&` + updatedQuery);
    }
  }, [updatedQuery, query]);

  const { isLoading, chartData } = useChart({ query, chart: "chart" });

  const onChangeFilters = (filters: FilterState) => {
    updateState("lineChart", filters);
  };

  const refreshChart = () => {
    if (!chartRef.current) {
      return;
    }

    const labelColor = getCSSVariableValue("--bs-gray-800");
    const baseColor = getCSSVariableValue("--bs-" + color);
    const lightColor = getCSSVariableValue("--bs-" + color + "-light");

    const chart = new ApexCharts(
      chartRef.current,
      getChartOptions(
        labelColor,
        baseColor,
        lightColor,
        chartData.series,
        chartData.xAxisCategories,
        unit
      )
    );
    if (chart) {
      chart.render();
    }

    return chart;
  };

  useEffect(() => {
    if (isLoading || !chartData.series || !chartData.xAxisCategories) {
      return;
    }

    const chart = refreshChart();
    return () => {
      if (chart) {
        chart.destroy();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartRef, color, mode, isLoading, chartData, query]);

  const targetComponentRef = useRef(null);

  const superAdminChartTitle =
    lineChart.laboratories.length !== 0
      ? "Selected Laboratories"
      : "All Laboratories";
  return (
    <div className={`card ${className}`} ref={targetComponentRef}>
      {/* begin::Header  */}
      <div className={`card-header border-0  py-5`}>
        <div className="d-flex flex-column">
          <span className="text-gray-900 fw-bold fs-2">
            {currentUser && hasRole(currentUser, ["superAdmin"])
              ? superAdminChartTitle
              : currentUser?.data.labName}
          </span>
        
            {lineChart.testTypes.length !== 0 &&  <span className="text-gray-900 fw-bold fs-4"> Selected Test Types </span>}
         
          <span className="text-muted fw-semibold mt-1">{description}</span>
        </div>
        <div className="card-toolbar">
          <ScreenshotButton
            withTitle={false}
            targetComponentRef={targetComponentRef}
          />
          {/* begin::Menu  */}
          <button
            type="button"
            className={clsx(
              "btn btn-sm btn-icon btn-color-white btn-active-white",
              `btn-active-color-${color}`,
              "border-0 me-n3"
            )}
            data-kt-menu-trigger="click"
            data-kt-menu-placement="bottom-end"
            data-kt-menu-flip="top-end"
          >
            <KTIcon iconName="category" className="fs-2 text-info" />
          </button>
          <FilterDropdown
            onSubmit={onChangeFilters}
            componentName="lineChart"
            filterTypes={["lab", "date", "testType"]}
          />
          {/* end::Menu  */}
        </div>
      </div>
      {/* end::Header  */}

      {/* begin::Body */}
      <div className="card-body p-0">
        <div className="d-flex flex-stack card-p flex-grow-1"></div>
        {isLoading ? (
          <Spinner animation="grow" />
        ) : (
          <div
            ref={chartRef}
            className="statistics-widget-4-chart card-rounded-bottom"
          ></div>
        )}
        {/* begin::Stats  */}
        <div className="card-rounded bg-secondary mt-n6 position-relative card-px py-15 ">
          {/* begin::Row  */}
          <div className=" g-0  d-flex justify-content-around">
            {/* begin::Col  */}
            {chartData.totals &&
              chartData.totals.map((total: TotalItem) => (
                <div key={total.title} className=" mx-5">
                  <div className="fs-6 text-gray-700">{total.title}</div>
                  <div className="fs-5 fw-bold text-gray-800">
                    {total.unit === "(R)"
                      ? total.value.toLocaleString()
                      : total.value}{" "}
                    {total.unit}
                  </div>
                </div>
              ))}

            {/* end::Col  */}
          </div>
          {/* end::Row  */}
        </div>
      </div>
      {/* end::Body */}
    </div>
  );
};

export { LineChart };

function getChartOptions(
  labelColor: string,
  baseColor: string,
  lightColor: string,
  series: Array<ChartDataItem>,
  xaxisCategories: object,
  unit: string
): ApexOptions {
  return {
    series: series,
    chart: {
      fontFamily: "inherit",
      type: "area",
      height: "400px",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      sparkline: {
        enabled: false,
      },
    },
    plotOptions: {},
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: "solid",
      opacity: 0.8,
    },
    stroke: {
      curve: "smooth",
      show: true,
      width: 3,
      colors: [baseColor],
    },
    xaxis: {
      categories: xaxisCategories,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: true,
      },
      labels: {
        show: true,
        style: {
          colors: labelColor,
          fontSize: "12px",
        },
      },
      crosshairs: {
        show: false,
        position: "front",
        stroke: {
          color: "#E4E6EF",
          width: 1,
          dashArray: 3,
        },
      },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      labels: {
        show: true,
        style: {
          colors: labelColor,
          fontSize: "12px",
        },
      },
    },
    states: {
      normal: {
        filter: {
          type: "none",
          value: 0,
        },
      },
      hover: {
        filter: {
          type: "none",
          value: 0,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: "none",
          value: 0,
        },
      },
    },
    tooltip: {
      style: {
        fontSize: "12px",
      },
      y: {
        formatter: function (val) {
          return val.toLocaleString() + unit;
        },
      },
    },
    colors: [lightColor],
    markers: {
      colors: [lightColor],
      strokeColors: [baseColor],
      strokeWidth: 3,
    },
    grid: {
      borderColor: labelColor,
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        left: 20,
        right: 20,
      },
    },
  };
}
