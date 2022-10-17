import ajax from "./ajax";
// 注册接口
export const reqRegister=(user)=>ajax('/register',user,'POST')
// 登录接口
export const reqLogin=({username,password})=>ajax('/login',{username,password},'POST')

// 获取课程信息
// export const reqCourse=(zc)=>ajax('/coursedata',{zc},'POST')