// src/components/features/ShoppingList.jsx
import { useState, useRef } from 'react';
import { useFormDirty } from '../../hooks/useFormDirty';

function ShoppingList() {
  const [items, setItems] = useState(['Milk', 'Eggs', 'Bread']);
  const [workingItems, setWorkingItems] = useState(['Milk', 'Eggs', 'Bread']);
  const inputRef = useRef(null);

  // useFormDirty — same custom hook used in Counter
  // this is the whole point of the custom hook — write once, use everywhere
  const { isFormDirty, markDirty, markClean } = useFormDirty();

  function addItemWrong() {
    items.push('Butter');
    setItems(items);
  }

  function handleAddItem() {
    const value = inputRef.current.value.trim();
    if (!value) return;
    setWorkingItems([...workingItems, value]);
    markDirty();
    inputRef.current.value = '';
    inputRef.current.focus();
  }

  function handleConfirm() {
    setItems([...workingItems]);
    markClean();
  }

  function handleCancel() {
    setWorkingItems([...items]);
    markClean();
    inputRef.current.value = '';
  }

  function resetList() {
    setItems(['Milk', 'Eggs', 'Bread']);
    setWorkingItems(['Milk', 'Eggs', 'Bread']);
    markClean();
    inputRef.current.focus();
  }

  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '24px',
    }}>
      <h2>Shopping List — Shared Custom Hook</h2>
      <p style={{ fontSize: '13px', color: '#888' }}>
        useFormDirty is the same custom hook used in Counter —
        same behavior, zero duplicated code.
      </p>

      {workingItems.length === 0 ? (
        <p style={{ color: '#888', fontStyle: 'italic' }}>
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

      {isFormDirty && (
        <div style={{ marginBottom: '8px' }}>
          <button onClick={handleConfirm}>Confirm</button>
          <button onClick={handleCancel} style={{ marginLeft: '8px' }}>
            Cancel
          </button>
        </div>
      )}

      <button onClick={addItemWrong}>Add Butter (Wrong)</button>
      <button onClick={resetList} style={{ marginLeft: '8px' }}>
        Reset
      </button>

      <p style={{ fontSize: '13px', color: '#888' }}>
        Confirmed list (application state): {items.join(', ')}
      </p>
    </div>
  );
}

export default ShoppingList;