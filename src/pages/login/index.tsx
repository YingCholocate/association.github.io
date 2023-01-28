import React from 'react';
import style from './login.module.css';
import { Image } from 'antd';
import path from '@/assets/photologo.png';

import LoginForm from './components/LoginForm';

export default function Login() {
  return (
    <div className={style.container}>
      <div className={style.logo}>
        <Image width={50} src={path} preview={false} />
        <span className={style.logoText}>大数据学生实践与发展协会</span>
      </div>
      <div className={style.bgContainer}>
        <div className={style.bgColor}>
          <span className={style.title}>欢迎使用社团管理系统</span>
          <div className={style.formcontainer}>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
