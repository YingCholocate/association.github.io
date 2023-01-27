// 自定义表单控件
import { FormInstance, Select, Tag } from 'antd';
import React from 'react';
import { IUser } from '@/api/User';

interface Iprops {
  color: string[];
  value?: string[];
  onChange?: (value: string[]) => void;
  items: any;
  userdata: IUser[];
  form: FormInstance; // TODO
  onBlur?: () => void;
}
export default function SelectInput(Iprops: Iprops) {
  const { color, userdata, onChange, onBlur, value: values } = Iprops;
  const { Option } = Select;

  // 改变select的值
  const handleselectChange = (changedValue: string[]) => {
    // console.log('op', op, changedValue);
    changedValue && onChange?.([...changedValue]);
  };
  // 标签栏的颜色
  const tagRender = (props) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color={color[value]}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {label}
      </Tag>
    );
  };

  const getUserData = () => {
    const userotherdata: string[] = [];
    userdata.forEach((item) => {
      userotherdata.push(item.username + item.role[0].rolevalue); // Todo
    });

    return userotherdata;
  };
  return (
    <Select
      tagRender={tagRender}
      mode="multiple"
      allowClear
      style={{ width: '100%', minWidth: '180px' }}
      placeholder="Please select"
      onChange={handleselectChange}
      autoClearSearchValue
      onBlur={onBlur}
      value={values || undefined}
    >
      {getUserData().map((item, index) => {
        return (
          <Option key={item} value={index} label={item}>
            {item}
          </Option>
        );
      })}
    </Select>
  );
}
