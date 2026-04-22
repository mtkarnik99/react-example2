// src/components/Counter.jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  // ❌ BROKEN — both calls read the same value of count
  // React batches them so only one update happens
  // Result: count only goes up by 1, not 2
  function addTwoBroken() {
    setCount(count + 1);
    setCount(count + 1);
  }

  // ✅ FIXED — each call receives the most current value
  // React processes them in order: previous → previous + 1
  // Result: count correctly goes up by 2
  function addTwoFixed() {
    setCount((previous) => previous + 1);
    setCount((previous) => previous + 1);
  }

  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '24px',
    }}>
      <h2>Counter — useState & Stale State</h2>

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

      <p style={{ fontSize: '13px', color: '#888' }}>
        Try "Add 2 Broken" first — notice it only adds 1. Then try "Add 2 Fixed".
      </p>
    </div>
  );
}

export default Counter;