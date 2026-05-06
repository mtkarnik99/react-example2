// src/components/features/Counter.jsx
import { useState, useEffect } from 'react';
import { useFormDirty } from '../../hooks/useFormDirty';
import { getCounterMessage } from '../../utils/counterUtils';

function Counter() {
  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState('');

  // useFormDirty replaces the isFormDirty state and its handlers
  // same behavior as before — now extracted into a reusable custom hook
  const { isFormDirty, markDirty, markClean } = useFormDirty();

  // getCounterMessage is now a helper function in utils/counterUtils.js
  // useEffect stays focused on the side effect — not the message logic
  useEffect(() => {
    console.log(getCounterMessage(count));
    return () => {
      console.log('Cleanup — count was:', count);
    };
  }, [count]);

  function addTwoBroken() {
    // ❌ BROKEN — both calls read the same value of count
    setCount(count + 1);
    setCount(count + 1);
  }

  function addTwoFixed() {
    // ✅ FIXED — each call receives the most current value
    setCount((previous) => previous + 1);
    setCount((previous) => previous + 1);
  }

  function handleInputChange(e) {
    const value = e.target.value;
    if (value < 0 || isNaN(value)) return;
    setInputValue(value);
    // markDirty replaces the inline isFormDirty check
    markDirty();
  }

  function handleConfirm(e) {
    e.preventDefault();
    if (inputValue === '') return;
    setCount(parseInt(inputValue, 10));
    setInputValue('');
    // markClean replaces setIsFormDirty(false)
    markClean();
  }

  function handleCancel(e) {
    e.preventDefault();
    setInputValue('');
    markClean();
  }

  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '24px',
    }}>
      <h2>Counter — Custom Hook & Helper Function</h2>
      <p style={{ fontSize: '13px', color: '#888' }}>
        useFormDirty is now a custom hook shared with ShoppingList.
        getCounterMessage is a helper function in utils/.
      </p>

      <p>Count: <strong>{count}</strong></p>

      <button onClick={() => setCount(count + 1)}>Add 1</button>
      <button onClick={() => setCount(0)} style={{ marginLeft: '8px' }}>
        Reset
      </button>

      <br /><br />

      <button onClick={addTwoBroken}>Add 2 (Broken)</button>
      <button onClick={addTwoFixed} style={{ marginLeft: '8px' }}>
        Add 2 (Fixed)
      </button>

      <br /><br />

      <form>
        <label>
          Set count directly:
          <input
            type="number"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter a number"
            style={{ marginLeft: '8px', padding: '4px', width: '100px' }}
          />
        </label>

        {/* isFormDirty still works the same — now comes from the custom hook */}
        {isFormDirty && (
          <div style={{ marginTop: '8px' }}>
            <button onClick={handleConfirm}>Confirm</button>
            <button onClick={handleCancel} style={{ marginLeft: '8px' }}>
              Cancel
            </button>
          </div>
        )}
      </form>

      <p style={{ fontSize: '13px', color: '#888' }}>
        Type a number in the input — confirm to update the count, cancel to discard.
      </p>
    </div>
  );
}

export default Counter;