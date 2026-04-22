// src/components/ShoppingList.jsx
import { useState, useRef } from 'react';

function ShoppingList() {
  const [items, setItems] = useState(['Milk', 'Eggs', 'Bread']);

  // useRef — stores a reference to the input DOM node
  // lets us read the input's value directly without onChange updating state
  // changing inputRef.current does NOT trigger a re-render
  const inputRef = useRef(null);

  // ❌ WRONG — mutating state directly
  // React sees the same array reference and skips the re-render
  // the page never updates even though the array changed
  function addItemWrong() {
    items.push('Butter');
    setItems(items);
  }

  function handleAddItem() {
    // read the input value directly from the DOM node via ref
    const value = inputRef.current.value.trim();

    // guard against empty input
    if (!value) return;

    // ✅ CORRECT — spread creates a brand new array
    // React sees a new reference and triggers a re-render
    setItems([...items, value]);

    // clear the input field and return focus to it after adding
    inputRef.current.value = '';
    inputRef.current.focus();
  }

  function resetList() {
    // resets back to the starting list
    setItems(['Milk', 'Eggs', 'Bread']);

    // return focus to the input after reset
    inputRef.current.focus();
  }

  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '24px',
    }}>
      <h2>Shopping List — useRef & Immutability</h2>
      <p style={{ fontSize: '13px', color: '#888' }}>
        useRef reads the input value directly without re-rendering on every keystroke.
        Notice focus returns to the input after adding or resetting.
      </p>

      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      {/* ref is attached to the input — we can now access it via inputRef.current */}
      <input
        ref={inputRef}
        type="text"
        placeholder="Add an item..."
        style={{ marginRight: '8px', padding: '4px' }}
      />

      {/* handleAddItem reads from the ref and updates state the correct way */}
      <button onClick={handleAddItem}>Add Item</button>

      <br /><br />

      {/* wrong way demo — still here to show why mutation is dangerous */}
      <button onClick={addItemWrong}>Add Butter (Wrong)</button>
      <button onClick={resetList} style={{ marginLeft: '8px' }}>
        Reset
      </button>

      <p style={{ fontSize: '13px', color: '#888' }}>
        Try "Add Butter Wrong" first — notice nothing changes. Then type an item and click "Add Item".
        Always reset between demos.
      </p>
    </div>
  );
}

export default ShoppingList;