import { theme, Typography } from "antd";
import React from "react";

const TopMarket = ({ name, value, endContent }) => {
  const { useToken } = theme;
  const { token } = useToken();
  return (
    <section
      className="market-section"
      style={{ background: token.colorBgContainer }}
    >
      <div className="card-container">
        <div>
          <Typography className="card-name">{name}</Typography>
          <Typography className="card-value">{value}</Typography>
        </div>
        <div className="select">{endContent}</div>
      </div>
    </section>
  );
};

export default TopMarket;
