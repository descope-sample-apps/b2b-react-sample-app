import React from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from "../auth/signIn/SignIn";
import Dashboard from "../dashboard/Dashboard";
import DataTables from "../dashboard/dataTables/DataTables";
import SsoSetup from "../dashboard/ssosetup/SsoSetup";

import ProjectLayout from "../layout/ProjectLayout";

const Container = () => {
  return (
    <div>
      <ProjectLayout>
        <Routes>
          <Route path="" element={<Dashboard />} />
          <Route path="admin/data-tables" element={<DataTables />} />
          <Route path="admin/sso-setup" element={<SsoSetup />} />
          <Route path="auth/sign-in" element={<SignIn />} />
        </Routes>
      </ProjectLayout>
    </div>
  );
};

export default Container;
