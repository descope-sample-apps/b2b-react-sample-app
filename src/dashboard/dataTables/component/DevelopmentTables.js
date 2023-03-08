import { Card, Table } from "antd";
import Typography from "antd/es/typography/Typography";
import React from "react";
import MainMenus from "../../../components/menu/MainMenus";

// import { columnsDataDevelopment } from "../../dataTables/variables/DataColumns";
// import tableDataDevlopment from "../variables/tableDataDevelopment.json";

const DevelopmentTables = (props) => {
  const { columnsDataDevelopment, tableDataDevlopment } = props;

  return (
    <Card className="data-revenue">
      <div className="dev-table-container">
        <Typography.Title level={3}>Product Roadmap</Typography.Title>
        <MainMenus />
      </div>

      <Table
        rowKey={(record) => record.uid}
        columns={columnsDataDevelopment}
        dataSource={tableDataDevlopment}
        pagination={false}
      />
    </Card>
  );
};

export default DevelopmentTables;
