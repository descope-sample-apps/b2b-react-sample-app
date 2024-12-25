import Container from "./containers";
import React from "react";
import { AuthProvider } from "@descope/react-sdk";
import { useSearchParams } from "react-router-dom";

const AppRoot = () => {
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get("project") || localStorage.getItem("projectId");
  const flowId = searchParams.get("flow") || localStorage.getItem('flowId');
  const baseUrl = searchParams.get("baseUrl") || localStorage.getItem('baseUrl');

  if (projectId !== localStorage.getItem("projectId")) {
    localStorage.removeItem("DSR");
    localStorage.removeItem("DS");
    localStorage.setItem("projectId", projectId);
  }
  if (flowId !== localStorage.getItem('flowId')) {
    localStorage.setItem('flowId', flowId);
  }
  if (baseUrl !== localStorage.getItem('baseUrl')) {
    localStorage.removeItem("DSR");
    localStorage.removeItem("DS");
    localStorage.setItem('baseUrl', baseUrl);
    
  }

  return (
    <AuthProvider
      projectId={projectId || process.env.REACT_APP_DESCOPE_PROJECT_ID}
      baseUrl = {baseUrl}
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
