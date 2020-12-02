import buyItemReducer from "../../redux/Reducers/buyItemReducer"
import {deleteItem, changeInventory, updateBuyItem} from "../../redux/Actions/actions"

describe('buyItemReducer', () => {
  let state

  beforeEach(() => {
    state = {
      fishingrod: [
        {
          id: 0,
          name: "Fishingrod1",
        },
        {
          id: 1,
          name: "Fishingrod2",
        }
      ]
    }
  })

  test('in state should appear new property and new element', () => {
    const updatedState = {...state, bait: [{name: 'Опарышь'}]}
    const newState = buyItemReducer(
      state,
      changeInventory(updatedState, ['bait', 0])
    )

    expect(newState['bait']).toBeDefined()
    expect(newState['bait'].length).toBe(1)
  })


  test('after removing items, the state should be 1', () => {
    const newState = buyItemReducer(state, deleteItem(0))
    expect(newState['fishingrod'].length).toBe(1)
  })

  test('length of the state according to the fishing rod key should be 3', () => {
    const newItem = [{id: 3, name: 'Fishingrod3'}]
    const newState = buyItemReducer(state, updateBuyItem(newItem, 'fishingrod'))

    expect(newState['fishingrod'].length).toBe(3)
  })
})
