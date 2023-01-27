import { Table } from 'antd';
import React from 'react';

export default function TablebanEdit(props) {
  const { columns, data } = props;
  return <Table columns={columns} dataSource={data} />;
}
