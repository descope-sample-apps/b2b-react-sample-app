import { theme, Typography } from "antd";
import React from "react";

const DataTable = ({ name, value }) => {
  const { useToken } = theme;
  const { token } = useToken();

  return (
    <section
      className="card-section"
      style={{ background: token.colorBgContainer }}
    >
      <div className="card-container">
        <div>
          <Typography className="card-name">{name}</Typography>
          <Typography className="card-value">{value}</Typography>
        </div>
      </div>
    </section>
  );
};

export default DataTable;
