import Departahow from '@/components/Departahow';
import { Divider, Layout, Menu, MenuProps } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

import React, { useEffect, useState } from 'react';
import style from './index.module.css';
import { EresourceType, getDepartmentData } from '@/api/resourcedata';

const { Sider } = Layout;
const menuItems: MenuProps['items'] = [
  {
    key: '1',
    icon: <UserOutlined />,
    label: '技术部',
  },
  {
    key: '2',
    icon: <LaptopOutlined />,
    label: '数资部',
  },
  {
    key: '3',
    icon: <NotificationOutlined />,
    label: '秘书处',
  },
  {
    key: '4',
    icon: <UserOutlined />,
    label: '研策部',
  },
];

export default function Resource() {
  const [departTitle, setDepTitle] = useState('技术部资源');
  const [type, setType] = useState(3);
  const initialState = () => {
    let result: string[] = [];
    const func = async () => {
      const res = await getDepartmentData(EresourceType.MISHU);
      result = res;
    };
    func();
    return result;
  };
  const [shuzi, setShuzi] = useState<string[]>(initialState);
  const [jishu, setJishu] = useState<string[]>(initialState);
  const [mishu, setMishu] = useState<string[]>(initialState);
  const [yance, setYance] = useState<string[]>(initialState);

  useEffect(() => {
    getDepartmentData(EresourceType.MISHU).then((res) => setMishu(res));
    getDepartmentData(EresourceType.JISHU).then((res) => setJishu(res));
    getDepartmentData(EresourceType.YANCE).then((res) => setYance(res));
    getDepartmentData(EresourceType.SHUZI).then((res) => setShuzi(res));
  }, []);

  // 展示资源
  const clickShowDepart = (e) => {
    if (e.key === '1') {
      setType(3);
      setDepTitle('技术部资源');
    }
    if (e.key === '2') {
      setType(2);
      setDepTitle('数资部资源');
    }
    if (e.key === '3') {
      setType(4);
      setDepTitle('秘书处资源');
    }
    if (e.key === '4') {
      setType(5);
      setDepTitle('研策部资源');
    }
  };
  // 展示部门数据
  const showDepartment = () => {
    if (type === 2) return shuzi;
    else if (type === 3) return jishu;
    else if (type === 4) return mishu;
    else return yance;
  };
  return (
    <>
      <Divider orientation="left">社团公共资源</Divider>
      <div className={style.resourcecontent}>
        <div className={style.leftresource}>
          <Layout className="site-layout-background">
            <Sider className="site-layout-background" style={{ maxWidth: '200px' }}>
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%' }}
                onClick={clickShowDepart}
                items={menuItems}
              />
            </Sider>
            <Departahow departtitle={departTitle} departdata={showDepartment} />
          </Layout>
        </div>
      </div>
    </>
  );
}
