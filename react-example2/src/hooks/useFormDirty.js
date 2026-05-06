// src/hooks/useFormDirty.js
import { useState } from 'react';

// custom hook — encapsulates the isFormDirty pattern
// both Counter and ShoppingList use this exact same logic
// extracting it here means we write it once and share it everywhere
// must start with "use" — React enforces this naming convention
export function useFormDirty() {
  const [isFormDirty, setIsFormDirty] = useState(false);

  // marks the form as dirty — call this when the user makes a change
  function markDirty() {
    if (!isFormDirty) setIsFormDirty(true);
  }

  // resets the form to clean — call this on confirm or cancel
  function markClean() {
    setIsFormDirty(false);
  }

  // return an object — more readable than an array for multiple values
  return { isFormDirty, markDirty, markClean };
}