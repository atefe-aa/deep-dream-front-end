import React, { useEffect, useRef } from "react";
import { useThemeMode } from "../../../../_metronic/partials";
import ApexCharts, { ApexOptions } from "apexcharts";
import { KTIcon } from "../../../../_metronic/helpers";
import clsx from "clsx";
import {
  getCSS,
  getCSSVariableValue,
} from "../../../../_metronic/assets/ts/_utils";
import { FilterDropdown } from "../../../ui/search-and-filter/FilterDropdown";
import ScreenshotButton from "../../../ui/ScreenshotButton";

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
  change: string | null | undefined;
  description: string;
  chartHeight: string;
  chartTitle: string;
  totals: Array<TotalItem>;
  series: Array<ChartDataItem>;
  xaxisCategories: object;
  unit: string;
};

const LineChart: React.FC<Props> = ({
  className,
  chartHeight,
  chartTitle,
  totals,
  series,
  xaxisCategories,
  unit,
  color,
  change,
  description,
}) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const { mode } = useThemeMode();
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
        chartHeight,
        labelColor,
        baseColor,
        lightColor,
        series,
        xaxisCategories,
        unit
      )
    );
    if (chart) {
      chart.render();
    }

    return chart;
  };

  useEffect(() => {
    const chart = refreshChart();
    return () => {
      if (chart) {
        chart.destroy();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartRef, color, mode]);
  const targetComponentRef = useRef(null);
  return (
    <div className={`card ${className}`} ref={targetComponentRef}>
      {/* begin::Header  */}
      <div className={`card-header border-0  py-5`}>
        <div className="d-flex flex-column">
          <span className="text-gray-900 fw-bold fs-2">{change}</span>
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
          <FilterDropdown filters={["lab", "date"]} />
          {/* end::Menu  */}
        </div>
      </div>
      {/* end::Header  */}

      {/* begin::Body */}
      <div className="card-body p-0">
        <div className="d-flex flex-stack card-p flex-grow-1">
          {/* <div className="d-flex flex-column text-end">
            <span className="text-gray-900 fw-bold fs-2">{change}</span>

            <span className="text-muted fw-semibold mt-1">{description}</span>
          </div> */}
        </div>

        <div
          ref={chartRef}
          className="statistics-widget-4-chart card-rounded-bottom"
        ></div>

        {/* begin::Stats  */}
        <div className="card-rounded bg-secondary mt-n6 position-relative card-px py-15 ">
          {/* begin::Row  */}
          <div className=" g-0  d-flex justify-content-around">
            {/* begin::Col  */}
            {totals.map((total) => (
              <div key={total.title} className=" mx-5">
                <div className="fs-6 text-gray-700">{total.title}</div>
                <div className="fs-5 fw-bold text-gray-800">
                  {total.value} {total.unit}
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
  chartHeight: string,
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
      height: chartHeight,
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
