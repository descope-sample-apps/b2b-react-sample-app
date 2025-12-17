import React from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from "../auth/signIn/SignIn";
import Invitation from '../auth/invitation/Invitation';
import Dashboard from "../dashboard/Dashboard";
import DataTables from "../dashboard/dataTables/DataTables";
import Widgets from "../dashboard/widgets/widgets";
import TenantProfilePage from "../dashboard/tenant-profile/tenantprofile";
import Audit from "../dashboard/audit/audit";
import ProjectLayout from "../layout/ProjectLayout";
import Profile from "../dashboard/profile/profile";
import Apps from "../dashboard/apps/apps";
import AccessKeys from "../dashboard/access-keys/accesskeys";
import TestIframe, { SilentCallback, ProtectedPage, ProtectedRoute } from "../components/TestIframe";

const Container = () => {
  return (
    <Routes>
      {/* Nested route for ProjectLayout */}
      <Route path="/" element={<ProjectLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="admin/data-tables" element={<DataTables />} />
        <Route path="admin/widgets" element={<Widgets />} />
        <Route path="admin/tenant-profile" element={<TenantProfilePage />} />
        <Route path="admin/audit" element={<Audit />} />
        <Route path="user/profile" element={<Profile />} />
        <Route path="user/apps" element={<Apps />} />
        <Route path="user/keys" element={<AccessKeys/>} />
      </Route>

      {/* Routes without ProjectLayout */}
      <Route path="auth/sign-in" element={<SignIn />} />
      <Route path="auth/invitation" element={<Invitation />} />
      <Route path="testiframe" element={<TestIframe />} />
      <Route path="silent-callback" element={<SilentCallback />} />
      <Route path="protected" element={<ProtectedRoute><ProtectedPage /></ProtectedRoute>} />
    </Routes>
  );
};

export default Container;
