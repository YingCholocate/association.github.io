import React from 'react';
import { Layout, Dropdown, Avatar, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import type { MenuProps } from 'antd';
import style from './index.module.css';
import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined } from '@ant-design/icons';
import { deleteUser } from '@/api/User';
import AuthStatus from '@/utils/auth/AuthStatus';
import { useAuth } from '@/utils/auth/AuthProvider';
// 发布者
interface Iprops {
  changeCollapsed: any;
  isCollapsed: boolean;
}
function TopHeader(props: Iprops) {
  const { Header } = Layout;
  const navigate = useNavigate();
  const localToken: string | null = localStorage.getItem('token');
  // 如果没有，默认设置
  if (!localToken) {
    const userdata = {
      department: 0,
      number: '67890',
      password: '3456',
      role: [{ id: 0, rolevalue: '秘书处工作人员' }],
      username: 'admin',
    };
    localStorage.setItem('token', JSON.stringify(userdata));
  }
  const auth = useAuth();
  const number = auth.user?.number;
  const changeCollapsed = () => {
    props.changeCollapsed();
  };

  const remove = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const items: MenuProps['items'] = [
    {
      key: 2,
      danger: true,
      onClick: () => {
        // axios('association/users', {
        //   data: {
        //     number,
        //   },
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        //   },
        //   transformRequest: [
        //     function (data) {
        //       return Qs.stringify(data);
        //     },
        //   ],
        // })
        deleteUser(number).then(() => {
          message.success('注销成功');
          setTimeout(() => remove(), 3000);
        });
      },
      label: '注销',
    },
    {
      key: 3,
      danger: true,
      onClick: () => {
        remove();
      },
      label: '退出',
    },
  ];

  return (
    <Header className="site-layout-background" style={{ padding: '0 12px' }}>
      {props.isCollapsed ? (
        <MenuUnfoldOutlined
          className={style.menustyle}
          style={{ color: 'white' }}
          onClick={changeCollapsed}
        />
      ) : (
        <MenuFoldOutlined
          className={style.menustyle}
          style={{ color: 'white' }}
          onClick={changeCollapsed}
        />
      )}
      <div style={{ float: 'right', color: 'white', marginRight: '5px' }}>
        <AuthStatus />

        <Dropdown menu={{ items }}>
          <Avatar size="large" icon={<UserOutlined />} />
        </Dropdown>
      </div>
    </Header>
  );
}
const mapStateToProps = ({ CollapsedReducer: { isCollapsed } }) => {
  return {
    isCollapsed,
  };
};
const mapDispatchToProps = {
  changeCollapsed() {
    return {
      type: 'change_collapsed',
    };
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(TopHeader);
