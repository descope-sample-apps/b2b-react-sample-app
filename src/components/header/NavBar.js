import { Avatar, Breadcrumb, Button, Col, Drawer, Row, Typography } from "antd";
import { useState } from "react";
import hamburger from "../../assets/hamburger.svg";
import Sidebar from "../sidebar/Sidebar";
import {
  SearchOutlined,
  BellOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import "./navbar.scss";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <section>
      <div className="header-section">
        <Row className="header-row">
          <Col span={8} className="header-col">
            <div>
              <Breadcrumb>
                <Breadcrumb.Item>Pages</Breadcrumb.Item>
                <Breadcrumb.Item>Your Rev Dashboard</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div>
              <Typography className="menu-text">Your Rev Dashboard</Typography>
            </div>
          </Col>
          <Col span={8}>
            <div className="search-section">
              <div className="">
                <div className="search-icon">
                  <SearchOutlined />
                </div>
                <input placeholder="Search..." className="search-input" />
              </div>
              <div className="ham-icon">
                <img src={hamburger} alt="hamburger" onClick={showDrawer} />
              </div>
              <div className="bell-icon">
                <BellOutlined />
              </div>
              <div className="info-icon">
                <InfoCircleOutlined />
              </div>
              <div className="moon-icon"></div>
              <div className="avtar">
                <Avatar
                  style={{
                    backgroundColor: "#11047a",
                    verticalAlign: "middle",
                  }}
                  size="large"
                >
                  AB
                </Avatar>
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
