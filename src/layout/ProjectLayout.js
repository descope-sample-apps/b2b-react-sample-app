import { Layout, Space } from "antd";
import { useLocation } from "react-router-dom";
import NavBar from "../components/header/NavBar";
import Sidebar from "../components/sidebar/Sidebar";
import "./projectLayout.scss";

const { Header, Sider, Content } = Layout;

const ProjectLayout = (props) => {
  const location = useLocation();

  const url = ["/auth/sign-in"];

  const siderStyle = {
    backgroundColor: "white",
    overflow: "auto",
    height: "100vh",
    position: "fixed",
    zIndex: "1",
  };

  return (
    <Space
      direction="vertical"
      style={{
        width: "100%",
      }}
      size={[0, 50]}
    >
      <Layout>
        {url.includes(location.pathname) ? null : (
          <Sider width={300} style={siderStyle} className="siderbar-style">
            <Sidebar />
          </Sider>
        )}

        <Layout>
          {url.includes(location.pathname) ? null : (
            <Header className="header-style">
              <NavBar />
            </Header>
          )}
          {url.includes(location.pathname) ? null : (
            <Content className="content-style">{props.children}</Content>
          )}
        </Layout>
      </Layout>
    </Space>
  );
};

export default ProjectLayout;
