// src/utils/counterUtils.js

// helper function — pure JavaScript, no React hooks
// extracted from Counter's useEffect so the component stays focused on UI
export function getCounterMessage(count) {
  if (count === 0) {
    return 'Counter mounted — count started at: 0';
  }
  return `Count changed to: ${count}`;
}

// NEW this week — a deliberately slow function to demonstrate useMemo
// simulates an expensive calculation by looping many times
// in a real app this could be a complex data transformation
export function getCounterStats(count) {
  console.log('Computing stats... (expensive calculation)');
  let result = 0;
  for (let i = 0; i < 1000000; i++) {
    result += i;
  }
  return {
    isEven: count % 2 === 0,
    squared: count * count,
    doubled: count * 2,
  };
}