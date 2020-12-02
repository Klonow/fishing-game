import {createStore} from "./createStore";

describe('createStore', () => {
  const initialState = {
    count: 0
  }

  function counterReducer(state = initialState, action) {
    switch (action.type) {
      case 'ADD':
        return {
          count: state.count + 1
        }
      default:
        return state
    }
  }

  const store = createStore({counter: counterReducer})

  test('store and methods dispatch, getState: should defined', () => {
    expect(store).toBeDefined()
    expect(store.dispatch).toBeDefined()
    expect(store.getState).toBeDefined()
    expect(store.getState('counter')).toBeDefined()
  })

  store.dispatch('counter', {type: 'ADD'})

  test('check the store state change', () => {
    expect(store.getState('counter').count).toBe(1)
  })
})
