import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const LineChart = () => {
  const [state, setState] = useState({
    chartData: [
      {
        name: "Revenue",
        data: [50, 64, 48, 66, 49, 68],
      },
      {
        name: "Profit",
        data: [30, 40, 24, 46, 20, 46],
      },
    ],
    chartOptions: {
      chart: {
        toolbar: {
          show: false,
        },
        dropShadow: {
          enabled: true,
          top: 13,
          left: 0,
          blur: 10,
          opacity: 0.1,
          color: "#4318FF",
        },
      },
      colors: ["#4318FF", "#39B8FF"],
      markers: {
        size: 0,
        colors: "white",
        strokeColors: "#7551FF",
        strokeWidth: 3,
        strokeOpacity: 0.9,
        strokeDashArray: 0,
        fillOpacity: 1,
        discrete: [],
        shape: "circle",
        radius: 2,
        offsetX: 0,
        offsetY: 0,
        showNullDataPoints: true,
      },
      tooltip: {
        theme: "dark",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        type: "line",
      },
      xaxis: {
        type: "numeric",
        categories: ["SEP", "OCT", "NOV", "DEC", "JAN", "FEB"],
        labels: {
          style: {
            colors: "#A3AED0",
            fontSize: "12px",
            fontWeight: "500",
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        show: false,
      },
      legend: {
        show: false,
      },
      grid: {
        show: false,
        column: {
          color: ["#7551FF", "#39B8FF"],
          opacity: 0.5,
        },
      },
      color: ["#7551FF", "#39B8FF"],
    },
  });

  return (
    <ReactApexChart
      options={state.chartOptions}
      series={state.chartData}
      type="line"
      width="100%"
      height="100%"
    />
  );
};

export default LineChart;
