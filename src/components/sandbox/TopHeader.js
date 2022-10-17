import React, { useState } from 'react'
import { Menu, Layout, Dropdown, Avatar, message } from 'antd';
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux';
import { CollapsedReducer } from '../../redux/reducers/CollapsedReducer';
import url from '../../utils/commonurl'
import style from './index.module.css'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import Qs from 'qs';
// 发布者

function TopHeader(props) {
  const { SubMenu } = Menu;
  const { Header } = Layout;
  const navigate = useNavigate();
  if (!JSON.parse(localStorage.getItem("token"))) {
    let userdata={
      "department": 0,
      "number": "32156789",
      "password": "234567",
      "role": [{id: 0, rolevalue: "数资部工作人员"}],
      "username": "admin"
    }
    localStorage.setItem("token",JSON.stringify(userdata))
  }
  const { username, number } = JSON.parse(localStorage.getItem("token"))
  const changeCollapsed = () => {
    console.log(props)
    props.changeCollapsed()
  }

  const remove = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  const changeinfo = () => {
    navigate('./myself')
  }
  const menu = (
    <Menu>
      <Menu.Item key={2} danger onClick={(e) => {
        axios('association/users', {
          data: {
            number: number
          },
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          },
          transformRequest: [function (data) {
            return Qs.stringify(data)
          }]
        })
          .then(res => {
            message.success('注销成功')
            setTimeout(() =>
              remove()
              , 3000)

          }

          );

      }}>注销</Menu.Item>

      <Menu.Item key={3} danger onClick={remove}>退出</Menu.Item>

    </Menu>
  );

  return (
    <Header className="site-layout-background" style={{ padding: '0 12px' }}>
      {
        props.isCollapsed ? <MenuUnfoldOutlined className={style.menustyle} style={{ color: 'white' }} onClick={changeCollapsed} />
          : <MenuFoldOutlined className={style.menustyle} style={{ color: 'white' }} onClick={changeCollapsed} />
      }
      <div style={{ float: " right", color: 'white', marginRight: '5px' }}>
        <span style={{ margin: "10px" }}>欢迎<span style={{ color: "lightblue" }}>{username}</span>回来</span>
        <Dropdown overlay={menu}>
          <Avatar size="large" icon={<UserOutlined />} />
        </Dropdown>
      </div>

    </Header>
  )
}
const mapStateToProps = ({ CollapsedReducer: { isCollapsed } }) => {

  return {
    isCollapsed

  }
}
const mapDispatchToProps = {
  changeCollapsed() {
    return {
      type: "change_collapsed"

    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TopHeader)