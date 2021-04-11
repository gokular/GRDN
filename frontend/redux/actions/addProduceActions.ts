export const addProduce = (newProduce: any) => {
    return async (dispatch: any, getState: any) => {
        dispatch({
            type: 'ADD_PRODUCE',
            newProduce
        })
        return
    }
}
export const clearProduce = () => {
    return async (dispatch: any, getState: any) => {
      try{
        dispatch({
            type: 'CLEAR_ADD_PRODUCE',
        });
return
    } catch (error) {
      return {error}
    }
    }
}