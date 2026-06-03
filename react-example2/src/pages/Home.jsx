// src/pages/Home.jsx
import Counter from '../components/features/Counter';
import { useTheme } from '../context/ThemeContext';

function Home() {
  const { theme } = useTheme();

  return (
    <div>
      <h2 style={{ color: theme === 'dark' ? '#fff' : '#2c3e50', marginBottom: '16px' }}>
        Counter
      </h2>
      <p style={{ fontSize: '13px', color: theme === 'dark' ? '#aaa' : '#888', marginBottom: '16px' }}>
        Demonstrates useMemo, useCallback, useEffect, and controlled inputs.
      </p>

      {/* Counter is the only component on the Home page */}
      <Counter />
    </div>
  );
}

export default Home;