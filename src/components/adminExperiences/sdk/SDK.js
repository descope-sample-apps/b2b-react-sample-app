import { Button, Typography } from "antd";
import Prism from "prismjs";
import { useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";

const SDK = () => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const code = `import DescopeClient from "@descope/node-sdk";
    
    // Acquiring the authorization header sent by the client
    const header = request.headers['authorization'];
    const session_token = header?.split(" ")[1] ?? "";
    
    const descopeClient = DescopeClient({projectId: YOUR_PROJECT_ID});
    
    const jwt = await descopeClient.validateSession(session_token);
    
    const stepUpConfirmed = (jwt.token.su === true)
    if (stepUpCOnfirmed) {
      // step up confirmed
    } else {
      // step up needed
    }
    `;
  return (
    <div className="main-flow-container">
      <div className="left-flow">
        <Typography className="flow-content">
          Descope SDKs allow you to easily integrate any passwordless
          authentication method into your app.
        </Typography>
        <br />
        <Typography className="flow-content">
          You can use Client SDKs to let Descope handle session management, or
          Backend SDKs to directly connect your app server to our service.
        </Typography>
        <br />

        <div className="btn-desktop-view">
          <a
            href="https://docs.descope.com/build/guides/backend_sdks/"
            target="_blank"
            rel="noreferrer"
          >
            <Button className="btn-backend-sdk">
              <span>Backend SDKs</span>
            </Button>
          </a>
        </div>
      </div>
      <div className="right-flow">
        <div className="inner-div">
          <div className="Code">
            <pre style={{ margin: 0 }}>
              <code
                className={`language-javascript`}
                style={{ overflowY: "scroll" }}
              >
                {code}
              </code>
            </pre>
          </div>
        </div>
      </div>
      <div className="btn-mobile-view">
        <a
          href="https://docs.descope.com/build/guides/backend_sdks/"
          target="_blank"
          rel="noreferrer"
        >
          <Button className="btn-backend-sdk">
            <span>Backend SDKs</span>
          </Button>
        </a>
      </div>
    </div>
  );
};

export default SDK;
