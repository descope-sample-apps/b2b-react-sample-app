import { Card, Table, Typography } from "antd";
import MainMenus from "../../components/menu/MainMenus";

const PriorityDeals = (props) => {
  const { columnsData, tableData } = props;

  return (
    <Card>
      <div className="priority-container">
        <Typography.Title level={3}>Priority Deals</Typography.Title>
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

export default PriorityDeals;
