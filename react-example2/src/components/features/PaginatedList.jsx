// src/components/features/PaginatedList.jsx
import { useState, useEffect, useCallback } from 'react';
import { useTheme } from '../../context/ThemeContext';

const LIMIT = 10;
const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

function PaginatedList() {
  const [pokemon, setPokemon] = useState([]);
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // consuming ThemeContext — no theme prop needed
  const { theme } = useTheme();

  const fetchPokemon = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${BASE_URL}?limit=${LIMIT}&offset=${offset}`
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      setPokemon(data.results);
      setTotalCount(data.count);
    } catch (err) {
      console.error('Failed to fetch pokemon:', err);
      setError('Failed to load pokemon. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [offset]);

  useEffect(() => {
    fetchPokemon();
  }, [fetchPokemon]);

  const totalPages = Math.ceil(totalCount / LIMIT);
  const currentPage = Math.floor(offset / LIMIT) + 1;

  function handleNext() {
    if (currentPage >= totalPages) return;
    setOffset((prev) => prev + LIMIT);
  }

  function handlePrevious() {
    if (offset <= 0) return;
    setOffset((prev) => prev - LIMIT);
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
      <h2>Pokémon — Pagination with PokeAPI</h2>
      <p style={{ fontSize: '13px', color: theme === 'dark' ? '#aaa' : '#888' }}>
        useCallback wraps the fetch function to prevent an infinite loop
        with useEffect. Each page change fetches a new set of Pokémon from
        the real PokeAPI.
      </p>

      <p style={{ fontSize: '13px', color: theme === 'dark' ? '#aaa' : '#555' }}>
        Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong> —
        showing {LIMIT} of {totalCount} Pokémon
      </p>

      {error && (
        <p style={{ color: '#e74c3c', fontSize: '13px' }}>{error}</p>
      )}

      {loading ? (
        <p style={{ color: theme === 'dark' ? '#aaa' : '#888', fontStyle: 'italic' }}>
          Loading Pokémon...
        </p>
      ) : (
        <ul style={{ paddingLeft: '20px' }}>
          {pokemon.map((p) => (
            <li
              key={p.name}
              style={{
                marginBottom: '4px',
                textTransform: 'capitalize',
                color: theme === 'dark' ? '#fff' : '#333',
              }}
            >
              {p.name}
            </li>
          ))}
        </ul>
      )}

      <div style={{ display: 'flex', gap: '8px', marginTop: '12px', alignItems: 'center' }}>
        <button
          onClick={handlePrevious}
          disabled={offset <= 0 || loading}
          style={{ padding: '6px 12px' }}
        >
          Previous
        </button>

        <span style={{ fontSize: '13px', color: theme === 'dark' ? '#aaa' : '#555' }}>
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={handleNext}
          disabled={currentPage >= totalPages || loading}
          style={{ padding: '6px 12px' }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default PaginatedList;