import { Card, Table, Typography } from "antd";
import React, { useState } from "react";
import MainMenus from "../../../components/menu/MainMenus";

const CheckTable = (props) => {
  const { columnsData, tableData } = props;
  const [selectionType] = useState("checkbox");
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };
  return (
    <Card className="product-data-revenue">
      <div className="dev-table-container">
        <Typography.Title level={3}>Revenue by Product</Typography.Title>
        <MainMenus />
      </div>
      <Table
        rowKey={(record) => record.uid}
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columnsData}
        dataSource={tableData}
        pagination={false}
      />
    </Card>
  );
};

export default CheckTable;
