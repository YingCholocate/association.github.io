import request from './request';
import { mockurl } from '@/utils/commonurl';

export interface IUserNumandPw {
  number: number;
  password: number;
}

export interface Irole {
  id: number;
  rolevalue: string;
}
export interface IUser {
  department: number;
  number: string;
  password: string;
  role: Irole[];
  username: string;
}

export interface IResult {
  code: number;
  data: IUser;
  msg?: string;
  token: string;
}

// 判断用户账号密码是否输入正确,正确则登入
export const getAuth = async (values: IUserNumandPw): Promise<IResult> => {
  const result = await request.get(`${mockurl}/users`, {
    params: {
      method: 'getone',
      number: values.number,
      password: values.password,
    },
  });
  return result.data;
};

// 删除用户
export const deleteUser = (data) => {
  return request.post(`${mockurl}/users`, data);
};

// 注册用户
export const registerUser = (value) => {
  return request.post(`${mockurl}/users`, {
    username: value.username,
    number: value.number,
    password: value.password,
    roleName: value.residence,
  });
};

// 获取所有用户信息
export const getAllUserInfo = () => {
  return request.get(`${mockurl}/users`, {
    params: {
      method: 'getall',
    },
  });
};
