// src/App.jsx
import { useState, useEffect, useCallback } from 'react';
import Counter from './components/features/Counter';
import ShoppingList from './components/features/ShoppingList';
import StudentCard from './components/roster/StudentCard';
import StudentList from './components/roster/StudentList';
import Dialog from './components/shared/Dialog';
import PaginatedList from './components/features/PaginatedList';

export default function App() {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [dialogKind, setDialogKind] = useState('info');
  const [showDialog, setShowDialog] = useState(true);

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

  // NEW this week — wrapped in useCallback
  // StudentCard is now wrapped in React.memo
  // memo skips re-renders when props haven't changed
  // BUT if handleSelectStudent is a new reference every render,
  // memo sees a changed prop and re-renders anyway
  // useCallback keeps the reference stable — memo can do its job
  const handleSelectStudent = useCallback((name) => {
    setSelectedStudent((prev) => prev === name ? null : name);
    console.log('Handler called in App — selected:', name);
  }, []); // no dependencies — setSelectedStudent is stable by default

  return (
    <main style={{
      maxWidth: '600px',
      margin: '0 auto',
      padding: '24px',
      fontFamily: 'sans-serif',
    }}>
      <h1>React Fundamentals — Week 9</h1>

      {/* Dialog — unchanged from last week */}
      {showDialog && (
        <Dialog kind={dialogKind} onDismiss={() => setShowDialog(false)}>
          <p>
            This is a <strong>{dialogKind}</strong> dialog.
          </p>
        </Dialog>
      )}

      <div style={{ marginBottom: '24px' }}>
        <p style={{ fontSize: '13px', color: '#888', marginBottom: '8px' }}>
          Toggle the Dialog kind:
        </p>
        {['info', 'success', 'warning', 'error'].map((kind) => (
          <button
            key={kind}
            onClick={() => {
              setDialogKind(kind);
              setShowDialog(true);
            }}
            style={{ marginRight: '8px' }}
          >
            {kind}
          </button>
        ))}
      </div>

      {/* Counter — now uses useMemo for stats and useCallback for addTwoFixed */}
      <Counter />

      {/* ShoppingList — now uses useMemo for filtered list */}
      <ShoppingList />

      {/* Student Roster — StudentCard now wrapped in React.memo */}
      {/* handleSelectStudent wrapped in useCallback so memo works correctly */}
      <div style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '24px',
      }}>
        <h2>Student Roster — React.memo + useCallback</h2>
        <p style={{ fontSize: '13px', color: '#888' }}>
          Each StudentCard is wrapped in React.memo. handleSelectStudent
          is wrapped in useCallback. Open the console — cards only log
          "rendered" when their own props change.
        </p>

        {selectedStudent && (
          <p style={{
            padding: '8px',
            backgroundColor: '#e8f5e9',
            borderRadius: '4px',
            marginBottom: '12px',
          }}>
            Selected: <strong>{selectedStudent}</strong>
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

      {/* NEW this week — PaginatedList fetches real data from PokeAPI */}
      <PaginatedList />

    </main>
  );
}