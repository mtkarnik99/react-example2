// src/components/Counter.jsx
import { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  // useEffect with a dependency array
  // this effect runs after the first render and every time count changes
  // open the console to see the log messages
  useEffect(() => {
    if (count === 0) {
      console.log('Counter mounted — count started at:', count);
    } else {
      console.log('Count changed to:', count);
    }

    // cleanup function — runs before the component unmounts
    // and before the effect re-runs on the next render
    // in this case we're just logging to show when cleanup happens
    return () => {
      console.log('Cleanup — count was:', count);
    };
  }, [count]); // <-- count is the dependency — effect re-runs when count changes

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

  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '24px',
    }}>
      <h2>Counter — useEffect & Stale State</h2>
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

      <p style={{ fontSize: '13px', color: '#888' }}>
        Try "Add 2 Broken" first — notice it only adds 1. Then try "Add 2 Fixed".
      </p>
    </div>
  );
}

export default Counter;