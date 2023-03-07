import { Progress } from "antd";
import {
  CheckCircleFilled,
  CloseCircleFilled,
  InfoCircleFilled,
} from "@ant-design/icons";

export const columnsDataCheck = [
  {
    title: "NAME",
    dataIndex: "name",
  },
  {
    title: "PROGRESS",
    dataIndex: "progress",
    render: (progress) => <Progress percent={progress} status="active" />,
  },
  {
    title: "CUSTOMERS",
    dataIndex: "quantity",
  },
  {
    title: "MOST RECENT DEAL",
    dataIndex: "date",
  },
];
export const columnsDataComplex = [
  {
    title: "NAME",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "STATUS",
    dataIndex: "status",
    key: "status",
    render: (status) =>
      status === "Signed" ? (
        <>
          <CheckCircleFilled className="check-circle" />
          {status}
        </>
      ) : status === "At Risk" ? (
        <>
          <CloseCircleFilled className="close-circle" />
          {status}
        </>
      ) : (
        <>
          <InfoCircleFilled className="info-circle" /> {status}
        </>
      ),
  },
  {
    title: "DATE",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "PROGRESS",
    dataIndex: "progress",
    render: (progress) => <Progress percent={progress} status="active" />,
    key: "progress",
  },
];
