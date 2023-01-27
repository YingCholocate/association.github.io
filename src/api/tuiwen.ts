import request from './request';
import { mockurl } from '@/utils/commonurl';

export interface ITuiwen {
  type: number;
  id: number;
  method: string;
}

export interface IArticle {
  id: number;
  link: string;
  title: string;
  uploadtime: string;
}
// 删除推文
export const deleteTuiwen = (data: ITuiwen) => {
  return request.post(`${mockurl}/resourcedata`, data);
};

// 获取推文
export const getTuiwen = (num: number) => {
  return request.get(`${mockurl}/resourcedata`, { params: { type: 1, currentPage: num } });
};

// 增添推文
export const addTuiwen = (data) => {
  return request.post(`${mockurl}/resourcedata`, data);
};
