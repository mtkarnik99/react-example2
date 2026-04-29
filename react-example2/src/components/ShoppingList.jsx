// src/components/ShoppingList.jsx
import { useState, useRef } from 'react';

function ShoppingList() {
  // application state — the confirmed list
  const [items, setItems] = useState(['Milk', 'Eggs', 'Bread']);

  // local state — working copy while the user is editing
  // only pushed to application state on confirm
  const [workingItems, setWorkingItems] = useState(['Milk', 'Eggs', 'Bread']);

  // isFormDirty tracks whether the user has made any changes
  const [isFormDirty, setIsFormDirty] = useState(false);

  const inputRef = useRef(null);

  function addItemWrong() {
    items.push('Butter');
    setItems(items);
  }

  function handleAddItem() {
    const value = inputRef.current.value.trim();
    if (!value) return;

    // adds to working copy only — not application state
    setWorkingItems([...workingItems, value]);

    if (!isFormDirty) setIsFormDirty(true);

    inputRef.current.value = '';
    inputRef.current.focus();
  }

  // confirm — pushes working copy to application state
  function handleConfirm() {
    setItems([...workingItems]);
    setIsFormDirty(false);
  }

  // cancel — resets working copy back to application state
  function handleCancel() {
    setWorkingItems([...items]);
    setIsFormDirty(false);
    inputRef.current.value = '';
  }

  function resetList() {
    // resets back to the starting list
    setItems(['Milk', 'Eggs', 'Bread']);
    setWorkingItems(['Milk', 'Eggs', 'Bread']);
    setIsFormDirty(false);
    inputRef.current.focus();
  }

  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '24px',
    }}>
      <h2>Shopping List — Local State & Confirm/Cancel</h2>
      <p style={{ fontSize: '13px', color: '#888' }}>
        Items added go into a working copy first. Confirm to save,
        cancel to discard. The confirmed list is the application state.
      </p>

      {/* ternary — show empty message or the list */}
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

      {/* confirm/cancel only appear when the user has made changes */}
      {isFormDirty && (
        <div style={{ marginBottom: '8px' }}>
          <button onClick={handleConfirm}>Confirm</button>
          <button onClick={handleCancel} style={{ marginLeft: '8px' }}>
            Cancel
          </button>
        </div>
      )}

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
        Confirmed list (application state): {items.join(', ')}
      </p>
    </div>
  );
}

export default ShoppingList;