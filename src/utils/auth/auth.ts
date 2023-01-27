// 真实项目场景下，用户信息应该是存在store里
export const fakeAuthProvider = {
  isAuthenticates: false,
  //   模拟登录
  signIn(callback: VoidFunction) {
    fakeAuthProvider.isAuthenticates = true;
    setTimeout(callback, 100); // fake async
  },
  // 模拟登出
  signOut(callback: VoidFunction) {
    fakeAuthProvider.isAuthenticates = false;
    setTimeout(callback, 100);
  },
};
