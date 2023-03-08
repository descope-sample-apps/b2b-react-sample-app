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
        <Button style={{ color: "#a3aed0" }}>
          <CalendarOutlined style={{ color: "#a3aed0" }} />
          <span> This month</span>
        </Button>
        <Button>
          <SignalFilled className="icon-signal" />
        </Button>
      </div>
      <Row className="data-details">
        <Col span={8}>
          <Typography.Title
            level={2}
            style={{ color: "#1b2559" }}
            className="font"
          >
            $37.5K
          </Typography.Title>
          <div className="total-details">
            <Typography style={{ color: "#a3aed0" }}>Total Spent</Typography>
            <div className="icon-spent">
              <CaretUpOutlined style={{ color: "#01b574", fontWeight: 700 }} />
              <span style={{ color: "#01b574", fontWeight: 700 }}> +2.45%</span>
            </div>
          </div>
          <div className="on-track">
            <CheckCircleFilled style={{ color: "#01b574", fontWeight: 700 }} />
            <span> On track</span>
          </div>
        </Col>
        <Col span={16} className="line-chart-container">
          <LineChart
            chartData={lineChartDataTotalSpent}
            chartOptions={lineChartOptionsTotalSpent}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default TotalSpent;
