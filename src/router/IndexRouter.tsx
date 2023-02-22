import * as React from 'react';
import {
  Routes,
  Route,
  ActionFunction,
  LoaderFunction,
  ShouldRevalidateFunction,
  useRoutes,
} from 'react-router-dom';
import AuthProvider from '@/utils/auth/AuthProvider';
import RequireAuth from '@/utils/auth/RequireAuth';
import Login from '../pages/login';

// const LazyLogin = React.lazy(() => import('../pages/login'));
const LazyHome = React.lazy(() => import('../pages/sandbox/Home'));
const LazySchedule = React.lazy(() => import('../pages/sandbox/schedule'));

const LazyNewSandBox = React.lazy(() => import('../pages/Layout/NewSandBox'));
const LazyJishu = React.lazy(() => import('../pages/sandbox/publicresource/jishu'));
const LazyMishu = React.lazy(() => import('../pages/sandbox/publicresource/Mushu/mishu'));
const LazyYance = React.lazy(() => import('../pages/sandbox/publicresource/yance'));
const LazyShuzi = React.lazy(() => import('../pages/sandbox/publicresource/shuzi'));
const LazyError404 = React.lazy(() => import('../pages/error/404'));
const LazyRegister = React.lazy(() => import('../pages/register/register'));
const LazyMishuupload = React.lazy(() => import('../pages/sandbox/publicresource/mishuupload'));

export default function IndexRouter() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<LazyRegister />} />
        <Route path="/" element={<LazyNewSandBox />}>
          <Route path="/" element={<LazyHome />} />
          <Route path="/association.github.io" element={<LazyHome />} />
          <Route
            path="/schedule"
            element={
              <RequireAuth>
                <LazySchedule />
              </RequireAuth>
            }
          />

          <Route
            path="/resource/Jishu"
            element={
              <RequireAuth>
                <LazyJishu />
              </RequireAuth>
            }
          />
          <Route path="/resource/Mishu">
            <Route
              path="arrange"
              element={
                <RequireAuth>
                  <LazyMishu />
                </RequireAuth>
              }
            />
            <Route
              path="upload"
              element={
                <RequireAuth>
                  <LazyMishuupload />
                </RequireAuth>
              }
            />
          </Route>
          <Route
            path="/resource/Yance"
            element={
              <RequireAuth>
                <LazyYance />
              </RequireAuth>
            }
          />
          <Route
            path="/resource/Shuzi"
            element={
              <RequireAuth>
                <LazyShuzi />
              </RequireAuth>
            }
          />

          <Route path="*" element={<LazyError404 />} />
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
    { path: '/register', element: <LazyRegister /> },
  ]);
  return router;
};
