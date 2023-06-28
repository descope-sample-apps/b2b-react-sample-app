import { Col, Row } from "antd";
import { Descope, useSession } from "@descope/react-sdk";
import app_login from "../../assets/app_login.svg";
import LoginExperiences from "../../components/loginExperiences/LoginExperiences";
import { useNavigate } from "react-router-dom";
import "./sign.scss";
import { useEffect } from "react";
import WelcomeModal from "../../components/welcomeModal/WelcomeModal";

const SignIn = () => {
  const { isAuthenticated } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);
  return (
    <div style={{ height: "99vh" }}>
      <WelcomeModal />
      <Row className="main-row">
        <Col flex="1 1 200px" className="left-container">
          <div className="sign-in-container">
            <Descope
              flowId={
                process.env.REACT_APP_DESCOPE_SIGN_IN_FLOW_ID || "sign-up-or-in"
              }
              onSuccess={(e) => {
                window.analytics.identify(e.detail.user.userId, {
                  name: e.detail.user.name, //user trait
                  email: e.detail.user.email, //user trait
                });
                navigate("/");
                console.log("Logged in!");
              }}
              onError={(e) => console.log("Error!")}
            />
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
