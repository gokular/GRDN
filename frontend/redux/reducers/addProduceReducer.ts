const initState = {
    newProduces: [],
}

export type addProduceStateType = {
    newProduces: any[],
}

const addProduceReducer = (state: addProduceStateType = initState, action: any) => {
    switch (action.type) {
        case 'ADD_PRODUCE':
            const newNewProduces: any[] = [...(state.newProduces || []), action.newProduce]
console.log("newProduces",newNewProduces)
            return {
                ...state,
                newProduces: newNewProduces,
            };
        case 'CLEAR_ADD_PRODUCE':
            return {...state, ...initState};
        default:
            return state;
    }
}

export default addProduceReducer