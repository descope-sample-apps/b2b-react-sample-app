import { Card, Table } from "antd";
import Typography from "antd/es/typography/Typography";
import React from "react";
import MainMenus from "../../../components/menu/MainMenus";

const DevelopmentTables = (props) => {
  const { columnsData, tableData } = props;

  return (
    <Card className="data-revenue">
      <div className="dev-table-container">
        <Typography.Title level={3}>Product Roadmap</Typography.Title>
        <MainMenus />
      </div>

      <Table
        rowKey={(record) => record.uid}
        columns={columnsData}
        dataSource={tableData}
        pagination={false}
      />
    </Card>
  );
};

export default DevelopmentTables;
