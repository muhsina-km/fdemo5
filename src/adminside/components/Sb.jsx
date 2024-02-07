import React, { useState } from 'react';
import {
  HomeOutlined,
  FormOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import Navbar from './Navbar';
import {Link, useNavigate} from 'react-router-dom';
import Planttype from '../pages/add/Planttype';
import Plant from '../pages/add/Plant';
import { useLocation } from 'react-router-dom';
import Plantview from '../pages/view/Plantview';
import Plantdetailsview from '../pages/view/Plantdetailsview';
import Dashboard from '../pages/Dashboard';

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, href, children, onClick) {
  return {
    key,
    icon,
    href,
    children,
    label,
    onClick,
  };
}



const App = () => {
  const location = useLocation();
  console.log(location.pathname);
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState('home');
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const renderCurrentView = () => {
    switch (location.pathname) {
      case "/planttype":
        return <Planttype method='post'/>;
      case "/plant":
        return <Plant/>;
      case "/planttypeview":
        return <Plantview method='get'/>;
      case "/plantdetailsview":
        return <Plantdetailsview method='get'/>;
      case "/home":
        return
      case "/dashboard":
        return <Dashboard/>
      default:
        return null;
    }
  };
  const handleClick = (key) => {
    navigate(`/${key}`, { replace: true });
    if (key === "home") {
      navigate("/dashboard");
    }
    console.log(key);
    setCurrent(key);
  }
  const items = [
    getItem('Home', '1', <HomeOutlined />, '/home', null, () => handleClick("dashboard")),
    getItem('Registrations', 'sub1',  <FormOutlined />, null, [
      getItem('Plant Type', '4', null, '/planttype', null, () => handleClick("planttype")),
      getItem('Plant Details', '3', null, '/plant', null, () => handleClick("plant")),
    ]),
    getItem('View', 'sub2', <EyeOutlined />, null, [
      getItem('Plant Type View', '8', null, '/planttypeview', null, () => handleClick("planttypeview")),
      getItem('Plant Details View', '6', null, '/plantdetailsview', null, () => handleClick("plantdetailsview")),
    ]),
  ];
  return (
    <Layout style={{ height: '100vh',overflow: 'hidden' }}>
      <Header style={{ background: colorBgContainer, padding: 0 }}>
        <Navbar />
      </Header>
      <Layout>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          style={{ backgroundColor: "#001932", width: collapsed ? '80px' : '200px', overflow: 'hidden', }}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="light"
            mode="inline"
            style={{ background: '#001932', color: '#ffffff', fontFamily : 'Cursive' }}
            selectedKeys={[]}
            // Remove default focus styles
            itemStyle={{ outline: 'none' }}
          >
            {items.map((item) => {
              if (item.children) {
                return (
                  <Menu.SubMenu
                    key={item.key}
                    icon={item.icon}
                    title={item.label}
                  >
                    {item.children.map((subItem) => (
                      <Menu.Item key={subItem.key} onClick={subItem.onClick}>
                        {/* <Link href={subItem.href}> */}
                          {subItem.label}
                          {/* </Link> */}
                      </Menu.Item>
                    ))}
                  </Menu.SubMenu>
                );
              } else {
                return (
                  <Menu.Item key={item.key} icon={item.icon} onClick={item.onClick} style={{ marginBottom: '8px', marginTop: '10px' }}>
                    {/* <Link href={item.href}> */}
                      {item.label}
                      {/* </Link> */}
                  </Menu.Item>
                );
              }
            })}
          </Menu>
        </Sider>
        <Content style={{
            position: 'relative',
            height: '100vh',
            overflow: 'auto',
  
          }}>
          {renderCurrentView()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
