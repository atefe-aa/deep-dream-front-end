import { useEffect, useRef, FC } from "react";
import ApexCharts, { ApexOptions } from "apexcharts";
import { getCSSVariableValue } from "../../../../_metronic/assets/ts/_utils";
import { useThemeMode } from "../../../../_metronic/partials";
import { KTIcon } from "../../../../_metronic/helpers";
import clsx from "clsx";
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
  chartHeight: string;
  chartTitle: string;
  totals: Array<TotalItem>;
  series: Array<ChartDataItem>;
  xaxisCategories: object;

  unit: string;
};

const BarChart: FC<Props> = ({
  className,
  color,
  chartHeight,
  chartTitle,
  totals,
  series,
  xaxisCategories,
  unit,
}) => {
  const chartRef = useRef<HTMLDivElement | null>(null);

  const targetComponentRef = useRef(null);

  const { mode } = useThemeMode();
  const refreshChart = () => {
    if (!chartRef.current) {
      return;
    }

    const chart = new ApexCharts(
      chartRef.current,
      chartOptions(chartHeight, series, xaxisCategories, unit)
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
  }, [chartRef, mode]);

  return (
    <div className={`card ${className}`} ref={targetComponentRef}>
      {/* begin::Header  */}
      <div className={`card-header border-0 py-5`}>
        <h3 className="card-title fw-bold ">{chartTitle}</h3>

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
          <FilterDropdown filters={["date"]} />
          {/* end::Menu  */}
        </div>
      </div>
      {/* end::Header  */}

      {/* begin::Body  */}
      <div className="card-body p-0">
        {/* begin::Chart  */}
        <div
          ref={chartRef}
          className={`mixed-widget-12-chart card-rounded-bottom `}
        ></div>
        {/* end::Chart  */}

        {/* begin::Stats  */}
        <div className="card-rounded bg-secondary mt-n6 position-relative card-px py-15">
          {/* begin::Row  */}
          <div className=" g-0 d-flex justify-content-around">
            {/* begin::Col  */}
            {totals.map((total) => (
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
        {/* end::Stats  */}
      </div>
      {/* end::Body  */}
    </div>
  );
};

const chartOptions = (
  chartHeight: string,
  series: Array<ChartDataItem>,
  xaxisCategories: object,
  unit: string
): ApexOptions => {
  const labelColor = getCSSVariableValue("--bs-gray-600");
  const borderColor = getCSSVariableValue("--bs-gray-600");

  return {
    series: series,
    chart: {
      fontFamily: "inherit",
      type: "bar",
      height: chartHeight,
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "10%",
        borderRadius: 5,
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 1,
      colors: ["transparent"],
    },
    xaxis: {
      categories: xaxisCategories,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: labelColor,
          fontSize: "12px",
          fontWeight: "900",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: labelColor,
          fontSize: "12px",
          fontWeight: "900",
        },
      },
    },
    fill: {
      type: ["solid", "solid"],
      opacity: [1, 0.25],
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
      marker: {
        show: false,
      },
    },
    colors: ["#31a539", "#ffffff"],
    grid: {
      borderColor: borderColor,
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
};

export { BarChart };
