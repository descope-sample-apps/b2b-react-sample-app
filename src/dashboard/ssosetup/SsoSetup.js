import React from "react";
import "./ssoSetup.scss";
// import AdminExperiences from "../../components/adminExperiences/AdminExperiences";
import { Descope } from '@descope/react-sdk';

const SsoSetup = () => {
  return (
    <div className="data-table-wrapper">
      <div style={{ margin: 'auto', maxWidth: '450px', borderRadius: "10px", overflow: "hidden", width: "100%" }}>
        <Descope
          flowId="saml-config"
          onSuccess={(e) => {
            console.log('success => ', e)
          }}
          onError={(e) => console.log("Error!")}
        />
      </div>
    </div>
  );
};

export default SsoSetup;
