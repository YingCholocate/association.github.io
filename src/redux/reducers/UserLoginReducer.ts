export const UserLoginReducer = (
  prevState = {
    isLogin: false,
  },
  action,
) => {
  const { type, payload } = action;
  switch (type) {
    case 'change_loginState': {
      const newState = { ...prevState };
      newState.isLogin = payload;
      return newState;
    }
    default:
      return prevState;
  }
};
