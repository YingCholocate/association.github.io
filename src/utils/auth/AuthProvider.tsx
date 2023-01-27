import { IUser } from '@/api/User';
import React, { useState } from 'react';
import { fakeAuthProvider } from './auth';

interface AuthContextType {
  user: IUser | null;
  signIn: (user: IUser | null, callback: VoidFunction) => void;
  signOut: (callback: VoidFunction) => void;
}
// 创建上下文空间
const userInfoStr = localStorage.getItem('userInfo');
const userInfo: IUser | null = userInfoStr ? JSON.parse(userInfoStr) : null;

const AuthContext = React.createContext<AuthContextType>(null!);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(userInfo);

  const signIn = (newUser: IUser | null, callback: VoidFunction) => {
    return fakeAuthProvider.signIn(() => {
      setUser(newUser);
      callback();
    });
  };

  const signOut = (callback: VoidFunction) => {
    return fakeAuthProvider.signOut(() => {
      setUser(null);
      callback();
    });
  };
  const value = { user, signIn, signOut };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 利用useContext导出验证上下文，供其他组件使用
const useAuth = () => {
  return React.useContext(AuthContext);
};

export { useAuth };
export default AuthProvider;
