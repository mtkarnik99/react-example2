// src/pages/ShoppingListPage.jsx
import ShoppingList from '../components/features/ShoppingList';
import { useTheme } from '../context/ThemeContext';

function ShoppingListPage() {
  const { theme } = useTheme();

  return (
    <div>
      <h2 style={{ color: theme === 'dark' ? '#fff' : '#2c3e50', marginBottom: '16px' }}>
        Shopping List
      </h2>
      <p style={{ fontSize: '13px', color: theme === 'dark' ? '#aaa' : '#888', marginBottom: '16px' }}>
        Demonstrates useReducer, immutability, and the confirm/cancel pattern.
      </p>

      <ShoppingList />
    </div>
  );
}

export default ShoppingListPage;