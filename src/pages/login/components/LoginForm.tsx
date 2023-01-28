import React from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { NavLink, useNavigate } from 'react-router-dom';
import { setCache } from '@/utils/cache/session';
import { getAuth, IResult } from '@/api/User';
import { mockurl } from '@/utils/commonurl';
import style from '../login.module.css';

export default function LoginForm(props) {
  const navigate = useNavigate();
  const onFinish = (formValues) => {
    getAuth(formValues).then((res: IResult) => {
      const mockurl1 = '/mock';
      const mockBoolean = mockurl.match(mockurl1) !== null;
      const result = mockBoolean ? res : res.data;
      if (!result) {
        message.error('账号或密码不匹配');
      } else {
        if (formValues.remeber) {
          setCache('token', JSON.stringify(res.token));
        } else {
          localStorage.setItem('token', JSON.stringify(res.token));
        }
        localStorage.setItem('userInfo', JSON.stringify(result));
        navigate('/');
        window.location.reload();
      }
    });
  };

  return (
    <div {...props}>
      {/* <h2>登录</h2> */}
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
          number: '67890',
          password: '3456',
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
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <NavLink className={style.toregister} to="/register">
            现在注册
          </NavLink>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className={style.loginformbtn}>
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
