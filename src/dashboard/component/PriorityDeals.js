import { Card, Dropdown, Space, Typography } from "antd";
import { useMemo } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { UserOutlined, BulbOutlined, SettingOutlined } from "@ant-design/icons";

const PriorityDeals = (props) => {
  const { columnsData, tableData } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 5;

  const items = [
    {
      key: "1",
      label: "Panel 1",
      icon: <UserOutlined />,
    },
    {
      key: "2",
      label: "Panel2",
    },
    {
      key: "3",
      label: "Panel3",
      icon: <BulbOutlined />,
    },
    {
      key: "4",
      label: "Panel4",
      icon: <SettingOutlined />,
    },
  ];
  return (
    <Card>
      <div className="revenue-container">
        <Typography>Revenue by Product</Typography>
        <Dropdown
          menu={{
            items,
          }}
          className="revenue-dropdown"
        >
          <Space>...</Space>
        </Dropdown>
      </div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, index) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  key={index}
                >
                  <div>{column.render("Header")}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={index}>
                {row.cells.map((cell, index) => {
                  let data;
                  if (cell.column.Header === "NAME") {
                    data = <Typography>{cell.value}</Typography>;
                  } else if (cell.column.Header === "STATUS") {
                    data = (
                      <div align="center">
                        {/* <Icon
                          w="24px"
                          h="24px"
                          me="5px"
                          color={
                            cell.value === "Signed"
                              ? "green.500"
                              : cell.value === "At Risk"
                              ? "red.500"
                              : cell.value === "Gone Cold"
                              ? "orange.500"
                              : null
                          }
                          as={
                            cell.value === "Signed"
                              ? MdCheckCircle
                              : cell.value === "At Risk"
                              ? MdCancel
                              : cell.value === "Gone Cold"
                              ? MdOutlineError
                              : null
                          }
                        /> */}
                        <Typography>{cell.value}</Typography>
                      </div>
                    );
                  } else if (cell.column.Header === "DATE") {
                    data = <Typography>{cell.value}</Typography>;
                  } else if (cell.column.Header === "PROGRESS") {
                    data = (
                      <div align="center">
                        {/* <Progress
                          variant="table"
                          colorScheme="brandScheme"
                          h="8px"
                          w="108px"
                          value={cell.value}
                        /> */}
                      </div>
                    );
                  }
                  return (
                    <td {...cell.getCellProps()} key={index}>
                      {data}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
};

export default PriorityDeals;
