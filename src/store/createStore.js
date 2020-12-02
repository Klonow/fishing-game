export function createStore(rootReducer, initialState) {
  let state =
    initialState !== null && initialState !== undefined
      ? initialState
      : {}

  if (!initialState) {
    Object.keys(rootReducer).map(reducer => {
      state[reducer] = rootReducer[reducer](undefined, {type: '__INIT__'})
    })
  }
  return {
    dispatch(reducerName, action) {
      state[reducerName] = rootReducer[reducerName](state[reducerName], action)
      localStorage.setItem('state', JSON.stringify(state))
    },
    getState(reducerName) {
      return JSON.parse(JSON.stringify(state[reducerName]))
    }
  }
}
