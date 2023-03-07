import { Collapse, Tabs, Typography } from "antd";
import SDK from "./sdk/SDK";

const AdminExperiences = () => {
  const items = [
    {
      key: "1",
      label: `SDK`,
      children: <SDK />,
    },
  ];

  const onChange = (key) => {
    console.log(key);
  };

  return (
    <section className="collapse">
      <Collapse onChange={onChange} expandIconPosition="end">
        <Collapse.Panel
          header=" Interested to learn how we built this Step-Up experience?"
          key="1"
        >
          <div>
            <Typography className="panel-title">
              This “Step Up” experience was built using Descope Flows (the same
              Flow as the one used for the login page), and validated using the
              Descope Backend SDKs.
            </Typography>
          </div>
          <div className="tab-main-container">
            <div className="left-tab">
              <div>
                <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
              </div>
            </div>
          </div>
        </Collapse.Panel>
      </Collapse>
    </section>
  );
};

export default AdminExperiences;
