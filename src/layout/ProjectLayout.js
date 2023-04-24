import { Layout, ConfigProvider, Space } from "antd";
import NavBar from "../components/header/NavBar";
import Sidebar from "../components/sidebar/Sidebar";
import { darkTheme, lightTheme } from "../theme/Theme";
import "./projectLayout.scss";
import { useState } from "react";
import { useSession } from "@descope/react-sdk";
import SignIn from "../auth/signIn/SignIn";

const { Header, Sider, Content } = Layout;

const ProjectLayout = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const { isAuthenticated } = useSession();
  const handleClick = () => {
    setIsDarkMode(!isDarkMode);
  };
 

  const siderStyle = {
    backgroundColor: "white",
    overflow: "auto",
    height: "100vh",
    position: "fixed",
    zIndex: "1",
  };
  return (
    <ConfigProvider
      theme={{
        token: isDarkMode === true ? lightTheme : darkTheme,
      }}
    >
      {!isAuthenticated ? (
        <SignIn />
      ) : (
        <Space
          direction="vertical"
          style={{
            width: "100%",
          }}
          size={[0, 50]}
        >
          <Layout>
            <Sider width={300} style={siderStyle} className="siderbar-style">
              <Sidebar />
            </Sider>

            <Layout>
              <Header className="header-style">
                <NavBar handleClick={handleClick} />
              </Header>

              <Content
                className="content-style"
                // style={{ backgroundColor:  }}
              >
                {children}
              </Content>
            </Layout>
          </Layout>
        </Space>
      )}
    </ConfigProvider>
  );
};

export default ProjectLayout;
