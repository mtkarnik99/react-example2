// src/pages/PokemonPage.jsx
import PaginatedList from '../components/features/PaginatedList';
import { useTheme } from '../context/ThemeContext';

function PokemonPage() {
  const { theme } = useTheme();

  return (
    <div>
      <h2 style={{ color: theme === 'dark' ? '#fff' : '#2c3e50', marginBottom: '16px' }}>
        Pokémon
      </h2>
      <p style={{ fontSize: '13px', color: theme === 'dark' ? '#aaa' : '#888', marginBottom: '16px' }}>
        Demonstrates useCallback, useEffect, pagination, and real API fetching
        from PokeAPI.
      </p>

      <PaginatedList />
    </div>
  );
}

export default PokemonPage;