import inventoryReducer from "../../redux/Reducers/inventoryReducer";
import {addTackle, deleteItemInInventory, updateTackle} from "../../redux/Actions/actions";

describe('inventoryReducer', () => {
  let state = {
    fishingrod: null,
    fishingline: null,
    coil: null,
    hook: null,
    bait: null
  }

  const item = {name: 'fishingrod', id: 0, quantity: 1}

  test('after adding an item to the state, the fishingrod property should not be null', () => {
    const newState = inventoryReducer(state, addTackle('fishingrod', item))

    expect(newState['fishingrod']).not.toBeNull()
  })

  test('after removing the tackle, store should be null', () => {
    state = {
      ...state,
      fishingrod: [item]
    }

    const newState = inventoryReducer(state, deleteItemInInventory('fishingrod'))
    expect(newState['fishingrod']).toBeNull()
  })

  test('the quantity property should decrease by 1 and become 0', () => {
    const newState = inventoryReducer(state, updateTackle(item, 'fishingrod'))
    const quantity = newState['fishingrod'][0].quantity
    expect(quantity).toBe(0)
  })
})
