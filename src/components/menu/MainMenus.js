import { UserOutlined, BulbOutlined, SettingOutlined } from "@ant-design/icons";
import { Dropdown, Space, theme } from "antd";

import "./mainMenu.scss";

const MainMenus = () => {
  const { useToken } = theme;
  const { token } = useToken();
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
    <>
      <Dropdown
        menu={{
          items,
        }}
        style={{ background: token.menuBgColor }}
        className="dropdown"
      >
        <Space>...</Space>
      </Dropdown>
    </>
  );
};

export default MainMenus;
