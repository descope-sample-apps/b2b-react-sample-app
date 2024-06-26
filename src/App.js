import Container from "./containers";
import React, { useEffect, useCallback } from 'react';
import { AuthProvider, useDescope, useSession } from '@descope/react-sdk';
import { useSearchParams } from "react-router-dom";
let oneTapInitialized = false;

const AppRoot = () => {
  const [searchParams] = useSearchParams();
  const projectId =
    searchParams.get("project") || localStorage.getItem("projectId") || process.env.REACT_APP_DESCOPE_PROJECT_ID;
  if (projectId !== localStorage.getItem("projectId")) {
    localStorage.removeItem("DSR");
    localStorage.removeItem("DS");
    localStorage.setItem("projectId", projectId);
  }
  
  const OneTapComp = () => {
    const sdk = useDescope();
    const { isAuthenticated, isSessionLoading } = useSession();

    const startOneTap = useCallback(async () => {
      // eslint-disable-next-line
      if (oneTapInitialized) return;

      await sdk.fedcm.oneTap('google');

      oneTapInitialized = true;
    }, [sdk]);

    useEffect(() => {
      if (!isAuthenticated && !isSessionLoading) {
        startOneTap();
      }
    }, [isAuthenticated, isSessionLoading, startOneTap]);
    return null;
  };
  

  return (
    <AuthProvider projectId={projectId || process.env.REACT_APP_DESCOPE_PROJECT_ID}>
      <OneTapComp />
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
