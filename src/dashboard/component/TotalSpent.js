import { Button, Card, Col, Row, Typography } from "antd";
import {
  CalendarOutlined,
  SignalFilled,
  CaretUpOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";
import LineChart from "../../components/charts/LineChart";
import {
  lineChartDataTotalSpent,
  lineChartOptionsTotalSpent,
} from "../../variables/Charts";

const TotalSpent = () => {
  return (
    <Card className="total-spent-container">
      <div className="btn-container">
        <Button style={{ color: "#b0bad7" }}>
          <CalendarOutlined />
          <span> This month</span>
        </Button>
        <Button>
          <SignalFilled className="icon-signal" />
        </Button>
      </div>
      <Row className="data-details">
        <Col span={8}>
          <Typography.Title level={2}>$37.5K</Typography.Title>
          <div className="total-details">
            <Typography>Total Spent</Typography>
            <div className="icon-spent">
              <CaretUpOutlined />
              <span> +2.45%</span>
            </div>
          </div>
          <div className="on-track">
            <CheckCircleFilled />
            <span> On track</span>
          </div>
        </Col>
        <Col span={16} className="line-chart-container">
          <LineChart />
        </Col>
      </Row>
    </Card>
  );
};

export default TotalSpent;
