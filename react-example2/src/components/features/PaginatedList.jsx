// src/components/features/PaginatedList.jsx
import { useState, useEffect,useRef, useCallback } from 'react';

// PokeAPI returns 20 pokemon per page by default
// we use limit and offset to control which page we're on
// offset=0 is page 1, offset=20 is page 2, offset=40 is page 3, etc.
const LIMIT = 10;
const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

function PaginatedList() {
  const [pokemon, setPokemon] = useState([]);
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

    // temporarily add this ref to PaginatedList to count renders
    const renderCount = useRef(0);
    renderCount.current += 1;

    // and add this log just before the return statement
    console.log(`PaginatedList rendered ${renderCount.current} times`);

  // NEW this week — useCallback wraps the fetch function
  // without useCallback, fetchPokemon gets a new reference every render
  // useEffect depends on fetchPokemon — a new reference triggers another fetch
  // that fetch causes a re-render — which creates a new fetchPokemon — infinite loop
  // useCallback breaks the cycle by keeping the reference stable
  const fetchPokemon = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${BASE_URL}?limit=${LIMIT}&offset=${offset}`
      );

      // always check if the response was successful before reading it
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      // PokeAPI returns results (current page) and count (total available)
      setPokemon(data.results);
      setTotalCount(data.count);
    } catch (err) {
      // catch network errors or the error we threw above
      console.error('Failed to fetch pokemon:', err);
      setError('Failed to load pokemon. Please try again.');
    } finally {
      // finally always runs — ensures loading is cleared even if fetch fails
      setLoading(false);
    }
  }, [offset]); // re-create fetchPokemon only when offset changes

  // useEffect depends on fetchPokemon
  // when offset changes, fetchPokemon gets a new reference
  // useEffect sees the dependency changed and fires the fetch
  useEffect(() => {
    fetchPokemon();
  }, [fetchPokemon]);

  // calculate total pages for boundary conditions and display
  const totalPages = Math.ceil(totalCount / LIMIT);
  const currentPage = Math.floor(offset / LIMIT) + 1;

  function handleNext() {
    // boundary check — don't go past the last page
    if (currentPage >= totalPages) return;
    setOffset((prev) => prev + LIMIT);
  }

  function handlePrevious() {
    // boundary check — don't go below page 1
    if (offset <= 0) return;
    setOffset((prev) => prev - LIMIT);
  }

  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '24px',
    }}>
      <h2>Pokémon — Pagination with PokeAPI</h2>
      <p style={{ fontSize: '13px', color: '#888' }}>
        useCallback wraps the fetch function to prevent an infinite loop
        with useEffect. Each page change fetches a new set of Pokémon from
        the real PokeAPI — no mock data.
      </p>

      {/* page info */}
      <p style={{ fontSize: '13px', color: '#555' }}>
        Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong> —
        showing {LIMIT} of {totalCount} Pokémon
      </p>

      {/* error state — show message if fetch failed */}
      {error && (
        <p style={{ color: '#e74c3c', fontSize: '13px' }}>{error}</p>
      )}

      {/* loading state — show while fetching */}
      {loading ? (
        <p style={{ color: '#888', fontStyle: 'italic' }}>
          Loading Pokémon...
        </p>
      ) : (
        <ul style={{ paddingLeft: '20px' }}>
          {pokemon.map((p) => (
            <li key={p.name} style={{ marginBottom: '4px', textTransform: 'capitalize' }}>
              {p.name}
            </li>
          ))}
        </ul>
      )}

      {/* pagination controls */}
      <div style={{ display: 'flex', gap: '8px', marginTop: '12px', alignItems: 'center' }}>
        {/* disabled when on page 1 or while loading */}
        <button
          onClick={handlePrevious}
          disabled={offset <= 0 || loading}
          style={{ padding: '6px 12px' }}
        >
          ← Previous
        </button>

        <span style={{ fontSize: '13px', color: '#555' }}>
          Page {currentPage} of {totalPages}
        </span>

        {/* disabled when on last page or while loading */}
        <button
          onClick={handleNext}
          disabled={currentPage >= totalPages || loading}
          style={{ padding: '6px 12px' }}
        >
          Next →
        </button>
      </div>
    </div>
  );
}

export default PaginatedList;