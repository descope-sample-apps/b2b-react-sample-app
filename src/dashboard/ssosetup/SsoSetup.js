import React, { Fragment } from "react";
import "./ssoSetup.scss";
import AdminExperiences from "../../components/adminExperiences/AdminExperiences";
import { Descope, useSession, useUser, getJwtPermissions, getSessionToken } from '@descope/react-sdk';
import { useNavigate } from "react-router-dom";

const SsoSetup = () => {
  const { isAuthenticated, isSessionLoading } = useSession()
  const { isUserLoading } = useUser()
  const permissions = getJwtPermissions(getSessionToken(), 'T2TkjYGrVh6ngFjInykigfBzYQIx')
  const isSSOAdmin = permissions.indexOf("SSO Admin") > -1 
  const navigate = useNavigate();

  if (!isAuthenticated) {
    console.log("Redirect to login page");
    // Handle redirect to login page here
    return null;
  }

  if (!isSSOAdmin) {
    console.log("Redirect to another authenticated page");
    navigate("/");
    return null;
  }

  return (
    <Fragment>
      { isSSOAdmin &&
        <div className="data-table-wrapper">
          <div style={{ margin: 'auto', maxWidth: '450px', borderRadius: "10px", overflow: "hidden", width: "100%" }}>
            <Descope
              flowId="saml-config"
              onSuccess={(e) => {
                navigate("/");
                console.log('success => ', e)
              }}
              onError={(e) => console.log("Error:", e)}
            />
          </div>
        </div>
      }
      {(isSessionLoading || isUserLoading) && <p>Loading...</p>}
    </Fragment>
  );
};

export default SsoSetup;
