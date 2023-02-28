import React from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from "../auth/signIn/SignIn";
import Dashboard from "../dashboard/Dashboard";

import ProjectLayout from "../layout/ProjectLayout";

const Container = () => {
  return (
    <div>
      <ProjectLayout>
        <Routes>
          <Route path="admin" element={<Dashboard />} />
          <Route path="auth/sign-in" element={<SignIn />} />
        </Routes>
      </ProjectLayout>
    </div>
  );
};

export default Container;
