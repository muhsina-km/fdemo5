import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Result, Space, message, notification } from 'antd';
import { Card } from 'antd';
import axios from 'axios';
import '../stylesheets/Main.css';
import { useNavigate } from 'react-router-dom';
import baseurl from '../../Api';

const App = () => {

  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
  };

  const [username, setUser] = useState('');
  const [password, setPass] = useState('');
  const [error, setError] = useState('');
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const ReadUser = (event) => {
    console.log(event.target.value);
    setUser(event.target.value);
  };

  const ReadPass = (event) => {
    console.log(event.target.value);
    setPass(event.target.value);
  };

  const handleLogin = async (values) => {
    try {
      const { username, password } = values;
      // Make a request to your backend API
      const response = await axios.post(`${baseurl}/login/login`, { username, password });
  
      if (response.data.message === 'Login successful') {
        // Successful login
        notification.open({
          type: 'success',
          message: 'Login successful',
          placement: 'top',
        });
        navigate('/home');
      } else {
        // Invalid credentials
        messageApi.open({
          type: 'error',
          content: 'Invalid username or password',
        });
      }
    } catch (error) {
      console.log('Login error:', error);
      // Handle other errors here, if needed
      messageApi.open({
        type: 'error',
        content: 'Invalid username or password',
      });
    }
  };
  
     
  return (

    <div className='background-container'>
      <center>
      {contextHolder}
        <Card
          className='background-c'
          title={<span style={{ color: 'white',fontSize: '25px' }}>LOGIN</span>}
          hoverable
          bordered={false}
          style={{
            width: 600,
            height: 400,
            marginTop: "5%",
            marginBottom: "10%",
            backdropFilter: 'blur(10px)',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '20px',
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
          }}
        >
          <Form
            form={form}
            name="basic"
            labelCol={{
              span: 7,
            }}
            wrapperCol={{
              span: 22,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            autoComplete="off"
            requiredMark={false}
            onFinish={handleLogin}
            colon={false}
          >
            <Form.Item
              label={<span style={{ color: '#ffffff', fontFamily: 'cursive', fontSize: '16px' }}>
                Username </span>}
              name="username"
              onChange={ReadUser}
              rules={[
                {
                  required: true,
                  message: 'Please enter your username!',
                },
              ]}
            >
              <Input onChange={(e) => form.setFieldValue({ username: e.target.value })} />
            </Form.Item>

            <Form.Item
              label={<span style={{ color: '#ffffff', fontFamily: 'cursive', fontSize: '16px' }}>
                Password </span>}
              name="password"
              onChange={ReadPass}
              rules={[
                {
                  required: true,
                  message: 'Please enter your password!',
                },
              ]}
            >
              <Input.Password onChange={(e) => form.setFieldValue({ password: e.target.value })} />
            </Form.Item>
            <br />
            <Form.Item
              wrapperCol={{
                offset: 6,
                span: 12,
              }}
            >
              <Space>
                <Button htmlType="submit"
                color='success'
                >
                  LOGIN
                </Button>
                <Button htmlType="button" onClick={onReset}>
                  RESET
                </Button>
              </Space>
            </Form.Item>
            {/* {error && <div style={{ color: 'red' }}>{error}</div>} */}
          </Form>
        </Card>
      </center>
    </div>

  );
};

export default App;
