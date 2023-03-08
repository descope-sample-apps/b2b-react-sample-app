import { Card, Typography } from "antd";
import React from "react";
import PieChart from "../../components/charts/PieChart";

const PieCard = () => {
  return (
    <Card className="pi-wrapper">
      <div className="pie-container">
        <Typography style={{ fontSize: 16, color: "#1b2559", fontWeight: 700 }}>
          Market Breakdown
        </Typography>
        <select className="select-container">
          <option value="daily">Daily</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>
      <div className="pie-chart">
        <PieChart />
      </div>
      <div className="chart-detail">
        <div className="abc">
          <div className="flex-place">
            <div className="chart-series us-col" />
            <Typography style={{ color: "#a3aed0" }}>US</Typography>
          </div>
          <Typography
            style={{ fontSize: 16, color: "#1b2559", fontWeight: 700 }}
          >
            63%
          </Typography>
        </div>
        <div className="abc">
          <div className="flex-place">
            <div className="chart-series canada-col" />
            <Typography style={{ color: "#a3aed0" }}>Canada</Typography>
          </div>
          <Typography
            style={{ fontSize: 16, color: "#1b2559", fontWeight: 700 }}
          >
            25%
          </Typography>
        </div>
        <div className="abc">
          <div className="flex-place">
            <div className="chart-series other-col" />
            <Typography style={{ color: "#a3aed0" }}>Other Markets</Typography>
          </div>
          <Typography
            style={{ fontSize: 16, color: "#1b2559", fontWeight: 700 }}
          >
            63%
          </Typography>
        </div>
      </div>
    </Card>
  );
};

export default PieCard;
