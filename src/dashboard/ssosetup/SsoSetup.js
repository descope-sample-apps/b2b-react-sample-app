import React from "react";
import "./ssoSetup.scss";
// import AdminExperiences from "../../components/adminExperiences/AdminExperiences";
import { Descope } from '@descope/react-sdk';

const SsoSetup = () => {
  return (
    <div className="data-table-wrapper">
      <div style={{margin:'auto', width:'50%'}}>
            <Descope
              flowId="saml-config"
              onSuccess={(e) => {
                console.log('success => ', e)
              }}
              onError={(e) => console.log("Error!")}
              // theme={colorMode}
            />
          </div>
      {/* <AdminExperiences /> */}
    </div>
  );
};

export default SsoSetup;
