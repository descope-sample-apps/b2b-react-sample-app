import { Card, Table, Typography } from "antd";
import React from "react";
import MainMenus from "../../../components/menu/MainMenus";

const ComplexTable = (props) => {
  const { columnsDataComplex, tableDataComplex } = props;
  return (
    <Card className="priority-data-revenue">
      <div className="dev-table-container">
        <Typography.Title level={3}>Priority Deals</Typography.Title>
        <MainMenus />
      </div>
      <Table
        rowKey={(record) => record.uid}
        columns={columnsDataComplex}
        dataSource={tableDataComplex}
        pagination={false}
      />
    </Card>
  );
};

export default ComplexTable;
