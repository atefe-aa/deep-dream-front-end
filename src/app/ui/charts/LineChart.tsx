import React, { useEffect, useRef } from "react";
import { useThemeMode } from "../../../_metronic/partials";
import ApexCharts, { ApexOptions } from "apexcharts";
import { KTIcon } from "../../../_metronic/helpers";
import clsx from "clsx";
import {
  getCSS,
  getCSSVariableValue,
} from "../../../_metronic/assets/ts/_utils";
import { FilterDropdown } from "../serach-and-filter/FilterDropdown";

type Props = {
  className: string;
  svgIcon: string;
  color: string;
  change: string;
  description: string;
};

const LineChart: React.FC<Props> = ({
  className,
  svgIcon,
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

    const height = parseInt(getCSS(chartRef.current, "height"));
    const labelColor = getCSSVariableValue("--bs-gray-800");
    const baseColor = getCSSVariableValue("--bs-" + color);
    const lightColor = getCSSVariableValue("--bs-" + color + "-light");

    const chart = new ApexCharts(
      chartRef.current,
      getChartOptions(height, labelColor, baseColor, lightColor)
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

  return (
    <div className={`card ${className}`}>
      {/* begin::Header  */}
      <div className={`card-header border-0  py-5`}>
        <div className="d-flex flex-column">
          <span className="text-gray-900 fw-bold fs-2">{change}</span>
          <span className="text-muted fw-semibold mt-1">{description}</span>
        </div>
        <div className="card-toolbar">
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
            <KTIcon iconName="category" className="fs-2" />
          </button>
          <FilterDropdown />
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
          style={{ height: "335px" }}
        ></div>

        {/* begin::Stats  */}
        <div className="card-rounded bg-body mt-n10 position-relative card-px py-15">
          {/* begin::Row  */}
          <div className="row g-0">
            {/* begin::Col  */}
            <div className="col mx-5">
              <div className="fs-6 text-gray-500">total</div>
              <div className="fs-5 fw-bold text-gray-800">2000 R</div>
            </div>{" "}
            <div className="col mx-5">
              <div className="fs-6 text-gray-500">total</div>
              <div className="fs-5 fw-bold text-gray-800">2000 R</div>
            </div>
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
  height: number,
  labelColor: string,
  baseColor: string,
  lightColor: string
): ApexOptions {
  return {
    series: [
      {
        name: "Net Profit",
        data: [40, 40, 30, 30, 35, 35, 50],
      },
    ],
    chart: {
      fontFamily: "inherit",
      type: "area",
      height: height,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      sparkline: {
        enabled: true,
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
      opacity: 1,
    },
    stroke: {
      curve: "smooth",
      show: true,
      width: 3,
      colors: [baseColor],
    },
    xaxis: {
      categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
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
      min: 0,
      max: 60,
      labels: {
        show: false,
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
          return val + " (R)";
        },
      },
    },
    colors: [lightColor],
    markers: {
      colors: [lightColor],
      strokeColors: [baseColor],
      strokeWidth: 3,
    },
  };
}
