import Container from "./containers";
import React from "react";
import { AuthProvider } from "@descope/react-sdk";
import { useSearchParams } from "react-router-dom";

const AppRoot = () => {
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get("project") || localStorage.getItem("projectId");
  const flow = searchParams.get("flow") || localStorage.getItem('flow');

  if (projectId !== localStorage.getItem("projectId")) {
    localStorage.removeItem("DSR");
    localStorage.removeItem("DS");
    localStorage.setItem("projectId", projectId);
  }
  if (flow !== localStorage.getItem('flow')) {
    localStorage.setItem('flow', flow);
  }

  return (
    <AuthProvider
      projectId={projectId || process.env.REACT_APP_DESCOPE_PROJECT_ID}
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
