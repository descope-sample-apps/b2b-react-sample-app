import { Collapse, Tabs, Typography } from "antd";
import React from "react";
import Api from "./api/Api";
import Flows from "./flows/Flows";
import Sdk from "./sdk/Sdk";
import "./loginExperiences.scss";
const { Panel } = Collapse;

const LoginExperiences = () => {
  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: "1",
      label: `Flows`,
      children: <Flows />,
    },
    {
      key: "2",
      label: `SDK`,
      children: <Sdk />,
    },
    {
      key: "3",
      label: `API`,
      children: <Api />,
    },
  ];
  return (
    <section className="collapse">
      <Collapse onChange={onChange} expandIconPosition="end">
        <Panel
          header="Interested to learn how we built this login experience?"
          key="1"
        >
          <div>
            <Typography className="panel-title">
              This login experience was built using Descope Flows. You also have
              several other ways of implementing login with Descope – choose
              whichever one best fits your needs.
              <br />
              The Dolrr app is open source and available on GitHub here:
              <a
                href="https://github.com/descope-sample-apps/b2b-react-sample-app"
                target="_blank"
                rel=" noreferrer noopener"
              >
                &nbsp;https://github.com/descope-sample-apps/b2b-react-sample-app
              </a>
            </Typography>
          </div>
          <div className="tab-main-container">
            <div className="left-tab">
              <div>
                <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
              </div>
            </div>
          </div>
        </Panel>
      </Collapse>
    </section>
  );
};

export default LoginExperiences;
