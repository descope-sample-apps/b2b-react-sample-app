import { Card, Typography } from "antd";
import { CaretUpOutlined } from "@ant-design/icons";
import BarChartDailyTraffic from "../../components/charts/BarChartDailyTraffic";

const DailyTraffic = () => {
  return (
    <Card className="daily-traffic-container">
      <Typography style={{ color: "#a3aed0", fontWeight: 500 }}>
        Deal Traffic
      </Typography>
      <div>
        <Typography.Title level={2}>2,579</Typography.Title>
        <div className="total-details">
          <Typography style={{ color: "#a3aed0", fontWeight: 500 }}>
            Active Deals
          </Typography>
          <div className="icon-spent">
            <CaretUpOutlined style={{ color: "#01b574", fontWeight: 700 }} />
            <span style={{ color: "#01b574", fontWeight: 700 }}> +2.45%</span>
          </div>
        </div>
      </div>
      <div className="bar-chart">
        <BarChartDailyTraffic />
      </div>
    </Card>
  );
};

export default DailyTraffic;
