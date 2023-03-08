import { Typography } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./popover.scss";
import { useState } from "react";

const NotificationPopover = () => {
  const [open, setOpen] = useState(false);
  const hide = () => {
    setOpen(false);
  };
  return (
    <div className="notification-container">
      <div className="notify-container">
        <Typography.Title level={5}>Notifications</Typography.Title>
        <Typography.Title level={5}>Mark all read</Typography.Title>
      </div>
      <div>
        <div className="first-row">
          <div className="icon-upload">
            <UploadOutlined style={{ color: "white" }} />
          </div>
          <div onClick={hide} style={{ cursor: "pointer" }}>
            <Typography.Title level={5}>
              New Update:Horizon UI Dashboard PRO
            </Typography.Title>
            <p>A new update for your downloaded item is available!</p>
          </div>
        </div>
        <div className="sec-row">
          <div className="icon-upload">
            <UploadOutlined style={{ color: "white" }} />
          </div>
          <div onClick={hide} style={{ cursor: "pointer" }}>
            <Typography.Title level={5}>
              New Update:Horizon Design system Free
            </Typography.Title>
            <p>A new update for your downloaded item is available!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPopover;
