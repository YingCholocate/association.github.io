import React from 'react'
import { Outlet } from 'react-router-dom'
import SideMenu from '../../components/sandbox/SideMenu'
import TopHeader from '../../components/sandbox/TopHeader'
import { Layout,Spin } from 'antd';
import style from './NewSandBox.module.css'
import {connect} from  'react-redux'
import { Navigate } from 'react-router-dom';
function NewSandBox(props) {
  const { Content } = Layout;
  return (
    <Layout className='layoutbody'>
      <SideMenu></SideMenu>
      <Layout className="site-layout">
        <TopHeader></TopHeader>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
         
          }}
        >
          {console.log(props.isLoading)}
           <Spin size="middle" spinning={props.isLoading}>
            
          <Outlet/>
          </Spin>
        </Content>
      </Layout>
      {/* <Navigate to="/home" /> */}
    </Layout>
  )
}

const mapStateToProps=({LoadingReducer:{isLoading}})=>({ 
  isLoading
})
export default connect(mapStateToProps)(NewSandBox)