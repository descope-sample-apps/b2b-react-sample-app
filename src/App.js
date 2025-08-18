import Container from "./containers";
import React from "react";
import { AuthProvider } from "@descope/react-sdk";
import { useSearchParams } from "react-router-dom";
import useAuthProviderProps from "./hooks/useAuthProviderProps";

const AppRoot = () => {
  const [searchParams] = useSearchParams();
  const projectId =
    searchParams.get("project") || localStorage.getItem("projectId");
  const flowId = searchParams.get("flow") || localStorage.getItem("flowId");
  const baseUrl =
    searchParams.get("baseUrl") || localStorage.getItem("baseUrl");

  if (projectId !== localStorage.getItem("projectId")) {
    localStorage.removeItem("DSR");
    localStorage.removeItem("DS");
    localStorage.setItem("projectId", projectId);
  }
  if (flowId !== localStorage.getItem("flowId")) {
    localStorage.setItem("flowId", flowId);
  }
  if (baseUrl !== localStorage.getItem("baseUrl")) {
    localStorage.removeItem("DSR");
    localStorage.removeItem("DS");
    localStorage.setItem("baseUrl", baseUrl);
  }

  const authProviderProps = useAuthProviderProps();
  const descopeProjectId =
    projectId || process.env.REACT_APP_DESCOPE_PROJECT_ID;
  const descopeBaseUrl = baseUrl || process.env.REACT_APP_DESCOPE_BASE_URL;
  const descopeStaticBaseUrl = descopeBaseUrl ? `${descopeBaseUrl}/pages` : undefined;

  return (
    <AuthProvider
      projectId={descopeProjectId}
      baseUrl={descopeBaseUrl}
      baseStaticUrl={descopeStaticBaseUrl}
      {...authProviderProps}
    >
      <App />
    </AuthProvider>
  );
};

const App = () => {
  return (
    <div className="App">
      <Container />
    </div>
  );
};

export default AppRoot;
