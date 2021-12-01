export const initialState = {
    userInfo: null,
};

export const user = (state = initialState, action) => {
    switch (action.type) {
        case 'user/setUserInfo':
            return {
                ...state,
                userInfo: action.state,
            };
        default:
            return state;
    }
};