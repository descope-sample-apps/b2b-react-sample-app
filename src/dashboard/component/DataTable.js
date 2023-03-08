import { theme, Typography } from "antd";
import React from "react";

const DataTable = ({ name, value, growth }) => {
  const { useToken } = theme;
  const { token } = useToken();

  return (
    <section
      className="card-section"
      style={{ background: token.colorBgContainer }}
    >
      <div
        className="card-container"
        style={growth ? { display: "block" } : {}}
      >
        <div>
          <Typography className="card-name">{name}</Typography>
          <Typography className="card-value">{value}</Typography>
        </div>
        <div>
          {growth ? (
            <div>
              <p>
                <span style={{ color: "#00b474" }}>{growth} </span>{" "}
                <span style={{ color: " #b0bad7" }}>since last month</span>
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default DataTable;
