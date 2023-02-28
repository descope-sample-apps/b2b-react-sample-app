import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const PieChart = () => {
  const [state, setState] = useState({
    chartData: [63, 25, 12],
    chartOptions: {
      labels: ["US", "Canada", "Other Markets"],
      colors: ["#4318FF", "#6AD2FF", "#EFF4FB"],
      chart: {
        width: "50px",
      },
      states: {
        hover: {
          filter: {
            type: "none",
          },
        },
      },
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      hover: { mode: null },
      plotOptions: {
        donut: {
          expandOnClick: false,
          donut: {
            labels: {
              show: false,
            },
          },
        },
      },
      fill: {
        colors: ["#4318FF", "#6AD2FF", "#EFF4FB"],
      },
      tooltip: {
        enabled: true,
        theme: "dark",
      },
    },
  });

  return (
    <ReactApexChart
      options={state.chartOptions}
      series={state.chartData}
      type="pie"
      width="100%"
      height="100%"
    />
  );
};

export default PieChart;
