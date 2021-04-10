import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import rootReducer from './reducers/rootReducer'
import thunk from 'redux-thunk'
import logger from './middleware/logger'
import AsyncStorage from '@react-native-async-storage/async-storage';

/*
Telling redux-persist to use async storage with 'root' as a key to store
states
*/
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

/*
When we launch app, persistReducer uses 'root' as a key to retrieve
stored states from the phone's local storage. Then it sets that 
state to be current state. 

This is how we will keep tokens for authentication through 
multiple uses
*/
const persistedReducer = persistReducer(persistConfig, rootReducer)

const middlewares = [
    thunk, // to allow for async actions
    logger // custom logging code
]

export default () => {
    let store = createStore(persistedReducer, applyMiddleware(...middlewares))
    let persistor = persistStore(store)
    return { store, persistor }
}