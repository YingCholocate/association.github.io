import React from 'react';
import style from './login.module.css';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { NavLink, useNavigate } from 'react-router-dom';
import { setCache } from '@/utils/cache/session';
import { getAuth, IResult } from '@/api/User';

export default function Login() {
  const navigate = useNavigate();
  const onFinish = (formValues) => {
    getAuth(formValues).then((res: IResult) => {
      console.log('res', res.data);
      if (!res.data) {
        message.error('账号或密码不匹配');
      } else {
        if (formValues.remeber) {
          setCache('token', JSON.stringify(res.token));
        } else {
          localStorage.setItem('token', JSON.stringify(res.token));
        }
        localStorage.setItem('userInfo', JSON.stringify(res.data));
        navigate('/');
      }
    });
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
            number: '32156789',
            password: '234567',
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="number"
            rules={[
              {
                required: true,
                message: '请输入学号!',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              type="number"
              placeholder="学号"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: '请输入Password!',
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

            <NavLink className={style.toregister} to="/register">
              register now
            </NavLink>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className={style.loginformbtn}>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
