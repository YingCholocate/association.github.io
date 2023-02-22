import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthProvider from '@/utils/auth/AuthProvider';
import RequireAuth from '@/utils/auth/RequireAuth';

const LazyLogin = React.lazy(() => import('../pages/login'));
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
        <Route path="/login" element={<LazyLogin />} />
        <Route path="/register" element={<LazyRegister />} />
        <Route path="/" element={<LazyNewSandBox />}>
          {/* <Route path="/" element={<LazyHome />} /> */}
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
