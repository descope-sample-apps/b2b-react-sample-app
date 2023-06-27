import {
  Avatar,
  Breadcrumb,
  Col,
  Divider,
  Drawer,
  Popover,
  Row,
  theme,
  Typography,
} from "antd";
import { useState } from "react";
import hamburger from "../../assets/hamburger.svg";
import Sidebar from "../sidebar/Sidebar";
import {
  SearchOutlined,
  BellOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import "./navbar.scss";
import { Link, useLocation } from "react-router-dom";
import { getDisplayName } from "../../utils/user";
import { useUser, useDescope } from "@descope/react-sdk";
import InfoPopover from "../popupScreens/InfoPopover";
import NotificationPopover from "../popupScreens/NotificationPopover";
import { useNavigate } from "react-router-dom";

const NavBar = ({ handleClick, brandText }) => {
  const [open, setOpen] = useState(false);
  const { useToken } = theme;
  const { token } = useToken();
  const location = useLocation();
  const { user } = useUser();
  const fullName = getDisplayName(user).split(" ");
  const { logout } = useDescope();
  const navigate = useNavigate();

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  // const handleOpenChange = (newOpen) => {
  //   setOpen(newOpen);
  // };

  const logoutUser = async () => {
    let res = await logout();
    if (res.ok) {
      navigate("auth/sign-in");

    }
  }

  const getInitials = (fullName) => {
    if (fullName.length > 1) {
      const initials = fullName.shift().charAt(0) + fullName.pop().charAt(0);
      return initials.toUpperCase();
    } else {
      return "Profile";
    }
  };

  const content = (
    <div>
      <Typography.Title level={5}>Hey, {getDisplayName(user)}</Typography.Title>
      <Divider />
      <Link to="auth/sign-in">
        <p style={{ color: "red" }} onClick={logoutUser}>
          Log out
        </p>
      </Link>
    </div>
  );

  return (
    <section>
      <div
        // style={{
        //   background: token.colorPrimaryBg,
        //   borderColor: token.colorBorder,
        // }}
        className="header-section"
      >
        <Row className="header-row">
          <Col span={8} className="header-col">
            <div>
              <Link to="admin">
                <Breadcrumb style={{ color: token.colorTextBase }}>
                  <Breadcrumb.Item>Pages</Breadcrumb.Item>
                  <Breadcrumb.Item>
                    {location.state == null
                      ? "Your Rev Dashboard"
                      : location.state}
                  </Breadcrumb.Item>
                </Breadcrumb>
              </Link>
            </div>
            <div>
              <Typography className="menu-text">
                {location.state == null ? "Your Rev Dashboard" : location.state}
              </Typography>
            </div>
          </Col>
          <Col span={8}>
            <div
              className="search-section"
              style={{ background: token.colorBgContainer }}
            >
              <div className="">
                <div className="search-icon">
                  <SearchOutlined />
                </div>
                <input
                  placeholder="Search..."
                  className="search-input"
                  style={{ background: token.colorPrimaryBg }}
                />
              </div>
              <div className="ham-icon">
                <img src={hamburger} alt="hamburger" onClick={showDrawer} />
              </div>
              {/* <div className="bell-icon">
                <Popover
                  content={<NotificationPopover />}
                  trigger="click"
                  className="popover"
                >
                  <BellOutlined style={{ color: "#a3aed0" }} />
                </Popover>
              </div> */}
              {/* <div className="info-icon">
                <Popover content={<InfoPopover />} trigger="click">
                  <InfoCircleOutlined style={{ color: "#a3aed0" }} />
                </Popover>
              </div> */}
              {/* <div className="moon-icon">
                <CloudUploadOutlined onClick={handleClick} />
              </div> */}
              <div className="avtar">
                <Popover content={content} trigger="click">
                  <Avatar
                    style={{
                      backgroundColor: "#11047a",
                      verticalAlign: "middle",
                      cursor: "pointer",
                    }}
                    size="large"
                  >
                    {getInitials(fullName)}
                  </Avatar>
                </Popover>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div className="side-drawer">
        <Drawer
          placement="left"
          closable={true}
          onClose={onClose}
          open={open}
          width={285}
        >
          <Sidebar />
        </Drawer>
      </div>
    </section>
  );
};

export default NavBar;
