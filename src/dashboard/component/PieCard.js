import { Card, Typography } from "antd";
import React from "react";
import PieChart from "../../components/charts/PieChart";

const PieCard = () => {
  return (
    <Card className="pi-wrapper">
      <div className="pie-container">
        <Typography.Title level={5}>Market Breakdown</Typography.Title>
        <select className="select-container">
          <option value="daily">Daily</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>
      <div>
        <PieChart />
      </div>
      <div className="chart-detail">
        <div className="abc">
          <div className="flex-place">
            <div className="chart-series us-col" />
            <Typography>US</Typography>
          </div>
          <Typography>63%</Typography>
        </div>
        <div className="abc">
          <div className="flex-place">
            <div className="chart-series canada-col" />
            <Typography>Canada</Typography>
          </div>
          <Typography>25%</Typography>
        </div>
        <div className="abc">
          <div className="flex-place">
            <div className="chart-series other-col" />
            <Typography>Other Markets</Typography>
          </div>
          <Typography>63%</Typography>
        </div>
      </div>
    </Card>
  );
};

export default PieCard;
