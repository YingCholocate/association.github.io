import React from 'react';
// import { useNavigate } from 'react-router';
import { useAuth } from './AuthProvider';
// 登录验证
export default function AuthStatus() {
  const auth = useAuth();
  if (!auth.user) {
    return <span style={{ margin: '10px' }}>您还没有登录</span>;
  }
  return (
    <span style={{ margin: '10px' }}>
      欢迎<span style={{ color: 'lightblue' }}>{auth.user.username}</span>回来
    </span>
  );
}
