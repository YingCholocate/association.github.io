// 折叠菜单栏，保证为纯函数
export const CollapsedReducer = (prevState = {
    isCollapsed: false
}, action) => {
    let { type } = action
    switch (type) {
        case "change_collapsed":
            let newState={...prevState}
            newState.isCollapsed=!newState.isCollapsed
            return newState
        default:
            return prevState
    }

}