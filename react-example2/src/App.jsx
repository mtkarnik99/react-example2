// src/App.jsx
import { useEffect, useCallback, useReducer } from 'react';
import Counter from './components/features/Counter';
import ShoppingList from './components/features/ShoppingList';
import StudentCard from './components/roster/StudentCard';
import StudentList from './components/roster/StudentList';
import Dialog from './components/shared/Dialog';
import PaginatedList from './components/features/PaginatedList';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import {
  studentReducer,
  initialState as studentInitialState,
  studentActions,
} from './reducers/studentReducer';

// AppContent is separated from App so it can consume ThemeContext
// useTheme() only works inside a component wrapped by ThemeProvider
// if we called useTheme() directly in App, it would be outside the Provider
function AppContent() {
  const { theme, toggleTheme } = useTheme();

  // useReducer replaces the selectedStudent useState from last week
  // all student selection logic is now centralized in studentReducer
  const [studentState, dispatch] = useReducer(
    studentReducer,
    studentInitialState
  );
  const { selectedStudent } = studentState;

  const students = [
    { id: 1, name: 'Ethan', grade: 'A' },
    { id: 2, name: 'Nataly', grade: 'B' },
    { id: 3, name: 'Vanessa', grade: 'A' },
    { id: 4, name: 'John', grade: 'B+' },
  ];

  useEffect(() => {
    console.log('App re-rendered — selectedStudent is:', selectedStudent);
  });

  useEffect(() => {
    console.log('App mounted — this only runs once');
    return () => console.log('App unmounted — cleanup ran');
  }, []);

  // useCallback still wraps the handler — memo on StudentCard still needs
  // a stable function reference to work correctly
  const handleSelectStudent = useCallback((name) => {
    // dispatch replaces the inline ternary setState from last week
    dispatch({ type: studentActions.SELECT, name });
    console.log('Dispatched SELECT action for:', name);
  }, []);

  return (
    <main style={{
      maxWidth: '600px',
      margin: '0 auto',
      padding: '24px',
      fontFamily: 'sans-serif',
      // theme applied via context — controls the whole page
      backgroundColor: theme === 'dark' ? '#1a252f' : '#f5f5f5',
      minHeight: '100vh',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
      }}>
        <h1 style={{ color: theme === 'dark' ? '#fff' : '#2c3e50', margin: 0 }}>
          React Fundamentals — Week 10
        </h1>

        {/* theme toggle button — dispatches through context, not props */}
        <button
          onClick={toggleTheme}
          style={{
            padding: '8px 16px',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: theme === 'dark' ? '#fff' : '#2c3e50',
            color: theme === 'dark' ? '#2c3e50' : '#fff',
            cursor: 'pointer',
          }}
        >
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>

      {/* Counter — unchanged from last week */}
      <Counter />

      {/* ShoppingList — now uses useReducer and reads theme from context */}
      <ShoppingList />

      {/* Student Roster — useReducer manages selection, context provides theme */}
      <div style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '24px',
        backgroundColor: theme === 'dark' ? '#2c3e50' : '#fff',
      }}>
        <h2 style={{ color: theme === 'dark' ? '#fff' : '#2c3e50' }}>
          Student Roster — useReducer + useContext
        </h2>
        <p style={{ fontSize: '13px', color: theme === 'dark' ? '#aaa' : '#888' }}>
          Selection state is managed by studentReducer via dispatch.
          Theme is read from ThemeContext — no prop drilling needed.
        </p>

        {selectedStudent && (
          <p style={{
            padding: '8px',
            backgroundColor: '#e8f5e9',
            borderRadius: '4px',
            marginBottom: '12px',
            color: '#333',
          }}>
            Selected: <strong>{selectedStudent}</strong>
            {/* dispatch DESELECT action to clear selection */}
            <button
              onClick={() => dispatch({ type: studentActions.DESELECT })}
              style={{ marginLeft: '8px', fontSize: '12px' }}
            >
              Clear
            </button>
          </p>
        )}

        <StudentList
          students={students}
          onSelectStudent={handleSelectStudent}
          selectedStudent={selectedStudent}
        >
          <StudentCard
            name="Marcus"
            grade="A+"
            highlight={true}
            onSelect={handleSelectStudent}
            isSelected={selectedStudent === 'Marcus'}
          />
        </StudentList>
      </div>

      {/* PaginatedList — unchanged from last week */}
      <PaginatedList />

    </main>
  );
}

// App wraps AppContent in ThemeProvider
// ThemeProvider makes theme available to every component in the tree
// without any props being passed
export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}