import React, { Component } from 'react';
import { Result, Button } from 'antd';

export default class Error404 extends Component {
  render() {
    return (
      <Result
        className="error-page"
        status="404"
        title="404"
        subTitle="对不起，你访问的页面不存在"
        extra={
          <Button type="primary" onClick={() => window.location.replace(window.location.href)}>
            刷新页面
          </Button>
        }
      />
    );
  }
}
