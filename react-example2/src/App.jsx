// src/App.jsx
import { Routes, Route } from 'react-router';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Navbar from './components/shared/Navbar';

// page components — each one maps to a route
import Home from './pages/Home';
import ShoppingListPage from './pages/ShoppingListPage';
import StudentDirectory from './pages/StudentDirectory';
import StudentProfile from './pages/StudentProfile';
import PokemonPage from './pages/PokemonPage';
import NotFound from './pages/NotFound';

function AppContent() {
  const { theme } = useTheme();

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: theme === 'dark' ? '#1a252f' : '#f5f5f5',
      fontFamily: 'sans-serif',
    }}>
      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '24px' }}>

        <h1 style={{
          color: theme === 'dark' ? '#fff' : '#2c3e50',
          marginBottom: '16px',
        }}>
          React Fundamentals — Week 10
        </h1>

        {/* Navbar appears on every page — NavLink highlights the active route */}
        <Navbar />

        {/* Routes picks the best matching Route based on the current URL */}
        <Routes>
          {/* index route — renders when URL is "/" */}
          <Route path="/" element={<Home />} />

          {/* each feature gets its own page and URL */}
          <Route path="/shopping" element={<ShoppingListPage />} />
          <Route path="/students" element={<StudentDirectory />} />
          <Route path="/pokemon" element={<PokemonPage />} />

          {/* dynamic route — :id is a URL parameter read by useParams */}
          {/* /students/1 renders StudentProfile with id="1" */}
          {/* /students/2 renders StudentProfile with id="2" */}
          <Route path="/students/:id" element={<StudentProfile />} />

          {/* catch-all — renders when no other route matches */}
          {/* try navigating to /anything to see this in action */}
          <Route path="*" element={<NotFound />} />
        </Routes>

      </div>
    </div>
  );
}

// App wraps AppContent in ThemeProvider
// ThemeProvider must be outside AppContent so useTheme works everywhere
export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}