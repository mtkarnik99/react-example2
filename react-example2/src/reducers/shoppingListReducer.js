// src/reducers/shoppingListReducer.js
// all shopping list state logic centralized here
// previously scattered across ShoppingList.jsx in multiple handlers

export const initialState = {
  // confirmed list — the application state
  items: ['Milk', 'Eggs', 'Bread', 'Butter', 'Apples'],
  // working copy — local state while the user is editing
  workingItems: ['Milk', 'Eggs', 'Bread', 'Butter', 'Apples'],
  isFormDirty: false,
};

export const listActions = {
  ADD_ITEM: 'add_item',
  CONFIRM: 'confirm',
  CANCEL: 'cancel',
  RESET: 'reset',
  WRONG_ADD: 'wrong_add',
};

export function shoppingListReducer(state, action) {
  switch (action.type) {

    case listActions.ADD_ITEM:
      // adds item to working copy only — not application state
      // isFormDirty set to true to show confirm/cancel buttons
      return {
        ...state,
        workingItems: [...state.workingItems, action.item],
        isFormDirty: true,
      };

    case listActions.CONFIRM:
      // pushes working copy to application state
      // isFormDirty reset to false — hides confirm/cancel buttons
      return {
        ...state,
        items: [...state.workingItems],
        isFormDirty: false,
      };

    case listActions.CANCEL:
      // resets working copy back to application state
      // discards any uncommitted changes
      return {
        ...state,
        workingItems: [...state.items],
        isFormDirty: false,
      };

    case listActions.RESET:
      // resets everything back to the initial state
      return { ...initialState };

    case listActions.WRONG_ADD:
      // ❌ WRONG — mutates state directly to demonstrate why immutability matters
      // the reducer receives the mutated array but React sees the same reference
      // page never updates even though the array changed
      state.items.push('Chocolate');
      return { ...state, items: state.items };

    default:
      return state;
  }
}