// src/components/features/Counter.jsx
import { useState, useEffect, useMemo, useCallback } from 'react';
import { useFormDirty } from '../../hooks/useFormDirty';
import { getCounterMessage, getCounterStats } from '../../utils/counterUtils';

function Counter() {
  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const { isFormDirty, markDirty, markClean } = useFormDirty();

  useEffect(() => {
    console.log(getCounterMessage(count));
    return () => {
      console.log('Cleanup — count was:', count);
    };
  }, [count]);

  // NEW this week — useMemo caches the result of getCounterStats
  // getCounterStats is deliberately slow — it loops 1 million times
  // without useMemo, it runs on EVERY render including unrelated ones
  // with useMemo, it only re-runs when count changes
  // open the console — watch when "Computing stats..." appears
  const stats = useMemo(() => {
    return getCounterStats(count);
  }, [count]);

  // NEW this week — useCallback caches the addTwoFixed function
  // without useCallback, this function gets a new reference every render
  // with useCallback, the reference stays stable between renders
  // this matters when the function is passed as a prop to a child component
  const addTwoFixed = useCallback(() => {
    setCount((previous) => previous + 1);
    setCount((previous) => previous + 1);
  }, []); // no dependencies — setCount is stable by default

  function addTwoBroken() {
    // ❌ BROKEN — both calls read the same value of count
    setCount(count + 1);
    setCount(count + 1);
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
      <h2>Counter — useMemo & useCallback</h2>
      <p style={{ fontSize: '13px', color: '#888' }}>
        useMemo caches the expensive stats calculation.
        useCallback caches the addTwoFixed function reference.
        Open the console to see when each runs.
      </p>

      <p>Count: <strong>{count}</strong></p>

      {/* stats come from useMemo — only recomputed when count changes */}
      <p style={{ fontSize: '13px', color: '#555' }}>
        Even: {stats.isEven ? 'Yes' : 'No'} |
        Squared: {stats.squared} |
        Doubled: {stats.doubled}
      </p>

      <button onClick={() => setCount(count + 1)}>Add 1</button>
      <button onClick={() => setCount(0)} style={{ marginLeft: '8px' }}>
        Reset
      </button>

      <br /><br />

      <button onClick={addTwoBroken}>Add 2 (Broken)</button>
      {/* addTwoFixed is now wrapped in useCallback — stable reference */}
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
    </div>
  );
}

export default Counter;