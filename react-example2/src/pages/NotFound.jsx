// src/pages/NotFound.jsx
import { Link } from 'react-router';
import { useTheme } from '../context/ThemeContext';

// catch-all page — renders when no route matches the current URL
// path="*" in App.jsx points here
function NotFound() {
  const { theme } = useTheme();

  return (
    <div style={{
      textAlign: 'center',
      padding: '60px 24px',
    }}>
      <h2 style={{
        fontSize: '4rem',
        margin: '0 0 8px',
        color: theme === 'dark' ? '#fff' : '#2c3e50',
      }}>
        404
      </h2>
      <p style={{
        fontSize: '1.2rem',
        color: theme === 'dark' ? '#aaa' : '#555',
        marginBottom: '24px',
      }}>
        Page not found
      </p>
      <p style={{
        fontSize: '13px',
        color: theme === 'dark' ? '#aaa' : '#888',
        marginBottom: '24px',
      }}>
        The URL you entered doesn't match any route in the app.
        This page is rendered by the path="*" catch-all route.
      </p>

      {/* Link back home — always give users a way out of a 404 */}
      <Link
        to="/"
        style={{
          padding: '10px 20px',
          backgroundColor: theme === 'dark' ? '#fff' : '#2c3e50',
          color: theme === 'dark' ? '#2c3e50' : '#fff',
          borderRadius: '4px',
          textDecoration: 'none',
          fontWeight: 'bold',
        }}
      >
        Go Back Home
      </Link>
    </div>
  );
}

export default NotFound;