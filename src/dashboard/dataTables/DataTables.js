import { Col, Row, Space } from "antd";
import React, { useState } from "react";
import DevelopmentTables from "./component/DevelopmentTables";
import {
  columnsDataDevelopment,
  columnsDataCheck,
  columnsDataColumns,
  columnsDataComplex,
} from "../../dashboard/dataTables/variables/DataColumns";
import "./dataTables.scss";
import CheckTable from "./component/CheckTable";
import ColumnsTable from "./component/ColumnsTable";
import ComplexTable from "./component/ComplexTable";
import AdminExperiences from "../../components/adminExperiences/AdminExperiences";
import { getSessionToken, Descope } from '@descope/react-sdk';
import { useNavigate } from "react-router-dom";


const DataTables = () => {
  const [data, setData] = useState({
    check: [],
    columns: [],
    development: [],
    complex: [],
    loaded: false,
  });
  const [authenticationFlow, setAuthenticationFlow] = useState(false);
  const navigate = useNavigate();

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
      {
        authenticationFlow ?
          <div style={{ margin: 'auto', maxWidth: '450px', borderRadius: "10px", overflow: "hidden", width: "100%" }}>
            <Descope
              flowId="step-up"
              onSuccess={(e) => {
                console.log('success => ', e)
                navigate("admin/data-tables");

              }}
              onError={(e) => console.log("Error!")}
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
