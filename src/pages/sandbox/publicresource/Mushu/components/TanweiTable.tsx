import React, { useContext, useEffect, useRef, useState } from 'react';
import { Form, Input, Popconfirm, Table, Tag, InputRef } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { TANWEIData } from '@/utils/staticData';
import SelectInput from './SelectInput';
import { IUser } from '@/api/User';
import { useAuth } from '@/utils/auth/AuthProvider';
import style from '../mishu.module.css';
import ActionBar from './ActionBar';

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: string;
  time: string;
  content: string;
  person: string;
  notice: string;
}

interface EditableRowProps {
  index: number;
}
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
export default function TanweiTable(Iprops: Iprops) {
  const { userdata, editing, setEditing, setEditable, setSaveBoolean, ...restprops } = Iprops;
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
  const auth = useAuth();
  // 添加部门
  const addDECo = () => {
    const rolename = auth.user?.role[0].rolevalue;
    const colorarr: string[] = [];
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
    return colorarr;
  };
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

    useEffect(() => {
      record && form.setFieldsValue({ [dataIndex]: record[dataIndex] });
    }, [editing]);

    const save = async () => {
      // try {
      const values = await form.validateFields();
      handleSave({ ...record, ...values });
      // }
      // catch (errInfo) {
      //   // console.log('Save failed:', errInfo);
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
          {dataIndex === 'person' ? (
            <SelectInput
              form={form}
              color={addDECo()}
              items={record[dataIndex]}
              userdata={userdata}
              onBlur={save}
            />
          ) : (
            <Input ref={inputRef} onPressEnter={save} onBlur={save} />
          )}
        </Form.Item>
      ) : (
        <Form.Item style={{ margin: 0 }} name={dataIndex}>
          <div className={style['editable-cell-value-wrap']} style={{ paddingRight: 24 }}>
            {dataIndex === 'person' ? (
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

  interface DataType {
    key: React.Key;
    time: string;
    content: string;
    person: string;
    notice: string;
    action?: string;
  }

  type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

  const [dataSource, setDataSource] = useState<DataType[]>(TANWEIData);

  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const defaultColumns: Array<ColumnTypes[number] & { editable?: boolean; dataIndex: string }> = [
    {
      title: '时间',
      dataIndex: 'time',
      width: '20%',
      editable: true,
    },
    {
      title: '内容',
      dataIndex: 'content',
      editable: true,
    },
    {
      title: '人员',
      dataIndex: 'person',
      editable: true,
    },
    {
      title: '注意事项',
      dataIndex: 'notice',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record: { key: React.Key }) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const handleSave = (row: DataType) => {
    setDataSource((dataSource1) => {
      const newData = [...dataSource1];
      const index = newData.findIndex((item) => row.key === item.key);
      const item = newData[index];

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
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns as ColumnTypes}
      />
    </>
  );
}
