import {
  AppleFilled,
  WindowsFilled,
  AndroidFilled,
  CheckCircleFilled,
  CloseCircleFilled,
  InfoCircleFilled,
} from "@ant-design/icons";
import { Progress } from "antd";

export const columnsDataDevelopment = [
  {
    title: "NAME",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "PLATFORM",
    dataIndex: "tech",
    key: "tech",
    render: (tech) => (
      <span>
        {tech.map((item) => {
          if (item === "apple") {
            return <AppleFilled style={{ color: "#9ca5b1" }} />;
          } else if (item === "android") {
            return <AndroidFilled style={{ color: "#9ca5b1" }} />;
          } else if (item === "windows") {
            return <WindowsFilled style={{ color: "#9ca5b1" }} />;
          }
          return { item };
        })}
      </span>
    ),
  },

  {
    title: "RELEASE DATE",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "PROGRESS",
    dataIndex: "progress",
    key: "progress",
    render: (progress) => <Progress percent={progress} status="active" />,
  },
];

export const columnsDataCheck = [
  {
    title: "NAME",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "QUOTA",
    dataIndex: "quota",
    key: "quota",
  },
  {
    title: "COMMISSION",
    dataIndex: "commission",
    key: "commission",
  },
  {
    title: "DATE",
    dataIndex: "date",
    key: "date",
  },
];

export const columnsDataColumns = [
  {
    title: "NAME",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "PROGRESS",
    dataIndex: "progress",
    key: "progress",
    render: (progress) => <Progress percent={progress} status="active" />,
  },
  {
    title: "QUANTITY",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "DATE",
    dataIndex: "date",
    key: "date",
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
      status === "Approved" ? (
        <>
          <CheckCircleFilled className="check-circle" />
          {status}
        </>
      ) : status === "Disable" ? (
        <>
          <CloseCircleFilled className="close-circle" /> {status}
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
    key: "progress",
    render: (progress) => <Progress percent={progress} status="active" />,
  },
];
