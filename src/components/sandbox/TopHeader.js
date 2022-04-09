import React, { useState } from 'react'
import { Menu, Layout, Dropdown, Avatar, message } from 'antd';
import {useNavigate} from 'react-router-dom'
import { connect } from 'react-redux';
import { CollapsedReducer } from '../../redux/reducers/CollapsedReducer';
import url from '../../utils/commonurl'
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
 
  const { role, username,number} = JSON.parse(localStorage.getItem("token"))

  const changeCollapsed = () => {
    props.changeCollapsed()
  }
  const remove=()=>{
    localStorage.removeItem("token")
    navigate("/login")
  }
  const menu = (
    <Menu>
      <Menu.Item onClick={(e)=>{
       axios('association/users',{
          data:{
            number:number
          },
          method:'POST',
          headers:{
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          },
          transformRequest:[function(data){
            return Qs.stringify(data)
          }]
        })
        .then(res=>{
          message.success('注销成功')
          setTimeout(()=>
          remove()
          ,3000)
         
        }
          
        );
        
      }}>注销</Menu.Item>

      <Menu.Item danger onClick={remove}>退出</Menu.Item>

    </Menu>
  );

  return (
    <Header className="site-layout-background" style={{ padding: 0 }}>
      {
        props.isCollapsed ? <MenuUnfoldOutlined style={{color:'white'}}onClick={changeCollapsed} /> : <MenuFoldOutlined style={{color:'white'}}onClick={changeCollapsed} />
      }
      <div style={{ float: " right",color:'white'}}>
        <span style={{margin:"10px"}}>欢迎<span style={{color:"#18900f"}}>{username}</span>回来</span>
        <Dropdown overlay={menu}>
          <Avatar  size="large" icon={<UserOutlined />} />
        </Dropdown>
      </div>
    </Header>
  )
}
const mapStateToProps=({CollapsedReducer:{isCollapsed}})=>{
  
  return{
    isCollapsed
  
  }
}
const mapDispatchToProps={
  changeCollapsed(){
    return{
      type:"change_collapsed"
      
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(TopHeader)