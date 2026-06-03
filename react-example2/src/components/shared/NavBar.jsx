// src/components/shared/Navbar.jsx
import { NavLink } from 'react-router';
import { useTheme } from '../../context/ThemeContext';

// NavLink automatically adds an "active" class when its route matches
// we use this to style the current page's link differently
function Navbar() {
  const { theme, toggleTheme } = useTheme();

  // inline style function — NavLink passes isActive to let us style conditionally
  function getLinkStyle({ isActive }) {
    return {
      textDecoration: 'none',
      padding: '6px 12px',
      borderRadius: '4px',
      fontWeight: isActive ? 'bold' : 'normal',
      // active link gets a highlighted background
      backgroundColor: isActive
        ? theme === 'dark' ? '#fff' : '#2c3e50'
        : 'transparent',
      color: isActive
        ? theme === 'dark' ? '#2c3e50' : '#fff'
        : theme === 'dark' ? '#fff' : '#2c3e50',
    };
  }

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 24px',
      backgroundColor: theme === 'dark' ? '#2c3e50' : '#ecf0f1',
      marginBottom: '24px',
      borderRadius: '8px',
    }}>
      {/* navigation links — NavLink tracks which one is active */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <NavLink to="/" style={getLinkStyle}>
          Counter
        </NavLink>
        <NavLink to="/shopping" style={getLinkStyle}>
          Shopping List
        </NavLink>
        <NavLink to="/students" style={getLinkStyle}>
          Students
        </NavLink>
        <NavLink to="/pokemon" style={getLinkStyle}>
          Pokémon
        </NavLink>
      </div>

      {/* theme toggle lives in the navbar — available on every page */}
      <button
        onClick={toggleTheme}
        style={{
          padding: '6px 12px',
          borderRadius: '4px',
          border: 'none',
          backgroundColor: theme === 'dark' ? '#fff' : '#2c3e50',
          color: theme === 'dark' ? '#2c3e50' : '#fff',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
      </button>
    </nav>
  );
}

export default Navbar;