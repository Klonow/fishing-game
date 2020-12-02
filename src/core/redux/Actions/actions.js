import {
  ADD_FISH,
  ADD_ITEM_FROM_SHOP,
  ADD_TACKLE, CHANGE_INVENTORY, DELETE_ALL_FISH, DELETE_FISH,
  DELETE_ITEM,
  DELETE_ITEM_IN_INVENTORY,
  RESET_INVENTORY,
  UPDATE_BUY_ITEM,
  UPDATE_INVENTORY,
  STARTED_VALUE_STATE
} from "../../redux/Actions/types";

export function addFish(fish, weight) {
  return {
    type: ADD_FISH, fish, weight
  }
}

export function addTackle(key, item) {
  return {
    type: ADD_TACKLE,
    act: {
      [key || STARTED_VALUE_STATE]: item
    }
  }
}

export function resetInventory() {
  return {
    type: RESET_INVENTORY
  }
}

export function deleteItem(id, key = 'fishingrod') {
  return {
    type: DELETE_ITEM,
    key, id
  }
}

export function deleteItemInInventory(key = 'fishingrod') {
  return {
    type: DELETE_ITEM_IN_INVENTORY,
    key
  }
}

export function updateInventory() {
  return {
    type: UPDATE_INVENTORY
  }
}

export function updateTackle(item, key) {
  return {
    type: UPDATE_INVENTORY,
    item,
    key
  }
}

export function updateBuyItem(item, key) {
  return {
    type: UPDATE_BUY_ITEM,
    item, key
  }
}

export function addItemFromShop(state) {
  return {
    type: ADD_ITEM_FROM_SHOP,
    state
  }
}

export function changeInventory(state, splittingAttrForStore) {
  return {
    type: CHANGE_INVENTORY,
    buyItem: {
      [splittingAttrForStore[0]]: state[splittingAttrForStore[0]]
    }
  }
}

export function deleteFish(fish) {
  return  {
    type: DELETE_FISH,
    fish
  }
}

export function deleteAllFish() {
  return {
    type: DELETE_ALL_FISH
  }
}

export function   removeTackle(item, key = 'fishingrod') {
  return {
    type: DELETE_ITEM,
    item, key
  }
}
