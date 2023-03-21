import { Col, Row, Space } from "antd";
import React, { useState } from "react";
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
import { getSessionToken, Descope } from '@descope/react-sdk';

const DataTables = () => {
  const [data, setData] = useState({
    check: [],
    columns: [],
    development: [],
    complex: [],
    loaded: false,
  });
  const [authenticationFlow, setAuthenticationFlow] = useState(false);

  const projectId = localStorage.getItem('projectId') || process.env.REACT_APP_DESCOPE_PROJECT_ID;
  const sessionToken = getSessionToken();

  if (!data.loaded) {
    fetch("/api/data", {
      method: "get",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "x-project-id": projectId,
        Authorization: `Bearer ${sessionToken}`,
      },
    })
      .then((response) => {
        if (response.status === 401 || response.status === 404) {
          setAuthenticationFlow(true);
        } else {
          setAuthenticationFlow(false);
          return response.json();
        }
      })
      .then((res) => {
        if (res) {
          res.body.loaded = true;
          setData(res.body);
          setAuthenticationFlow(false);
        }
      })
      .catch((err) => console.log('err => ', err));
  }
  return (
    <div className="data-table-wrapper">
      {console.log('authenticationFlow', authenticationFlow)}
      {
        authenticationFlow ?
          <div style={{margin:'auto', width:'50%'}}>
            <Descope
              flowId="step-up"
              onSuccess={(e) => {
                console.log('success => ', e)
              }}
              onError={(e) => console.log("Error!")}
              // theme={colorMode}
            />
          </div>
          :
          <>
            <Space size="large" className="first-row">
              <Row gutter={[14, 14]}>
                <Col sm={24} md={12} lg={12}>
                  <DevelopmentTables
                    columnsDataDevelopment={columnsDataDevelopment}
                    tableDataDevlopment={data.development}
                  />
                </Col>
                <Col sm={24} md={12} lg={12}>
                  <CheckTable
                    columnsDataCheck={columnsDataCheck}
                    tableDataCheck={data.check}
                  />
                </Col>
              </Row>
            </Space>
            <Space size="large" className="sec-row">
              <Row gutter={[14, 14]}>
                <Col sm={24} md={12} lg={12}>
                  <ColumnsTable
                    columnsDataColumns={columnsDataColumns}
                    tableDataColumns={data.columns}
                  />
                </Col>
                <Col sm={24} md={12} lg={12}>
                  <ComplexTable
                    columnsDataComplex={columnsDataComplex}
                    tableDataComplex={data.complex}
                  />
                </Col>
              </Row>
            </Space>
          </>
      }


      <AdminExperiences />
    </div>
  );
};

export default DataTables;
