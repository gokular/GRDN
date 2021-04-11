const initState = {
    token: "",
    user: "",
    id: "",
    image: ""
}

export type authStateType = {
    token?: string,
    user?: string,
    id?: string
    image?: string
}

const authReducer = (state: authStateType = initState, action: any) => {
    switch (action.type) {
        case 'SIGN_IN':
            return {
                ...state,
                token: action.token,
                user: action.user,
                id: action.id,
                image: action.image
            }
        case 'SIGN_OUT':
            return {
                ...state,
                ...initState,
            }
        default:
            return state;
    }
}

export default authReducer
