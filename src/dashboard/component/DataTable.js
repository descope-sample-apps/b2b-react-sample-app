import { Typography } from "antd";
import React from "react";

const DataTable = ({ name, value }) => {
  return (
    <section className="card-section">
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
