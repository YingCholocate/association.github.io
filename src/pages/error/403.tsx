import React, { Component } from 'react';
import { Result, Button } from 'antd';

export interface Props {
  history: any;
}
export default class Error403 extends Component<Props, object> {
  render() {
    return (
      <Result
        className="error-page"
        status="403"
        title="403"
        subTitle="对不起，你没有权限查看这个页面"
        extra={
          <Button type="primary" onClick={() => this.props.history.goBack()}>
            返回上一页
          </Button>
        }
      />
    );
  }
}
