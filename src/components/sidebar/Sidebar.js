import { Divider, Menu } from "antd";
import logo_Dolrr from "../../assets/logo_dolrr.svg";
import { useNavigate } from "react-router-dom";
import "./sidebar.scss";
import { MdBarChart, MdHome, MdKey } from "react-icons/md";
import { getSessionToken, getJwtRoles } from '@descope-int/react-dynamic-sdk'

const getItem = (label, key, icon) => {
  return {
    key,
    icon,
    label,
  };
};
const items = [
  getItem("Your Rev Dashboard", "/", <MdHome style={{ fontSize: '1.2em' }} />),
  getItem("Admin Dashboard", "/admin/data-tables", <MdBarChart style={{ fontSize: '1.5em' }} />),
  getItem("SSO Setup", "/admin/sso-setup", <MdKey style={{ fontSize: '1.5em' }} />),
];

const getItems = () => {
  return items.filter(item => item.label !== "Admin Dashboard" || isTenantAdmin());
}

const isTenantAdmin = () => {
  const sessionToken = getSessionToken();
  const roles = getJwtRoles(sessionToken);
  return roles !== undefined && roles.includes("Tenant Admin");
}


const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <section className="sidebar-container">
      <div>
        <img src={logo_Dolrr} alt="dolrr-logo" className="img-dolrr" />
      </div>
      <Divider className="divider" />
      <Menu
        onClick={({ key }) => {
          navigate(key, { state: items.find((elm) => elm.key === key).label });
        }}
        items={getItems()}
        selectedKeys={[window.location.pathname]}
      />
    </section>
  );
};

export default Sidebar;
