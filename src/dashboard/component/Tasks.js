import { Card, Checkbox, Dropdown, Space, Typography } from "antd";
import { CheckSquareFilled, DragOutlined } from "@ant-design/icons";
import { UserOutlined, BulbOutlined, SettingOutlined } from "@ant-design/icons";

const Tasks = () => {
  const items = [
    {
      key: "1",
      label: "Panel 1",
      icon: <UserOutlined />,
    },
    {
      key: "2",
      label: "Panel2",
    },
    {
      key: "3",
      label: "Panel3",
      icon: <BulbOutlined />,
    },
    {
      key: "4",
      label: "Panel4",
      icon: <SettingOutlined />,
    },
  ];

  return (
    <Card>
      <div className="task-container">
        <CheckSquareFilled style={{ fontSize: 23, color: "#4318ff" }} />
        <Typography.Title level={4}>Your Tasks</Typography.Title>
        <Dropdown
          menu={{
            items,
          }}
          className="revenue-dropdown"
        >
          <Space>...</Space>
        </Dropdown>
      </div>
      <Space className="task-wrapper">
        <div className="task-data">
          <Checkbox />
          <Typography.Title level={5}>Sentrigo follow-up</Typography.Title>
          <DragOutlined />
        </div>
        <div className="task-data">
          <Checkbox />
          <Typography.Title level={5}>Descope onboarding</Typography.Title>
          <DragOutlined />
        </div>
        <div className="task-data">
          <Checkbox />
          <Typography.Title level={5}>Solidcore onboarding</Typography.Title>
          <DragOutlined />
        </div>
        <div className="task-data">
          <Checkbox />
          <Typography.Title level={5}>Quarterly update</Typography.Title>
          <DragOutlined />
        </div>
        <div className="task-data">
          <Checkbox defaultChecked />
          <Typography.Title level={5}>Swim in coffee</Typography.Title>
          <DragOutlined />
        </div>
      </Space>
    </Card>
  );
};

export default Tasks;
