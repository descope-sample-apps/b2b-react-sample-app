import { Col, Row, Space } from "antd";
import {
  SignalFilled,
  DollarCircleFilled,
  FileFilled,
} from "@ant-design/icons";
import CardData from "./component/CardData";
import "./dashboard.scss";
import DataTable from "./component/DataTable";
import TotalSpent from "./component/TotalSpent";
import WeeklyRevenu from "./component/WeeklyRevenu";
import DailyTraffic from "./component/DailyTraffic";
import PieCard from "./component/PieCard";
import CheckTable from "./component/CheckTable";
import MiniCalendar from "../components/calender/MiniCalendar";
import Tasks from "./component/Tasks";
import {
  columnsDataCheck,
  columnsDataComplex,
} from "../dashboard/variables/ColumnsData";
import tableDataCheck from "../dashboard/variables/tableDataCheck.json";
import tableDataComplex from "../dashboard/variables/tableDataComplex.json";
import PriorityDeals from "./component/PriorityDeals";
import { useSession } from "@descope/react-sdk";
import { useNavigate } from "react-router-dom";
import { redirect } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <Space size="large" className="carddata-space">
        <Row gutter={[14, 14]}>
          <Col xs={24} sm={12} md={8} lg={8} xl={4}>
            <CardData
              icon={<SignalFilled />}
              name="Revenu"
              value="$350.4"
              className="data-style"
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={8} xl={4}>
            <CardData
              icon={<DollarCircleFilled />}
              name="Pipleline"
              value="$642.39"
              className="data-style"
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={8} xl={4}>
            <DataTable
              name="Pipleline"
              value="$642.39"
              className="data-style"
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={8} xl={4}>
            <CardData name="Top Market" value="$1,000" className="data-style" />
          </Col>
          <Col xs={24} sm={12} md={8} lg={8} xl={4}>
            <CardData name="New Deals" value="154" className="data-style" />
          </Col>
          <Col xs={24} sm={12} md={8} lg={8} xl={4}>
            <CardData
              icon={<FileFilled />}
              name="Total Deals"
              value="2935"
              className="data-style"
            />
          </Col>
        </Row>
      </Space>

      <Space size="large" className="third-row">
        <Row gutter={[14, 14]}>
          <Col xs={24} sm={12}>
            <TotalSpent />
          </Col>
          <Col xs={24} sm={12}>
            <WeeklyRevenu />
          </Col>
        </Row>
      </Space>

      <Space size="middle" className="forth-row">
        <Row className="forth-row-container" gutter={[14, 14]}>
          <Col sm={24} md={24} lg={12} className="col-one">
            <CheckTable
              columnsDataCheck={columnsDataCheck}
              tableDataCheck={tableDataCheck}
            />
          </Col>
          <Col sm={24} md={24} lg={12} className="space-chart">
            <DailyTraffic className="container" />
            <PieCard className="container" />
          </Col>
        </Row>
      </Space>

      <Space size="middle" className="fifth-row">
        <Row gutter={[14, 14]}>
          <Col sm={24} md={24} lg={12} className="col-one">
            <PriorityDeals
              columnsData={columnsDataComplex}
              tableData={tableDataComplex}
            />
          </Col>
          <Col sm={24} md={24} lg={12} className="container">
            <Tasks />
            <MiniCalendar />
          </Col>
        </Row>
      </Space>
    </>
  );
};

export default Dashboard;
