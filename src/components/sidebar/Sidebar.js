import { Divider, Menu } from "antd";
import logo_Dolrr from "../../assets/logo_dolrr.svg";
import { useNavigate } from "react-router-dom";
import "./sidebar.scss";
import { MdBarChart, MdAccountTree, MdManageAccounts, MdApps, MdVerifiedUser, MdHome, MdKey } from "react-icons/md";
import { useUser, useSession } from '@descope/react-sdk'


const getItem = (label, key, icon) => {
  return {
    key,
    icon,
    label,
  };
};



const items = [
  getItem("Your Rev Dashboard", "/", <MdHome style={{ fontSize: '1.2em'}} />),
  getItem("Admin Dashboard", "/admin/data-tables", <MdBarChart style={{ fontSize: '1.5em' }} />),
  getItem("SSO Setup", "/admin/sso-setup", <MdKey style={{ fontSize: '1.5em' }} />),
  getItem("Management", "/admin/widgets", <MdAccountTree style={{ fontSize: '1.5em' }} />),
  getItem("Audit", "/admin/audit", <MdVerifiedUser style={{ fontSize: '1.5em' }} />),
  getItem("My Profile", "/user/profile", <MdManageAccounts style={{ fontSize: '1.5em' }} />),
  getItem("My Applications", "/user/apps", <MdApps style={{ fontSize: '1.5em' }} />)
];




const Sidebar = () => {
  const navigate = useNavigate();

  const { user, isUserLoading } = useUser();
  const { isSessionLoading } = useSession();

  if (isUserLoading || isSessionLoading) {
    return null;
  }

  const isTenantAdmin = () => {
    if (!user.userTenants) return false;
    return !!user.userTenants.find(tenant => {
      return tenant.roleNames.includes("Tenant Admin")
    })
  }

  const isTopLevelTenantAdmin = () => {
    if (!user.roleNames) return false;
    return user.roleNames.includes("Tenant Admin");
  }

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
        items={items.map((item) => {
          const label = item.label;
          if (label === "Admin Dashboard" && !isTopLevelTenantAdmin()) {
            item.disabled = true
          } 
          if ((label === "SSO Setup" || label === "Management" || label === "Audit") && !isTenantAdmin()) {
            item.disabled = true;
          }
          return item;
        })}
        selectedKeys={[window.location.pathname]}
      />
    </section>
  );
};

export default Sidebar;
