import { Divider, Menu } from "antd";
import logo_Dolrr from "../../assets/logo_dolrr.svg";
import { useNavigate } from "react-router-dom";
import { HomeFilled, SignalFilled } from "@ant-design/icons";
import "./sidebar.scss";

const Sidebar = () => {
  const navigate = useNavigate();
  const getItem = (label, key, icon) => {
    return {
      key,
      icon,
      label,
    };
  };
  const items = [
    getItem("Your Rev Dashboard", "/admin", <HomeFilled />),
    getItem("Admin Dashboard", "/admin/data-tables", <SignalFilled />),
  ];
  return (
    <section className="sidebar-container">
      <div>
        <img src={logo_Dolrr} alt="dolrr-logo" className="img-dolrr" />
      </div>
      <Divider className="divider" />
      <Menu
        onClick={({ key }) => {
          navigate(key);
        }}
        defaultSelectedKeys={["1"]}
        items={items}
      />
    </section>
  );
};

export default Sidebar;
