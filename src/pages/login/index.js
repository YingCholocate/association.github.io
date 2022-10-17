import React from 'react'
import style from "./login.module.css"
import { Form, Input, Button, Checkbox, Tabs, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { NavLink, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router';
import axios from 'axios';
import url from '../../utils/commonurl'

export default function Login() {
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    // &roleState=true&_expand=role
    axios.get('association/users?method=getone',{
      params:{
        number:values.number,
        password:values.password
      }
    }).then(res => {
      console.log(res.data)
      if (res.data.length == 0) {
        message.error('账号或密码不匹配')
      } else {
        localStorage.setItem('token', JSON.stringify(res.data))
        navigate('/home')
      }
    })
  };
  return (
    <div className={style.container}>
      <div className={style.formcontainer}>
        <h2>登录</h2>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="number"
            rules={[
              {
                required: true,
                message: 'Please input your 学号!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} type="number" placeholder="学号" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
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


            <NavLink className={style.toregister} to="/register">register now</NavLink>

          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className={style.loginformbtn}>
              Log in
            </Button>

          </Form.Item>
        </Form>


      </div>

    </div>
  )
}
