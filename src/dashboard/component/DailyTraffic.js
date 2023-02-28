import { Card, Typography } from "antd";
import { CaretUpOutlined } from "@ant-design/icons";
import BarChartDailyTraffic from "../../components/charts/BarChartDailyTraffic";

const DailyTraffic = () => {
  return (
    <Card className="daily-traffic-container">
      <Typography style={{ color: "#b0bad7" }}>Deal Traffic</Typography>
      <div>
        <Typography.Title level={2}>2,579</Typography.Title>
        <div className="total-details">
          <Typography style={{ color: "#b0bad7" }}>Active Deals</Typography>
          <div className="icon-spent">
            <CaretUpOutlined />
            <span> +2.45%</span>
          </div>
        </div>
      </div>
      <div>
        <BarChartDailyTraffic />
      </div>
    </Card>
  );
};

export default DailyTraffic;
