import { Col, Row, Space } from "antd";
import React from "react";
import DevelopmentTables from "./component/DevelopmentTables";
import {
  columnsDataDevelopment,
  columnsDataCheck,
  columnsDataColumns,
  columnsDataComplex,
} from "../../dashboard/dataTables/variables/DataColumns";
import tableDataDevlopment from "../../dashboard/dataTables/variables/tableDataDevelopment.json";
import tableDataCheck from "../../dashboard/dataTables/variables/tableDataCheck.json";
import tableDataColumns from "../../dashboard/dataTables/variables/tableDataColumns.json";
import tableDataComplex from "../../dashboard/dataTables/variables/tableDataComplex.json";
import "./dataTables.scss";
import CheckTable from "./component/CheckTable";
import ColumnsTable from "./component/ColumnsTable";
import ComplexTable from "./component/ComplexTable";
import AdminExperiences from "../../components/adminExperiences/AdminExperiences";

const DataTables = () => {
  return (
    <div className="data-table-wrapper">
      <Space size="large" className="first-row">
        <Row gutter={[14, 14]}>
          <Col sm={24} md={12} lg={12}>
            <DevelopmentTables
              columnsDataDevelopment={columnsDataDevelopment}
              tableDataDevlopment={tableDataDevlopment}
            />
          </Col>
          <Col sm={24} md={12} lg={12}>
            <CheckTable
              columnsDataCheck={columnsDataCheck}
              tableDataCheck={tableDataCheck}
            />
          </Col>
        </Row>
      </Space>
      <Space size="large" className="sec-row">
        <Row gutter={[14, 14]}>
          <Col sm={24} md={12} lg={12}>
            <ColumnsTable
              columnsDataColumns={columnsDataColumns}
              tableDataColumns={tableDataColumns}
            />
          </Col>
          <Col sm={24} md={12} lg={12}>
            <ComplexTable
              columnsDataComplex={columnsDataComplex}
              tableDataComplex={tableDataComplex}
            />
          </Col>
        </Row>
      </Space>

      <AdminExperiences />
    </div>
  );
};

export default DataTables;
