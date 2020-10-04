import React from 'react'
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { authenticate1stFA } from './utils'

const LoginScreen = (props) => {

  const onFinish = async (values) => {
    const {
      username,
      password,
      remember
    } = values;

    message.info('authenticating')
    const repsonse1stFA = await authenticate1stFA(username, password)

    if (repsonse1stFA.refreshToken) {
      localStorage.setItem('refreshToken', repsonse1stFA.refreshToken)
      props.setLoggedIn(true)
    }


    // NOT SUPPORTING 2FA currently, should, but can work with getting refresh token locally.

    // store access token to local storage, until log out
    //console.log('Received values of form: ', values);
    //message.info('username, password received')
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginScreen
