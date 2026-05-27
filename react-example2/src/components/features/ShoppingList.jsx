// src/components/features/ShoppingList.jsx
import { useRef } from 'react';
import { useReducer } from 'react';
import {
  shoppingListReducer,
  initialState,
  listActions,
} from '../../reducers/shoppingListReducer';
import { useTheme } from '../../context/ThemeContext';

function ShoppingList() {
  // useReducer replaces all the individual useStates from last week
  // isFormDirty, items, and workingItems are now managed in one place
  const [state, dispatch] = useReducer(shoppingListReducer, initialState);
  const { items, workingItems, isFormDirty } = state;

  // useTheme — consuming ThemeContext directly
  // no theme prop needed — context eliminates the prop drilling
  const { theme } = useTheme();

  const inputRef = useRef(null);

  function handleAddItem() {
    const value = inputRef.current.value.trim();
    if (!value) return;
    // dispatch an action instead of calling multiple setters
    dispatch({ type: listActions.ADD_ITEM, item: value });
    inputRef.current.value = '';
    inputRef.current.focus();
  }

  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '24px',
      // theme applied via context — no prop needed
      backgroundColor: theme === 'dark' ? '#2c3e50' : '#fff',
      color: theme === 'dark' ? '#fff' : '#333',
    }}>
      <h2>Shopping List — useReducer</h2>
      <p style={{ fontSize: '13px', color: theme === 'dark' ? '#aaa' : '#888' }}>
        All state is now managed by shoppingListReducer.
        Each button dispatches an action instead of calling multiple setters.
      </p>

      {workingItems.length === 0 ? (
        <p style={{ fontStyle: 'italic', color: '#888' }}>
          Your list is empty — add something!
        </p>
      ) : (
        <ul>
          {workingItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}

      <input
        ref={inputRef}
        type="text"
        placeholder="Add an item..."
        style={{ marginRight: '8px', padding: '4px' }}
      />
      <button onClick={handleAddItem}>Add Item</button>

      <br /><br />

      {/* confirm/cancel only appear when isFormDirty is true */}
      {isFormDirty && (
        <div style={{ marginBottom: '8px' }}>
          {/* dispatch confirm — pushes workingItems to items */}
          <button onClick={() => dispatch({ type: listActions.CONFIRM })}>
            Confirm
          </button>
          {/* dispatch cancel — resets workingItems back to items */}
          <button
            onClick={() => dispatch({ type: listActions.CANCEL })}
            style={{ marginLeft: '8px' }}
          >
            Cancel
          </button>
        </div>
      )}

      {/* wrong add — demonstrates mutation still doesn't trigger re-render */}
      <button onClick={() => dispatch({ type: listActions.WRONG_ADD })}>
        Add Chocolate (Wrong)
      </button>
      <button
        onClick={() => dispatch({ type: listActions.RESET })}
        style={{ marginLeft: '8px' }}
      >
        Reset
      </button>

      <p style={{ fontSize: '13px', color: theme === 'dark' ? '#aaa' : '#888' }}>
        Confirmed list (application state): {items.join(', ')}
      </p>
    </div>
  );
}

export default ShoppingList;