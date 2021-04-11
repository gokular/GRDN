const initState = {
    authToken: ""
}

export type authStateType = {
    authToken?: string,
}

const authReducer = (state: authStateType = initState, action: any) => {
    switch (action.type) {
        case 'SIGN_IN':
            return {
                ...state,
                authToken: action.token
            }
        default:
            return state;
    }
}

export default authReducer