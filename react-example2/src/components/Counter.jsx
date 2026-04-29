// src/components/Counter.jsx
import { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  // controlled input — local state for the input field
  // this is separate from count so we can validate before updating
  const [inputValue, setInputValue] = useState('');

  // isFormDirty tracks whether the user has typed in the input
  // used to show/hide the confirm/cancel buttons
  const [isFormDirty, setIsFormDirty] = useState(false);

  // useEffect from last week — logs count changes to the console
  useEffect(() => {
    if (count === 0) {
      console.log('Counter mounted — count started at:', count);
    } else {
      console.log('Count changed to:', count);
    }
    return () => {
      console.log('Cleanup — count was:', count);
    };
  }, [count]);

  function addTwoBroken() {
    // ❌ BROKEN — both calls read the same value of count
    // React batches them so only one update happens
    // Result: count only goes up by 1, not 2
    setCount(count + 1);
    setCount(count + 1);
  }

  function addTwoFixed() {
    // ✅ FIXED — each call receives the most current value
    // React processes them in order: previous → previous + 1
    // Result: count correctly goes up by 2
    setCount((previous) => previous + 1);
    setCount((previous) => previous + 1);
  }

  // controlled input handler
  // fires on every keystroke — updates inputValue local state
  // validates the value before marking the form as dirty
  function handleInputChange(e) {
    const value = e.target.value;

    // reject negative values and non-numeric input
    if (value < 0 || isNaN(value)) return;

    setInputValue(value);

    // only mark dirty if the value actually changed
    if (!isFormDirty) setIsFormDirty(true);
  }

  // confirm — pushes local input value to count (application state)
  function handleConfirm(e) {
    e.preventDefault();
    if (inputValue === '') return;
    setCount(parseInt(inputValue, 10));
    setInputValue('');
    setIsFormDirty(false);
  }

  // cancel — discards local input value, resets form
  function handleCancel(e) {
    e.preventDefault();
    setInputValue('');
    setIsFormDirty(false);
  }

  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '24px',
    }}>
      <h2>Counter — Controlled Input & Confirm/Cancel</h2>
      <p style={{ fontSize: '13px', color: '#888' }}>
        Open the console to see useEffect firing on every count change.
      </p>

      <p>Count: <strong>{count}</strong></p>

      {/* basic useState — adds 1 and triggers useEffect */}
      <button onClick={() => setCount(count + 1)}>Add 1</button>
      <button onClick={() => setCount(0)} style={{ marginLeft: '8px' }}>
        Reset
      </button>

      <br /><br />

      {/* stale state demo */}
      <button onClick={addTwoBroken}>Add 2 (Broken)</button>
      <button onClick={addTwoFixed} style={{ marginLeft: '8px' }}>
        Add 2 (Fixed)
      </button>

      <br /><br />

      {/* controlled input — value is tied to inputValue state */}
      {/* onChange fires on every keystroke and updates local state */}
      {/* count (application state) is only updated on confirm */}
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

        {/* confirm/cancel only appear when the user has typed something */}
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