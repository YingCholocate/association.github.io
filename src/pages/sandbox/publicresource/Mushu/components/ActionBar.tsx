import { Dropdown, Tooltip, Button, Modal, Radio, Input, Form, message } from 'antd';
import React, { Dispatch, SetStateAction, useState } from 'react';
import {
  SwapOutlined,
  FileExcelOutlined,
  EditOutlined,
  PlusOutlined,
  SaveOutlined,
  VerticalAlignBottomOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import style from '../mishu.module.css';
import * as XLSX from 'xlsx';
import { IUser } from '@/api/User';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DataType {}
interface Iprops {
  setEditable: (boolean) => void;
  title: string;
  setTitle: (boolean) => void;
  setEditing: (boolean) => void;
  setSaveBoolean: (boolean) => void;
  editing: boolean;
  dataSourse: DataType[];
  setDataSource: Dispatch<SetStateAction<DataType[]>>;
  setColumns: any;
  columns: any;
}
export default function ActionBar(Iprops: Iprops) {
  const {
    setEditable,
    setEditing,
    editing,
    setSaveBoolean,
    columns,
    dataSourse,
    setDataSource,
    title,
    setTitle,

    setColumns,
  } = Iprops;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  // 添加一列的key值
  const [colkey] = useState([]);
  const [form] = Form.useForm();
  const showModal = () => {
    setIsModalVisible(true);
  };
  // 改变模板
  const handleModuleChange = (e) => {
    if (title === e.target.innerHTML) return;
    if (e.target.innerHTML === '摊位人员安排') {
      setTitle('摊位人员安排');
      setEditable(false);
    }
    if (e.target.innerHTML === '普通活动人员安排') {
      setTitle('普通活动人员安排');
      setEditable(true);
    }
    message.info('切换成功！');
  };
  // 添加一行
  const handleAdd = () => {
    const newData = {};

    Object.keys(dataSourse[0]).forEach((key) => {
      if (key === 'key') {
        newData[key] = dataSourse.length;
      } else {
        newData[key] = '';
      }
    });

    dataSourse && newData && setDataSource([...dataSourse, newData as DataType]);
  };
  // 切换为编辑模式
  const changetoEdit = () => {
    setEditing(true);
  };
  // 保存数据
  const onSave = () => {
    setSaveBoolean(true);
    setEditing(false);
  };
  // 导出数据
  const handleExport = (headers, datas, fileName = `${title}.xlsx`) => {
    // 把dataSourse中的数组转为string并转为具体的值
    const userdata: IUser[] = JSON.parse(localStorage.getItem('alluser') as string);
    const userotherdata: string[] = [];
    userdata.forEach((item) => {
      userotherdata.push(item.username + item.role[0].rolevalue); // Todo
    });
    // const data = datas;
    const data = datas.map((item) => {
      const newKey = { ...item };
      Object.keys(item).forEach((key) => {
        const arr: string[] = [];
        if (key === 'principal' || key === 'member') {
          item[key] &&
            item[key].forEach((num) => {
              arr.push(userotherdata[num]);
            });
          newKey[key] = arr;
        }
      });
      return newKey;
    });
    // console.log(headers, data);
    const _headers = headers
      .map((item, i) =>
        Object.assign(
          {},
          {
            id: item.dataIndex,
            title: item.title,
            // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
            position: String.fromCharCode(65 + i) + 1,
          },
        ),
      )
      .reduce(
        (prev, next) =>
          Object.assign({}, prev, { [next.position]: { id: next.id, v: next.title } }),
        {},
      );

    const _data = data
      .map((item, i) =>
        headers.map((key, j) =>
          Object.assign(
            {},
            // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
            { content: item[key.dataIndex], position: String.fromCharCode(65 + j) + (i + 2) },
          ),
        ),
      )
      // 对刚才的结果进行降维处理（二维数组变成一维数组）
      .reduce((prev, next) => prev.concat(next))
      // 转换成 worksheet 需要的结构
      .reduce(
        (prev, next) => Object.assign({}, prev, { [next.position]: { v: next.content } }),
        {},
      );
    // console.log('_data', _data);
    // 合并 headers 和 data
    const output = Object.assign({}, _headers, _data);
    // 获取所有单元格的位置
    const outputPos = Object.keys(output);
    // 计算出范围 ,["A1",..., "H2"]
    const ref = `${outputPos[0]}:${outputPos[outputPos.length - 1]}`;

    // 构建 workbook 对象
    const wb = {
      SheetNames: ['mySheet'],
      Sheets: {
        mySheet: Object.assign({}, output, {
          '!ref': ref,
          '!cols': [
            { wpx: 45 },
            { wpx: 100 },
            { wpx: 200 },
            { wpx: 80 },
            { wpx: 150 },
            { wpx: 100 },
            { wpx: 300 },
            { wpx: 300 },
          ],
        }),
      },
    };

    // 导出 Excel
    XLSX.writeFile(wb, fileName);
  };

  // 保存为新模板
  const handleSave = () => {
    // if (title === '普通活动人员安排') {
    //   setinialdata([...importExcel]);
    //   setinialcolumns([...columns]);

    // } else {
    //   settanweidata([...importExcel]);
    //   settanweicolumns([...columns]);

    // }
    message.success('保存成功,可进行编辑');
    setEditable(true);
  };
  // 添加一列
  const handleAddcolumn = (key) => {
    let newcol = {};
    if (key.radio === '1') {
      newcol = {
        title: key.title,
        dataIndex: key.title,
        editable: true,
        type: 'select',
      };
    } else {
      newcol = {
        id: key.title,
        key: key.title,
        title: key.title,
        dataIndex: key.title,
        type: 'input',
      };
    }

    setColumns(...columns, newcol);
  };
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <div onClick={handleModuleChange}>摊位人员安排</div>,
    },
    {
      key: '2',
      label: <div onClick={handleModuleChange}>普通活动人员安排</div>,
    },
  ];
  return (
    <>
      <div className={style.topstyle}>
        <Dropdown menu={{ items }} placement="bottomLeft" arrow>
          <Tooltip title="切换模板将导致当前编辑内容丢失，确保已编辑完毕和导出数据">
            <Button type="primary">
              <SwapOutlined />
              切换模板
            </Button>
          </Tooltip>
        </Dropdown>
        {!editing ? (
          <>
            <Button type="primary" onClick={changetoEdit}>
              <EditOutlined />
              进入编辑
            </Button>
            <Button type="primary" onClick={() => handleExport(columns, dataSourse)}>
              <VerticalAlignBottomOutlined />
              导出
            </Button>
          </>
        ) : (
          <>
            <Button type="primary" htmlType="submit" onClick={onSave}>
              <FileExcelOutlined /> 查看效果
            </Button>
            <Button
              onClick={showModal}
              type="primary"
              style={{
                marginBottom: 16,
              }}
            >
              <PlusOutlined />
              增添一列
            </Button>
            <Button
              onClick={handleAdd}
              type="primary"
              style={{
                marginBottom: 16,
              }}
            >
              <PlusOutlined />
              增添一行
            </Button>
            <Button type="primary" onClick={handleSave}>
              <SaveOutlined />
              保存为新模板
            </Button>
          </>
        )}
        <Modal
          title="增添列"
          open={isModalVisible}
          onOk={() => {
            form
              .validateFields()
              .then((values) => {
                form.resetFields();
                handleAddcolumn(values);
              })
              .catch(() => {
                // console.log('Validate Failed:', info);
              });
          }}
          onCancel={handleCancel}
        >
          <Form
            form={form}
            layout="vertical"
            name="form_in_modal"
            initialValues={{
              modifier: 'public',
            }}
          >
            <Form.Item name="radio" rules={[{ required: true, message: 'Please pick an item!' }]}>
              <Radio.Group name="radio-gruop">
                <Radio value={1}>人员列</Radio>
                <Radio value={2}>普通列</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label="title"
              name="title"
              rules={[
                { required: true, message: 'Please input your colname!' },
                {
                  validator: (rule, val, callback) => {
                    colkey.forEach((item) => {
                      if (item === val) {
                        callback('您已经添加过类似的列标题栏，不能输入相同值的列标题');
                      }
                    });
                    callback();
                  },
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
}
