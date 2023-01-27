import * as React from 'react';
import {
  Routes,
  Route,
  ActionFunction,
  LoaderFunction,
  ShouldRevalidateFunction,
  useRoutes,
} from 'react-router-dom';
import Login from '../pages/login';
import Home from '../pages/sandbox/Home';
import Schedule from '../pages/sandbox/schedule';
import NewSandBox from '../pages/Layout/NewSandBox';
import Jishu from '../pages/sandbox/publicresource/jishu';
import Mishu from '../pages/sandbox/publicresource/Mushu/mishu';
import Yance from '../pages/sandbox/publicresource/yance';
import Shuzi from '../pages/sandbox/publicresource/shuzi';
import Error404 from '../pages/error/404';
import Register from '../pages/register/register';
import Mishuupload from '../pages/sandbox/publicresource/mishuupload';
import AuthProvider from '@/utils/auth/AuthProvider';
import RequireAuth from '@/utils/auth/RequireAuth';

export default function IndexRouter() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<NewSandBox />}>
          <Route path="/" element={<Home />} />
          <Route path="/association.github.io" element={<Home />} />
          <Route
            path="/schedule"
            element={
              <RequireAuth>
                <Schedule />
              </RequireAuth>
            }
          />

          <Route
            path="/resource/Jishu"
            element={
              <RequireAuth>
                <Jishu />
              </RequireAuth>
            }
          />
          <Route path="/resource/Mishu">
            <Route
              path="arrange"
              element={
                <RequireAuth>
                  <Mishu />
                </RequireAuth>
              }
            />
            <Route
              path="upload"
              element={
                <RequireAuth>
                  <Mishuupload />
                </RequireAuth>
              }
            />
          </Route>
          <Route
            path="/resource/Yance"
            element={
              <RequireAuth>
                <Yance />
              </RequireAuth>
            }
          />
          <Route
            path="/resource/Shuzi"
            element={
              <RequireAuth>
                <Shuzi />
              </RequireAuth>
            }
          />

          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
// 使用config的形式书写
export interface RouteObject {
  path?: string;
  index?: boolean;
  children?: React.ReactNode;
  caseSensitive?: boolean;
  id?: string;
  loader?: LoaderFunction;
  action?: ActionFunction;
  element?: React.ReactNode | null;
  errorElement?: React.ReactNode | null;
  shouldRevalidate?: ShouldRevalidateFunction;
}
export const GetAdminRoute = () => {
  const router = useRoutes([
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
  ]);
  return router;
};
