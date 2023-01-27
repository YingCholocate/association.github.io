import React, { useEffect, useState } from 'react';
import { Layout, Menu, Drawer, Button, Tooltip } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  MenuFoldOutlined,
  UserOutlined,
  AppstoreOutlined,
  UploadOutlined,
  TableOutlined,
} from '@ant-design/icons';
import style from './index.module.css';
import { connect } from 'react-redux';
import path from '../../assets/photologo.png';
import useDynamicRoute from '@/hooks/useDynamicRoute';
import { useAuth } from '@/utils/auth/AuthProvider';

const { Sider } = Layout;
// const { SubMenu } = Menu;
export const menuList = [
  {
    key: '/association.github.io',
    label: '首页',
    icon: <UserOutlined />,
    roles: ['admin', 'member', 'shuziStaff', 'jishuStaff', 'mishuStaff', 'yanceStaff'],
  },
  {
    key: '/resource',
    label: '上传资源',
    icon: <AppstoreOutlined />,
    children: [
      {
        key: '/resource/Shuzi',
        label: '数资部',
        icon: <UploadOutlined />,
        roles: ['admin', 'shuziStaff'],
      },
      {
        key: '/resource/Jishu',
        label: '技术部',
        icon: <UploadOutlined />,
        roles: ['admin', 'jishuStaff'],
      },
      {
        key: '/resource/Mishu',
        label: '秘书处',
        icon: <UserOutlined />,
        children: [
          {
            key: '/resource/Mishu/arrange',
            label: '管理',
            icon: <UserOutlined />,
          },
          {
            key: '/resource/Mishu/upload',
            label: '上传',
            icon: <UploadOutlined />,
          },
        ],
        roles: ['admin', 'mishuStaff'],
      },
      {
        key: '/resource/Yance',
        label: '研策部',
        icon: <UploadOutlined />,
        roles: ['admin', 'yanceStaff'],
      },
    ],
  },
  {
    key: '/schedule',
    label: '课表展示',
    icon: <TableOutlined />,
    roles: ['admin', 'shuziStaff', 'jishuStaff', 'mishuStaff', 'yanceStaff'],
  },
];
const publicMenu = [
  {
    key: '/association.github.io',
    label: '首页',
    icon: <UserOutlined />,
    roles: ['admin', 'member', 'shuziStaff', 'jishuStaff', 'mishuStaff', 'yanceStaff'],
  },
];
function SideMenu(props) {
  const { getAccess } = useDynamicRoute();
  const auth = useAuth();
  const dynamicMenuList = auth.user ? getAccess() : publicMenu;
  const navigate = useNavigate();
  const renderMenu = (menuData) => {
    navigate(menuData.key);
  };
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  const [logostyle, setlogostyle] = useState('');
  useEffect(() => {
    if (props.isCollapsed) {
      setlogostyle(style.banvisible);
    } else {
      setlogostyle('');
    }
  }, [props.isCollapsed]);
  return (
    <>
      <Sider className="sider" trigger={null} collapsible collapsed={props.isCollapsed}>
        <div style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
          <div className={style.logo}>
            <img src={path} />
            <span className={logostyle}>社团管理</span>
          </div>
          <div style={{ flex: 1, overflow: 'auto' }}>
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={['1']}
              items={dynamicMenuList}
              onClick={renderMenu}
            />
          </div>
        </div>
      </Sider>
      <Drawer
        placement={'left'}
        width={220}
        onClose={onClose}
        open={visible}
        bodyStyle={{ backgroundColor: '#001529', padding: '0' }}
        headerStyle={{ display: 'none' }}
      >
        <div style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
          <div className={style.logo}>
            {/* <img src={path} /> */}
            社团管理
          </div>
          <div style={{ flex: 1, overflow: 'auto' }}>
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={['1']}
              items={dynamicMenuList}
              onClick={renderMenu}
            />
          </div>
        </div>
      </Drawer>
      <Tooltip title="打开菜单" placement={'bottomRight'}>
        <Button className={style.openstyle} onClick={showDrawer}>
          <MenuFoldOutlined style={{ color: 'white', fontSize: '20px' }} />
        </Button>
      </Tooltip>
    </>
  );
}
const mapStateToProps = ({ CollapsedReducer: { isCollapsed } }) => ({
  isCollapsed,
});
export default connect(mapStateToProps)(SideMenu);
