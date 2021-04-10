const logger = (store: any) => (next: any) => (action: any) => {
    /* To not lok PERSIST, REHYDRATE, or HYDRATE, 
    actions by redux-persist to store states
    */
    const skippableActionTypes = [
        "persist/PERSIST", "persist/REHYDRATE", "persist/HYDRATE"
    ]
    if (skippableActionTypes.includes(action.type)) return next(action)

    // RX for redux
    console.group("RX:" + action.type)
    console.info('START')
    next(action)
    console.info('END, next state: ', store.getState())
    console.groupEnd()
    return
}

export default logger