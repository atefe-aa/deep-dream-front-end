import React, { useEffect, useRef } from "react";
import { useThemeMode } from "../../../../_metronic/partials";
import ApexCharts, { ApexOptions } from "apexcharts";
import { KTIcon } from "../../../../_metronic/helpers";
import clsx from "clsx";
import {
  getCSS,
  getCSSVariableValue,
} from "../../../../_metronic/assets/ts/_utils";
import { TEST_TYPES } from "../../../utils/constants";
import { FilterDropdown } from "../../../ui/search-and-filter/FilterDropdown";
import ScreenshotButton from "../../../ui/ScreenshotButton";

interface TotalItem {
  title: string;
  value: number | string;
  unit: string;
}

type Props = {
  className: string;
  svgIcon: string;
  color: string;
  description: string;
  totals: Array<TotalItem>;
  series: Array<ChartDataItem>;
  unit: string;
};
interface ChartDataItem {
  name: string;
  data: number[];
}
const RadarChart: React.FC<Props> = ({
  className,
  color,
  series,
  unit,
  description,
  totals,
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
      getChartOptions(height, labelColor, baseColor, lightColor, series, unit)
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
          <span className="text-gray-900 fw-bold fs-2">{description}</span>
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
          <FilterDropdown filters={["lab", "date", "testType"]} />
          {/* end::Menu  */}
        </div>
      </div>
      {/* end::Header  */}

      {/* begin::Body */}
      <div className="card-bod p-0 ">
        <div
          ref={chartRef}
          className="statistics-widget-4-chart card-rounded-bottom "
          style={{ height: "415px" }}
        ></div>

        {/* begin::Stats  */}
        <div className="card-rounded bg-secondary mt-n6 position-relative card-px py-15">
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

export { RadarChart };

function getChartOptions(
  height: number,
  labelColor: string,
  baseColor: string,
  lightColor: string,
  series: Array<ChartDataItem>,
  unit: string
): ApexOptions {
  const testTypes = TEST_TYPES.map((test) => test.title);

  return {
    series: series,
    chart: {
      fontFamily: "inherit",
      type: "radar",
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
    plotOptions: {
      radar: {
        polygons: {
          strokeColors: "var(--bs-gray-400",
          connectorColors: "var(--bs-gray-400",
          strokeWidth: "1px",
          fill: {
            colors: [],
          },
        },
        size: 180,
        offsetX: 50,
        offsetY: 0,
      },
    },
    legend: {
      show: true,
      position: "left",
      offsetX: 0,
      offsetY: 0,

      onItemClick: {
        toggleDataSeries: true,
      },
      labels: {
        colors: [labelColor],
        useSeriesColors: false,
      },
      markers: {
        width: 12,
        height: 12,
        strokeWidth: 0,
        strokeColor: baseColor,
        fillColors: [
          "#3379ff",
          "#f8934d",
          "#6fa91b",
          "#9e68d2",
          "#68c5d2",
          "#ea2694",
        ],
        radius: 12,
        customHTML: undefined,
        onClick: undefined,
        offsetX: 0,
        offsetY: 0,
      },
    },
    responsive: [
      {
        breakpoint: 1300,
        options: {
          plotOptions: {
            radar: {
              size: 130,
              offsetX: 0,
              offsetY: 0,
            },
          },
          legend: {
            offsetX: 0,
            offsetY: -20,
          },
          height: height + 100,
        },
      },
      {
        breakpoint: 1000,
        options: {
          plotOptions: {
            radar: {
              size: 180,
              offsetX: 0,
              offsetY: 0,
            },
          },
          legend: {
            offsetX: 0,
            offsetY: 0,
          },
          height: height,
        },
      },
      {
        breakpoint: 700,
        options: {
          plotOptions: {
            radar: {
              size: 130,
              offsetX: 0,
              offsetY: 0,
            },
          },
          legend: {
            offsetX: 0,
            offsetY: -20,
          },
          height: height + 100,
        },
      },
    ],
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: "solid",
      opacity: 0,
    },
    stroke: {
      curve: "smooth",
      show: true,
      width: 2,
      colors: [
        "#3379ff",
        "#f8934d",
        "#6fa91b",
        "#9e68d2",
        "#68c5d2",
        "#ea2694",
      ],
    },
    xaxis: {
      categories: testTypes,
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
          color: labelColor,
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
        show: false,
        style: {
          colors: labelColor,
          fontSize: "12px",
        },
      },
      axisBorder: {
        color: "red",
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
    markers: {
      strokeColors: "var(--bs-gray-700",
      colors: "var(--bs-gray-400",
      // colors:[],
      size: 3,
      hover: {
        size: 5,
      },
    },
  };
}
