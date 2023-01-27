// 请求验证路由拦截组件

import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import { Navigate, useLocation } from 'react-router';
import { useAuth } from './AuthProvider';

export default function RequireAuth({ children }: { children: JSX.Element }) {
  const [show, setShow] = useState(false);
  const auth = useAuth();
  const location = useLocation(); // 获取url对象
  const handleOk = () => setShow(true);
  if (!auth.user) {
    // 未登入，使用Navigate组件重定向到登录页，传入state属性以保存当前URL位置的信息
    return (
      <>
        <Modal
          title="未登录"
          open
          onOk={handleOk}
          closable={false}
          footer={[
            <Button key="1" type="primary" onClick={handleOk}>
              前往登录
            </Button>,
          ]}
        >
          <p>前往登录 ...</p>
        </Modal>
        {show ? <Navigate to="/login" state={{ from: location }} replace /> : ''}
      </>
    );
  }
  return children;
}
