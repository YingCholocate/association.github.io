import React from 'react';
import { Outlet } from 'react-router-dom';
import SideMenu from '../../components/sandbox/SideMenu';
import TopHeader from '../../components/sandbox/TopHeader';
import { Layout, Spin } from 'antd';
import { connect } from 'react-redux';

function NewSandBox(props) {
  const { Content } = Layout;
  return (
    <Layout className="layoutbody">
      {/* 侧边栏 */}
      <SideMenu />
      {/* 主题内容 */}
      <Layout className="site-layout">
        {/* 标题 */}
        <TopHeader />
        {/* 内容 */}
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <Spin spinning={props.isLoading}>
            <Outlet />
          </Spin>
        </Content>
      </Layout>
    </Layout>
  );
}

const mapStateToProps = ({ LoadingReducer: { isLoading } }) => ({
  isLoading,
});
export default connect(mapStateToProps)(NewSandBox);
