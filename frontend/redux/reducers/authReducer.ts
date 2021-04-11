
const initState = {
    authToken: "",
    username: ""
}

export type authStateType = {
    authToken?: string,
    username?: string
}

const authReducer = (state: authStateType = initState, action: any) => {
    switch (action.type) {
        case 'SIGN_IN':
            return {
                ...state,
                authToken: action.authToken,
                username: action.username
            }
        default:
            return state;
    }
}

export default authReducer