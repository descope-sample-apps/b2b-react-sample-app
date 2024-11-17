import React from "react";
import "./ssoSetup.scss";
import { Descope } from '@descope/react-sdk';
import { useNavigate } from "react-router-dom";

const SsoSetup = () => {
  const navigate = useNavigate();
  return (
    <div className="data-table-wrapper">
      <div style={{ margin: 'auto', maxWidth: '450px', borderRadius: "10px", overflow: "hidden", width: "100%" }}>
        <Descope
          flowId="sso-config"
          onSuccess={(e) => {
            console.log('success => ', e)
            navigate("/");
          }}
          onError={(e) => console.log("Error:")}
        />
      </div>
    </div>
  );
};

export default SsoSetup;
