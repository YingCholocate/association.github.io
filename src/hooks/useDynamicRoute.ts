import { IUser } from '@/api/User';
import { menuList } from '@/components/sandbox/SideMenu';
import { message } from 'antd';
import { useNavigate } from 'react-router';

export enum ERoles {
  'admin' = '',
  '会员' = 'member',
  '数资部工作人员' = 'shuziStaff',
  '技术部工作人员' = 'jishuStaff',
  '秘书处工作人员' = 'mishuStaff',
  '研策部工作人员' = 'yanceStaff',
}

// 是否有相应的权限，没有隐藏菜单项或禁止使用
export default function useDynamicRoute() {
  const userInfoStr = localStorage.getItem('userInfo');
  const navigate = useNavigate();
  const userInfo: IUser = userInfoStr ? JSON.parse(userInfoStr) : null;
  const getAccess = () => {
    if (!userInfo) {
      message.error('还未登录');
      navigate('/login');
      return;
    }
    const roles = userInfo.role && userInfo.role[0].rolevalue;

    const dynamicMenuList = menuList.map((menu) => {
      if (menu.roles && menu.roles.includes(ERoles[roles])) {
        return menu;
      }
      return {
        key: menu.key,
        label: menu.label,
        icon: menu.icon,
        children: menu.children?.filter((child) => {
          return child.roles.includes(ERoles[roles]);
        }),
      };
    });
    return dynamicMenuList;
  };

  const showOrNotByRule = () => {
    if (!userInfo) {
      message.error('还未登录');
      navigate('/login');
      return;
    }
    const roles = userInfo.role && userInfo.role[0].rolevalue;
    if (roles === '秘书处工作人员' || roles === 'admin') {
      return true;
    }
    return false;
  };
  return { getAccess, showOrNotByRule };
}
