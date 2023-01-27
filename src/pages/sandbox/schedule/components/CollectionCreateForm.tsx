import React from 'react';
import { Modal, Form, Input, Select } from 'antd';

// 添加课程
const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const handlezoiciChange = () => {
    // console.log(value);
  };
  const zoucichildren = () => {
    for (let i = 1; i < 22; i++) {
      return <Option key={i}>第{i}周</Option>;
    }
  };
  const xqchildren = () => {
    for (let i = 1; i < 8; i++) {
      return <Option key={i}>星期{i}</Option>;
    }
  };
  const jcdmchildren = () => {
    for (let i = 1; i < 13; i++) {
      return <Option key={i}>{i}</Option>;
    }
  };
  return (
    <Modal
      open={visible}
      title="添加课程"
      okText="确认提交"
      cancelText="取消"
      onCancel={onCancel}
      onOk={() => {
        form.validateFields().then((values) => {
          form.resetFields();
          onCreate(values);
        });
        // .catch((info) => {
        //   console.log('Validate Failed:', info);
        // });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: 'public',
        }}
      >
        <Form.Item
          name="kcmc"
          label="课程名"
          rules={[
            {
              required: true,
              message: '请输入课程名!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="zcstart"
          label="第几周开始上课"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            allowClear
            style={{ width: '100%' }}
            placeholder="Please select"
            onChange={handlezoiciChange}
          >
            {zoucichildren()}
          </Select>
        </Form.Item>
        <Form.Item
          name="zcend"
          label="第几周结束上课"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            allowClear
            style={{ width: '100%' }}
            placeholder="Please select"
            onChange={handlezoiciChange}
          >
            {zoucichildren()}
          </Select>
        </Form.Item>
        <Form.Item
          name="xq"
          label="星期几上课"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            allowClear
            style={{ width: '100%' }}
            placeholder="Please select"
            onChange={handlezoiciChange}
          >
            {xqchildren()}
          </Select>
        </Form.Item>
        <Form.Item
          name="jcdm2"
          label="从第几小节开始"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            allowClear
            style={{ width: '100%' }}
            placeholder="Please select"
            onChange={handlezoiciChange}
          >
            {jcdmchildren()}
          </Select>
        </Form.Item>

        <Form.Item name="jxcdmc" label="上课地点(可选)">
          <Input type="textarea" />
        </Form.Item>
        <Form.Item name="bgcolor" label="课程背景颜色">
          <Input type="color" value="#1890ff" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default CollectionCreateForm;
