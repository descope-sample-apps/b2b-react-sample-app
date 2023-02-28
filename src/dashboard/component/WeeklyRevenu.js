import { Button, Card, Typography } from "antd";
import { SignalFilled } from "@ant-design/icons";
import BarChart from "../../components/charts/BarChart";

const WeeklyRevenu = () => {
  return (
    <Card className="total-spent-container">
      <div className="btn-container">
        <Typography style={{ fontSize: 20 }}> Weekly Revenue</Typography>
        <Button>
          <SignalFilled className="icon-signal" />
        </Button>
      </div>
      <div className="bar-container">
        <BarChart />
      </div>
    </Card>
  );
};

export default WeeklyRevenu;
