// src/components/ShoppingList.jsx
import { useState } from 'react';

function ShoppingList() {
  const [items, setItems] = useState(['Milk', 'Eggs', 'Bread']);

  // ❌ WRONG — mutating state directly
  // React sees the same array reference and skips the re-render
  // The page never updates even though the array changed
  function addItemWrong() {
    items.push('Butter');
    setItems(items);
  }

  // ✅ CORRECT — spread creates a brand new array
  // React sees a new reference and triggers a re-render
  function addItemCorrect() {
    setItems([...items, 'Butter']);
  }

  // resets back to the starting list
  function resetList() {
    setItems(['Milk', 'Eggs', 'Bread']);
  }

  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '24px',
    }}>
      <h2>Shopping List — Immutability</h2>

      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <button onClick={addItemWrong}>Add Butter (Wrong)</button>
      <button onClick={addItemCorrect} style={{ marginLeft: '8px' }}>
        Add Butter (Correct)
      </button>
      <button onClick={resetList} style={{ marginLeft: '8px' }}>
        Reset
      </button>

      <p style={{ fontSize: '13px', color: '#888' }}>
        Try "Add Butter Wrong" first — notice nothing changes. Then try "Add Butter Correct".
      </p>
    </div>
  );
}

export default ShoppingList;