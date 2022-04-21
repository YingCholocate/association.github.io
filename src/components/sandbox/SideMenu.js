import React, { useEffect, useState } from 'react'
import { Layout, Menu, Image, Drawer, Button, Space, Tooltip } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  UserOutlined,
  AppstoreOutlined,
  UploadOutlined,
  IdcardOutlined,
  TableOutlined,
  MenuFoldOutlined
} from '@ant-design/icons';
import style from './index.module.css'
import { connect } from 'react-redux';
import path from '../../assets/photologo.png'
import { hover } from '@testing-library/user-event/dist/hover';
const { Sider } = Layout;
const { SubMenu } = Menu;
const menuList = [
  {
    key: "/home",
    title: "首页",
    icon: <UserOutlined />
  },
  {
    key: "/resource",
    title: "资源",
    icon: <AppstoreOutlined />,
    children: [
      {
        key: "/resource/Shuzi",
        title: "数资部",
        icon: <UploadOutlined />
      },
      {
        key: "/resource/Jishu",
        title: "技术部",
        icon: <UploadOutlined />
      }
      ,
      {
        key: "/resource/Mishu",
        title: "秘书处",
        icon: <UserOutlined />,
        children: [
          {
            key: "/resource/Mishu/arrange",
            title: "管理",
            icon: <UserOutlined />
          },
          {
            key: "/resource/Mishu/upload",
            title: "上传",
            icon: <UploadOutlined />
          }
        ]
      },
      {
        key: "/resource/Yance",
        title: "研策部",
        icon: <UploadOutlined />
      }
    ]
  },
  {
    key: "/schedule",
    title: "课表展示",
    icon: <TableOutlined />,
  }

]
function SideMenu(props) {
  const navigate = useNavigate();
  const renderMenu = (menuList) => {
    return menuList.map(item => {
      if (item.children) {
        return (
          <SubMenu key={item.key} icon={item.icon} title={item.title}>
            {renderMenu(item.children)}
          </SubMenu>)
      }
      return <Menu.Item key={item.key} icon={item.icon} onClick={() => {
        navigate(item.key)
      }}>{item.title}</Menu.Item>
    })
  }
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  const [logostyle, setlogostyle] = useState('')
  useEffect(() => {
    if (props.isCollapsed) {
      setlogostyle(style.banvisible)
    } else {
      setlogostyle('')
    }
  }, [props.isCollapsed])
  return (
    <>
      <Sider className="sider" trigger={null} collapsible collapsed={props.isCollapsed}>
        <div style={{ display: "flex", height: "100%", flexDirection: "column" }}>
          <div className={style.logo} >
            <img src={path} />
          <span className={logostyle}>社团管理</span>  
          </div>
          <div style={{ flex: 1, overflow: "auto" }}>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              {renderMenu(menuList)}
            </Menu>
          </div>
        </div>
      </Sider>
      <Drawer
        placement={'left'}
        width={220}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ backgroundColor: '#001529', padding: '0' }}
        headerStyle={{ display: 'none' }}
      >
        <div style={{ display: "flex", height: "100%", flexDirection: "column" }}>
          <div className={style.logo} >
            <img src={path} />
            社团管理
          </div>
          <div style={{ flex: 1, overflow: "auto" }}>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              {renderMenu(menuList)}
            </Menu>
          </div>
        </div>

      </Drawer>
      <Tooltip title="打开菜单" placement={'bottomRight'} >
        <Button className={style.openstyle} onClick={showDrawer}>

          <MenuFoldOutlined style={{ color: 'white', fontSize: "20px" }} />

        </Button>
      </Tooltip>
    </>
  )
}
const mapStateToProps = ({ CollapsedReducer: { isCollapsed } }) => ({
  isCollapsed
})
export default connect(mapStateToProps)(SideMenu)