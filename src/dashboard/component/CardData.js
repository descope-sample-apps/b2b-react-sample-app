import { Card, Col, Row, Typography } from "antd";
import { SignalFilled } from "@ant-design/icons";

const CardData = ({ icon, name, value }) => {
  return (
    <section className="card-section">
      <div className="card-container">
        <div className="card-icon">{icon}</div>
        <div>
          <Typography className="card-name">{name}</Typography>
          <Typography className="card-value">{value}</Typography>
        </div>
      </div>
    </section>
  );
};

export default CardData;
