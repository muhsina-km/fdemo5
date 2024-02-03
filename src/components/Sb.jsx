import React, { useState } from 'react';
import {
  HomeOutlined,
  FormOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import Navbar from './Navbar';
import {Link} from 'react-router-dom';
const { Header, Sider } = Layout;

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
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState('home');
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleClick = (key) => {
    console.log(key);
  }
  const items = [
    getItem('Home', '1', <HomeOutlined />, '/home', null, () => handleClick("home")),
    getItem('Registrations', 'sub1',  <FormOutlined />, null, [
      getItem('Plant Type', '4', null, '/planttype'),
      getItem('Plant Details', '3', null, '/plant'),
    ]),
    getItem('View', 'sub2', <EyeOutlined />, null, [
      getItem('Plant Type View', '8', null, '/planttypeview'),
      getItem('Plant Details View', '6', null, '/plantdetailsview'),
    ]),
  ];
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: colorBgContainer, padding: 0 }}>
        <Navbar />
      </Header>
      <Layout>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          style={{ backgroundColor: "#891545", width: collapsed ? '80px' : '200px', overflow: 'hidden', }}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="light"
            mode="inline"
            style={{ background: '#891545', color: '#ffffff', fontFamily : 'Cursive' }}
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
                      <Menu.Item key={subItem.key}>
                        <Link href={subItem.href}>{subItem.label}</Link>
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
      </Layout>
    </Layout>
  );
};

export default App;
