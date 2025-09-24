import React from "react";
import { Descope } from "@descope/react-sdk";
import { Typography, theme } from "antd";

const Onboarding = () => {
  const { useToken } = theme;
  const { token } = useToken();

  return (
    <div
      className="onboarding-container"
      style={{
        background: token.colorBgContainer,
        color: token.colorTextBase,
        borderRadius: 16,
        boxShadow: token.boxShadow || "0 2px 16px rgba(0,0,0,0.07)",
        maxWidth: 520,
        margin: "48px auto",
        textAlign: "center",
        padding: 16,
      }}
    >
      <Typography.Title level={2} className="onboarding-title" style={{ color: token.colorTextBase }}>
        Onboarding
      </Typography.Title>
      <div style={{ margin: "0 auto", borderRadius: 10, overflow: "hidden", width: "100%", maxWidth: 480 }}>
        <Descope
          flowId="tenant-onboarding"
          onSuccess={() => {}}
          onError={() => {}}
        />
      </div>
    </div>
  );
};

export default Onboarding;


