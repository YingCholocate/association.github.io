import React from 'react';
import { Form, Input, Cascader, Button } from 'antd';
import style from './register.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { registerUser } from '@/api/User';

const residences = [
  {
    value: '会员',
    label: '会员',
  },
  {
    value: '工作人员',
    label: '工作人员',
    children: [
      {
        value: '秘书',
        label: '秘书',
      },
      {
        value: '技术',
        label: '技术',
      },
      {
        value: '研策',
        label: '研策',
      },
      {
        value: '数资',
        label: '数资',
      },
    ],
  },
];

export default function Register() {
  const navigate = useNavigate();
  const onFinish = (value) => {
    registerUser(value).then(() => {
      // console.log(response.data);
      navigate('/login');
    });
  };
  return (
    <div className={style.container}>
      <div className={style.formcontainer}>
        <h2>注册信息</h2>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="residence"
            label="职位"
            rules={[
              {
                type: 'array',
                required: true,
                message: 'Please select your habitual residence!',
              },
            ]}
          >
            <Cascader options={residences} />
          </Form.Item>
          <Form.Item
            name="number"
            label="学号"
            rules={[
              {
                required: true,
                message: 'Please input your 学号!',
              },
            ]}
          >
            <Input
              type="number"
              style={{
                width: '100%',
              }}
            />
          </Form.Item>
          <Form.Item
            name="username"
            label="姓名"
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input
              type="text"
              style={{
                width: '100%',
              }}
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="密码"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input
              type="password"
              style={{
                width: '100%',
              }}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className={style.registerformbtn}>
              注册
            </Button>
          </Form.Item>
          <Form.Item>
            <NavLink className={style.tologin} to="/login">
              已有账号,前往登录
            </NavLink>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
