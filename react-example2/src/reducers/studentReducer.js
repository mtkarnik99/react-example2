// src/reducers/studentReducer.js
// pure JavaScript — no React imports needed
// this file can be tested independently of any component

export const initialState = {
  selectedStudent: null,
};

// action types as constants — prevents typos and makes refactoring easier
// instead of dispatching { type: 'select_student' } as a raw string everywhere
// we import and use these constants so a typo is caught immediately
export const studentActions = {
  SELECT: 'select_student',
  DESELECT: 'deselect_student',
  CLEAR: 'clear_selection',
};

export function studentReducer(state, action) {
  switch (action.type) {

    case studentActions.SELECT:
      // action.name contains the student name passed from the component
      // toggle behavior — if the same student is clicked, deselect them
      if (state.selectedStudent === action.name) {
        return { ...state, selectedStudent: null };
      }
      return { ...state, selectedStudent: action.name };

    case studentActions.DESELECT:
      return { ...state, selectedStudent: null };

    case studentActions.CLEAR:
      // resets entire state back to initial — useful for cleanup
      return { ...initialState };

    default:
      // always return current state for unrecognized actions
      // prevents the reducer from returning undefined
      return state;
  }
}