import { combineReducers } from 'redux'
import authReducer from './authReducer'

const appReducer = combineReducers({
    auth: authReducer, // updates auth property in state
})

const rootReducer = (state: any, action: any) => {
    // Clear all data in redux store to initial.
    if (action.type === 'CLEAR_ABSOLUTE_STATE')
        state = undefined;

    return appReducer(state, action);
};


export default rootReducer