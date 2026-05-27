// src/components/features/Counter.jsx
import { useState, useEffect, useMemo, useCallback } from 'react';
import { useFormDirty } from '../../hooks/useFormDirty';
import { getCounterMessage, getCounterStats } from '../../utils/counterUtils';
import { useTheme } from '../../context/ThemeContext';

function Counter() {
  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const { isFormDirty, markDirty, markClean } = useFormDirty();

  // consuming ThemeContext — no theme prop needed
  const { theme } = useTheme();

  useEffect(() => {
    console.log(getCounterMessage(count));
    return () => {
      console.log('Cleanup — count was:', count);
    };
  }, [count]);

  const stats = useMemo(() => {
    return getCounterStats(count);
  }, [count]);

  const addTwoFixed = useCallback(() => {
    setCount((previous) => previous + 1);
    setCount((previous) => previous + 1);
  }, []);

  function addTwoBroken() {
    setCount(count + 1);
    setCount(count + 1);
  }

  function handleInputChange(e) {
    const value = e.target.value;
    if (value < 0 || isNaN(value)) return;
    setInputValue(value);
    markDirty();
  }

  function handleConfirm(e) {
    e.preventDefault();
    if (inputValue === '') return;
    setCount(parseInt(inputValue, 10));
    setInputValue('');
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
      backgroundColor: theme === 'dark' ? '#2c3e50' : '#fff',
      color: theme === 'dark' ? '#fff' : '#333',
    }}>
      <h2>Counter — useMemo & useCallback</h2>
      <p style={{ fontSize: '13px', color: theme === 'dark' ? '#aaa' : '#888' }}>
        useMemo caches the expensive stats calculation.
        useCallback caches the addTwoFixed function reference.
        Open the console to see when each runs.
      </p>

      <p>Count: <strong>{count}</strong></p>

      <p style={{ fontSize: '13px', color: theme === 'dark' ? '#aaa' : '#555' }}>
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
            style={{
              marginLeft: '8px',
              padding: '4px',
              width: '100px',
              backgroundColor: theme === 'dark' ? '#34495e' : '#fff',
              color: theme === 'dark' ? '#fff' : '#333',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
        </label>

        {isFormDirty && (
          <div style={{ marginTop: '8px' }}>
            <button onClick={handleConfirm}>Confirm</button>
            <button onClick={handleCancel} style={{ marginLeft: '8px' }}>
              Cancel
            </button>
          </div>
        )}
      </form>

      <p style={{ fontSize: '13px', color: theme === 'dark' ? '#aaa' : '#888' }}>
        Type a number in the input — confirm to update the count, cancel to discard.
      </p>
    </div>
  );
}

export default Counter;