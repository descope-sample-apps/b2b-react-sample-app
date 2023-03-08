import { Button, Space } from "antd";
import navbar from "../../assets/Navbar.png";
import "./popover.scss";

const InfoPopover = () => {
  return (
    <Space>
      <div className="info-container">
        <img src={navbar} alt="" className="img" />
        <a href="https://horizon-ui.com/pro">
          <Button className="btn-buy-horizon">Buy Horizon UI PRO</Button>
        </a>
        <a href="https://horizon-ui.com/documentation/docs/introduction">
          <Button className="btn-doc">See Documentation</Button>
        </a>
        <a href="https://github.com/horizon-ui/horizon-ui-chakra-ts">
          <Button type="text" className="btn-try">
            Try Horizon Free
          </Button>
        </a>
      </div>
    </Space>
  );
};

export default InfoPopover;
