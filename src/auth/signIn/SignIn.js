import { Col, Row } from "antd";
import { Descope, useDescope, useSession } from "@descope/react-sdk";
import app_login from "../../assets/app_login.svg";
import LoginExperiences from "../../components/loginExperiences/LoginExperiences";
import { useNavigate } from "react-router-dom";
import "./sign.scss";
import { useCallback, useEffect, useRef, useState } from "react";
import WelcomeModal from "../../components/welcomeModal/WelcomeModal";

const SignIn = () => {
  const { isAuthenticated } = useSession();
  const sdk = useDescope();
  const navigate = useNavigate();
  const oneTapRequested = useRef(false);
  const [isFlowReady, setIsFlowReady] = useState(false);
  const flowId = localStorage.getItem('flowId') || process.env.REACT_APP_DESCOPE_SIGN_IN_FLOW_ID || "sign-up-or-in";

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // Show the flow once it's ready, or when it fails so its error is shown instead of an endless loader
  const onReady = useCallback(() => setIsFlowReady(true), []);

  // Once the flow has rendered, offer Google One Tap as a faster alternative.
  // Only for the app's own project: a project passed in the URL (stored in local storage)
  // may use Descope's default Google provider, which doesn't support One Tap
  useEffect(() => {
    if (!isFlowReady || isAuthenticated || oneTapRequested.current) return;
    if (localStorage.getItem("projectId")) return;
    oneTapRequested.current = true;
    sdk.fedcm.onetap.requestAuthentication({
      provider: "google",
      oneTapConfig: {
        context: "signin",
        cancel_on_tap_outside: true,
      },
      onAuthenticated: () => navigate("/"),
      onFailed: (error) => console.log("One Tap failed:", error),
    });
  }, [sdk, isFlowReady, isAuthenticated, navigate]);

  return (
    <div style={{ height: "99vh" }}>
      <WelcomeModal />
      <Row className="main-row">
        <Col flex="1 1 200px" className="left-container">
          <div className="sign-in-container">
            {!isFlowReady && (
              <div className="flow-loader" role="status" aria-label="Loading sign in">
                <div className="flow-loader-spinner" />
                <span className="flow-loader-text">Loading sign in...</span>
              </div>
            )}
            <div className={`flow-wrapper ${isFlowReady ? "ready" : ""}`}>
              <Descope
                flowId={flowId}
                onReady={onReady}
                onSuccess={(e) => {
                  navigate("/");
                  console.log("Logged in!");
                }}
                onError={(e) => {
                  setIsFlowReady(true);
                  console.log("Error!");
                }}
              />
            </div>
          </div>
          <LoginExperiences />
          <div></div>
        </Col>
        <Col
          flex="0 1 547px"
          className="right-container"
          style={{ width: "41%" }}
        >
          <img src={app_login} alt="app_login" className="img-banner" />
        </Col>
      </Row>
    </div>
  );
};

export default SignIn;
