import request from './request';
import { mockurl } from '@/utils/commonurl';

export enum EresourceType {
  MISHU = 4,
  JISHU = 3,
  YANCE = 5,
  SHUZI = 2,
}
// 获取公告资源部门数据
export const getDepartmentData = async (type: number): Promise<string[]> => {
  const res = await request.get(`${mockurl}/resourcedata`, { params: { type } });
  return res.data;
};
