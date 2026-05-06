// src/utils/counterUtils.js

// helper function — pure JavaScript, no React hooks
// extracted from Counter's useEffect so the component stays focused on UI
// can be tested independently without rendering any components
export function getCounterMessage(count) {
  if (count === 0) {
    return 'Counter mounted — count started at: 0';
  }
  return `Count changed to: ${count}`;
}