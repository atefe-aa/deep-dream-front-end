import React, { useEffect, useRef } from "react";
import { useThemeMode } from "../../../_metronic/partials";
import ApexCharts, { ApexOptions } from "apexcharts";
import { KTIcon } from "../../../_metronic/helpers";
import clsx from "clsx";
import {
  getCSS,
  getCSSVariableValue,
} from "../../../_metronic/assets/ts/_utils";
import { TEST_TYPES } from "../../utils/constants";

type Props = {
  className: string;
  svgIcon: string;
  color: string;
  change: string;
  description: string;
  series: Array<ChartDataItem>;
  unit: string;
};
interface ChartDataItem {
  name: string;
  data: number[];
}
const RadarChart: React.FC<Props> = ({ className, color, series, unit , description}) => {
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

  return (
    <div className={`card ${className}`}>
      {/* begin::Body */}
      <div className="card-bod p-0 ">
      <div className="d-flex flex-stack card-p flex-grow-1">
        

          <div className="d-flex flex-column text-end">
          
            <span className="fs-6 fw-bold">{description}</span>
          </div>
        </div>
        <div
          ref={chartRef}
          className="statistics-widget-4-chart card-rounded-bottom "
          style={{ height: "465px" }}
        ></div>
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
    plotOptions: {},
    legend: {
      show: true,
      position: "left",
      offsetX: 0,
      offsetY: 0,

      onItemClick: {
        toggleDataSeries: true,
      },
      labels: {
        colors: ["--bs-gray-800"],
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
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: "solid",
      opacity: 0.2,
    },
    stroke: {
      curve: "smooth",
      show: true,
      width: 3,
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
          color: "--bs-gray-800",
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
          return val + unit;
        },
      },
    },
    colors: [lightColor],
    markers: {
      //   colors: [lightColor, 'white','yellow','red','blue'],
      //   strokeColors: [baseColor],
      //   strokeWidth: 3,
    },
  };
}
