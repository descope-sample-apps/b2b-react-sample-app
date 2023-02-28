import { Card, Checkbox, Dropdown, Space, Table, Typography } from "antd";
import { UserOutlined, BulbOutlined, SettingOutlined } from "@ant-design/icons";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { useMemo } from "react";
import { columnsDataCheck } from "../../dashboard/variables/ColumnsData";
import tableDataCheck from "../../dashboard/variables/tableDataCheck.json";

const CheckTable = (props) => {
  const { columnsData, tableData } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  let tableInstance = useTable(
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
  initialState.pageSize = 11;

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
        <Typography.Title level={3}>Revenue by Product</Typography.Title>
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
                  pe="10px"
                  key={index}
                >
                  <div
                  // justify="space-between"
                  // align="center"
                  // fontSize={{ sm: "10px", lg: "12px" }}
                  // color="gray.400"
                  >
                    {column.render("Header")}
                  </div>
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
                    data = (
                      <div>
                        <Checkbox
                          defaultChecked={cell.value[1]}
                          // colorScheme="brandScheme"
                          // me="10px"
                        />
                        <Typography>{cell.value[0]}</Typography>
                      </div>
                    );
                  } else if (cell.column.Header === "PROGRESS") {
                    data = (
                      <div>
                        <Typography
                        // me="10px"
                        // color={textColor}
                        // fontSize="sm"
                        // fontWeight="700"
                        >
                          {cell.value}%
                        </Typography>
                      </div>
                    );
                  } else if (cell.column.Header === "CUSTOMERS") {
                    data = (
                      <Typography
                      // color={textColor}
                      // fontSize="sm"
                      // fontWeight="700"
                      >
                        {cell.value}
                      </Typography>
                    );
                  } else if (cell.column.Header === "MOST RECENT DEAL") {
                    data = (
                      <Typography
                      // color={textColor}
                      // fontSize="sm"
                      // fontWeight="700"
                      >
                        {cell.value}
                      </Typography>
                    );
                  }
                  return (
                    <td
                      {...cell.getCellProps()}
                      key={index}
                      // fontSize={{ sm: "14px" }}
                      // minW={{ sm: "150px", md: "200px", lg: "auto" }}
                      // borderColor="transparent"
                    >
                      {data}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* <Table columnsData={columnsDataCheck} tableData={tableDataCheck}></Table> */}
    </Card>
  );
};

export default CheckTable;
