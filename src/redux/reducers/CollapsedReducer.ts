// 折叠菜单栏，保证为纯函数
export const CollapsedReducer = (
  prevState = {
    isCollapsed: false,
  },
  action,
) => {
  const { type } = action;
  switch (type) {
    case 'change_collapsed': {
      const newState = { ...prevState };
      newState.isCollapsed = !newState.isCollapsed;
      return newState;
    }
    default:
      return prevState;
  }
};
