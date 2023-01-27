import { IUser } from '@/api/User';
import { NORMALACTData } from '@/utils/staticData';
import { Popconfirm, Form, Space, Table, FormInstance, InputRef, Input, Tag } from 'antd';
import style from '../mishu.module.css';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';

import SelectInput from './SelectInput';
import ActionBar from './ActionBar';

interface Iprops {
  userdata: IUser[];
  editing: boolean;
  setEditing: (boolean) => void;
  saveBoolean: boolean;
  setSaveBoolean: (boolean) => void;
  setEditable: (boolean) => void;
  setTitle: (boolean) => void;
  title: string;
}

interface DataType {
  key: React.Key;
  group: string; // 组别
  notice: string; // 事项
  principal: string[] | string; // 负责人
  member: string[] | string; // 成员
  action?: string;
}
export default function ViewTable(Iprops: Iprops) {
  const { userdata, editing, setEditing, setEditable, saveBoolean, setSaveBoolean, ...restprops } =
    Iprops;

  // 添加部门
  const addDECo = () => {
    const rolenameArr = userdata.map((item) => item.role[0].rolevalue);
    const colorarr: string[] = [];
    rolenameArr.forEach((rolename) => {
      if (rolename === '数资部工作人员') {
        colorarr.push('blue');
      } else if (rolename === '技术部工作人员') {
        colorarr.push('green');
      } else if (rolename === '秘书处工作人员') {
        colorarr.push('pink');
      } else if (rolename === '研策部工作人员') {
        colorarr.push('purple');
      } else {
        colorarr.push('gold');
      }
    });

    return colorarr;
  };
  const EditableContext = React.createContext<FormInstance<any> | null>(null);
  // 表格列的表头
  interface Item {
    group: string; // 组别
    notice: string; // 事项
    principal: string[] | string; // 负责人
    member: string[] | string; // 成员
  }

  interface EditableRowProps {
    index: number;
  }
  const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
    const [form] = Form.useForm();

    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
  };
  interface EditableCellProps {
    title: React.ReactNode;
    editable: boolean;
    children: React.ReactNode;
    dataIndex: keyof Item;
    record: Item;
    handleSave: (record: Item) => void;
  }
  const EditableCell: React.FC<EditableCellProps> = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }) => {
    const inputRef = useRef<InputRef>(null);
    const form = useContext(EditableContext)!;
    useMemo(() => {
      form.setFieldsValue({ [dataIndex]: record[dataIndex] });
    }, []);

    const save = async () => {
      // try {
      const values = await form.validateFields();
      // console.log('values', values);
      // record代表原來的數據，values代表新增的内容

      handleSave({ ...record, ...values });
      // }
      // catch (errInfo) {
      //   console.log('Save failed:', errInfo);
      // }
    };
    let childNode = children;
    const getUserData = () => {
      const userotherdata: string[] = [];
      userdata.forEach((item) => {
        userotherdata.push(item.username + item.role[0].rolevalue); // Todo
      });

      return userotherdata;
    };

    if (editable) {
      childNode = editing ? (
        <Form.Item style={{ margin: 0 }} name={dataIndex}>
          {dataIndex === 'member' || dataIndex === 'principal' ? (
            <SelectInput
              color={addDECo()}
              items={record[dataIndex]}
              userdata={userdata}
              form={form}
              onBlur={save}
            />
          ) : (
            <Input ref={inputRef} onBlur={save} />
          )}
        </Form.Item>
      ) : (
        <Form.Item style={{ margin: 0 }} name={dataIndex}>
          <div className={style['editable-cell-value-wrap']} style={{ paddingRight: 24 }}>
            {dataIndex === 'member' || dataIndex === 'principal' ? (
              <span>
                {children &&
                  children[1] &&
                  children[1].map((num) => {
                    return <Tag key={num}>{getUserData()[num]}</Tag>;
                  })}
              </span>
            ) : (
              <span>{children}</span>
            )}
          </div>
        </Form.Item>
      );
    }

    return <td {...restProps}>{childNode}</td>;
  };
  type EditableTableProps = Parameters<typeof Table>[0];

  type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

  // 删除一行;
  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const newColumns: ColumnTypes[number] & { editable?: boolean; dataIndex: string } = {
    title: '操作',
    dataIndex: 'action',
    width: '20%',
    editable: false,
    render: (_, records: { key: React.Key }) =>
      dataSource.length >= 1 ? (
        <Space size="middle">
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(records.key)}>
            <a>Delete</a>
          </Popconfirm>
        </Space>
      ) : null,
  };
  const [dataSource, setDataSource] = useState<DataType[]>(NORMALACTData);
  // const dataSourceRef = useRef(null);
  useEffect(() => {
    // console.log('ddd', dataSource);
    // dataSourceRef.current = dataSource;
  }, [dataSource]);
  const defaultColumns: Array<ColumnTypes[number] & { editable?: boolean; dataIndex: string }> = [
    {
      title: '组别',
      dataIndex: 'group',
      width: '20%',
      editable: true,
    },
    {
      title: '事项',
      dataIndex: 'notice',
      width: '20%',
      editable: true,
    },
    {
      title: '负责人',
      dataIndex: 'principal',
      width: '20%',
      editable: true,
    },
    {
      title: '成员',
      dataIndex: 'member',
      width: '20%',
      editable: true,
    },
  ];

  useMemo(() => {
    if (!defaultColumns.includes(newColumns) && editing) {
      defaultColumns.push(newColumns);
    }
  }, [editing]);
  const handleSave = (row: DataType) => {
    // 当我们state所定义的state类型为Object或Array时，在回调中直接setState是无法成功
    // 在state未返回时，可以使用回调函数的方式获取
    setDataSource((dataSource1) => {
      const newData = [...dataSource1];
      const index = newData.findIndex((item) => row.key === item.key);
      const item = newData[index];

      // 后面同名的会代替前面的，也就是说row中的undefined会替代前面的有值的部分
      newData.splice(index, 1, {
        ...item,
        ...row,
      });
      // console.log('newData', newData);
      return newData;
    });
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const [columns, setColumns] = useState(
    defaultColumns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record: DataType) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave,
        }),
      };
    }),
  );

  return (
    <>
      <ActionBar
        setEditable={setEditable}
        setEditing={setEditing}
        editing={editing}
        setSaveBoolean={setSaveBoolean}
        dataSourse={dataSource}
        setDataSource={setDataSource}
        setTitle={restprops.setTitle}
        title={restprops.title}
        columns={columns}
        setColumns={setColumns}
      />
      <Form>
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns as ColumnTypes}
        />
      </Form>
    </>
  );
}
