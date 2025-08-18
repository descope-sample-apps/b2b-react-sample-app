import React from "react";
import "./ssoSetup.scss";

const IFRAME_URL = "https://api.descope.com/sso/setup/P2eXyIh7lA7XdVatDQHlgD455zXd?t=d74c57c24d2c03ad79844c4043f3d6d6747225ff59cbf4e0708f8c7426ffb521";

const SsoSetup = () => {
  return (
    <div className="data-table-wrapper">
      <div style={{ margin: 'auto', maxWidth: '900px', borderRadius: "10px", overflow: "hidden", width: "100%" }}>
        <iframe
          src={IFRAME_URL}
          title="SSO Setup"
          style={{ width: '100%', height: '700px', border: '0' }}
          allow="clipboard-write; fullscreen; geolocation; microphone; camera; display-capture"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default SsoSetup;
