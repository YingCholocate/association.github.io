import React from 'react'
import { Layout, Menu } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  UserOutlined,

} from '@ant-design/icons';
import style from  './index.module.css'
import { connect } from 'react-redux';
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
    icon: <UserOutlined />,
    children: [
      {
        key: "/resource/Shuzi",
        title: "数资部",
        icon: <UserOutlined />
      },
      {
        key: "/resource/Jishu",
        title: "技术部",
        icon: <UserOutlined />
      }
      ,
      {
        key: "/resource/Mishu",
        title: "秘书处",
        icon: <UserOutlined />,
        children:[
          {
            key: "/resource/Mishu/arrange",
            title: "管理",
            icon: <UserOutlined />
          },
          {
            key: "/resource/Mishu/upload",
            title: "上传",
            icon: <UserOutlined />
          }
        ]
      },
      {
        key: "/resource/Yance",
        title: "研策部",
        icon: <UserOutlined />
      }
    ]
  },
  {
    key: "/schedule",
    title: "人员安排",
    icon: <UserOutlined />,

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

  return (
    <Sider className="sider" trigger={null} collapsible collapsed={props.isCollapsed}>
      <div style={{ display: "flex", height: "100%", flexDirection: "column" }}>
        <div className={style.logo} >社团管理</div>
        <div style={{ flex: 1, overflow: "auto" }}>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            {renderMenu(menuList)}
          </Menu>
        </div>
      </div>
    </Sider>
  )
}
const mapStateToProps=({CollapsedReducer:{isCollapsed}})=>({
  
  isCollapsed


})
export default connect(mapStateToProps) (SideMenu)