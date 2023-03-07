import { Card, Table, Typography } from "antd";
import MainMenus from "../../../components/menu/MainMenus";

const ColumnsTable = (props) => {
  const { columnsDataColumns, tableDataColumns } = props;
  return (
    <Card className="column-data">
      <div className="dev-table-container">
        <Typography.Title level={3}>4-Column Table</Typography.Title>
        <MainMenus />
      </div>
      <Table
        rowKey={(record) => record.uid}
        columns={columnsDataColumns}
        dataSource={tableDataColumns}
        pagination={false}
      />
    </Card>
  );
};

export default ColumnsTable;
