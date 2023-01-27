import request from './request';
import { mockurl } from '@/utils/commonurl';
import { ICourse } from '@/utils/staticData';

// 获取所有课程
export const getAllCourse = () => {
  return request.get(`${mockurl}/course`, { params: { method: 'getall' } });
};

export const getOneCourse = (number): Promise<ICourse[]> => {
  return request.get(`${mockurl}/course`, { params: { method: 'getone', index: number } });
};

export const getStartEnd = (number?) => {
  return request.get(`${mockurl}/course`, { params: { id: 1, index: number } });
};

export const addCourse = (data) => {
  return request.post(`${mockurl}/course`, data);
};
