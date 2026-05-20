// src/components/features/ShoppingList.jsx
import { useState, useRef, useMemo } from 'react';
import { useFormDirty } from '../../hooks/useFormDirty';

function ShoppingList() {
  const [items, setItems] = useState(['Milk', 'Eggs', 'Bread', 'Butter', 'Apples']);
  const [workingItems, setWorkingItems] = useState(['Milk', 'Eggs', 'Bread', 'Butter', 'Apples']);
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef(null);
  const { isFormDirty, markDirty, markClean } = useFormDirty();

  // NEW this week — useMemo caches the filtered list
  // without useMemo, filtering runs on every render
  // with useMemo, it only re-runs when workingItems or searchQuery changes
  // try typing in the search box — watch "Filtering list..." in the console
  // then interact with something else — notice filtering does NOT re-run
  const filteredItems = useMemo(() => {
    console.log('Filtering list...');
    if (!searchQuery) return workingItems;
    return workingItems.filter((item) =>
      item.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [workingItems, searchQuery]);

  function addItemWrong() {
    items.push('Chocolate');
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
    setItems(['Milk', 'Eggs', 'Bread', 'Butter', 'Apples']);
    setWorkingItems(['Milk', 'Eggs', 'Bread', 'Butter', 'Apples']);
    setSearchQuery('');
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
      <h2>Shopping List — useMemo Filter</h2>
      <p style={{ fontSize: '13px', color: '#888' }}>
        The filter is wrapped in useMemo — it only re-runs when the list
        or search query changes. Open the console to see when it fires.
      </p>

      {/* search input — updates searchQuery which is a useMemo dependency */}
      <input
        type="text"
        placeholder="Search items..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: '12px', padding: '4px', width: '200px' }}
      />

      {/* filteredItems comes from useMemo — cached until dependencies change */}
      {filteredItems.length === 0 ? (
        <p style={{ color: '#888', fontStyle: 'italic' }}>
          No items match your search.
        </p>
      ) : (
        <ul>
          {filteredItems.map((item, index) => (
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

      <button onClick={addItemWrong}>Add Chocolate (Wrong)</button>
      <button onClick={resetList} style={{ marginLeft: '8px' }}>
        Reset
      </button>

      <p style={{ fontSize: '13px', color: '#888' }}>
        Confirmed list: {items.join(', ')}
      </p>
    </div>
  );
}

export default ShoppingList;