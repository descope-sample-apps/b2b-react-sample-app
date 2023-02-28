import { Col, Row } from "antd";
import { Descope } from "@descope/react-sdk";
import app_login from "../../assets/app_login.svg";
import LoginExperiences from "../../components/loginExperiences/LoginExperiences";
import { useNavigate } from "react-router-dom";
import "./sign.scss";

const SignIn = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Row>
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
                navigate("admin");
                console.log("Logged in!");
              }}
              onError={(e) => console.log("Error!")}
            />
          </div>
          <LoginExperiences />
          <div></div>
        </Col>
        <Col flex="0 1 547px" className="right-container">
          <img src={app_login} alt="app_login" className="img-banner" />
        </Col>
      </Row>
    </div>
  );
};

export default SignIn;
