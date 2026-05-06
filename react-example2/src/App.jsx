// src/App.jsx
import { useState, useEffect } from 'react';
import Counter from './components/features/Counter';
import ShoppingList from './components/features/ShoppingList';
import StudentCard from './components/roster/StudentCard';
import StudentList from './components/roster/StudentList';
import Dialog from './components/shared/Dialog';

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

  function handleSelectStudent(name) {
    setSelectedStudent(selectedStudent === name ? null : name);
    console.log('Handler called in App — selected:', name);
  }

  return (
    <main style={{
      maxWidth: '600px',
      margin: '0 auto',
      padding: '24px',
      fontFamily: 'sans-serif',
    }}>
      <h1>React Fundamentals — Week 8</h1>

      {/* Dialog — reusable component with kind prop and children */}
      {/* kind controls color and icon — children controls content */}
      {/* onDismiss is optional — only renders the button if passed */}
      {showDialog && (
        <Dialog kind={dialogKind} onDismiss={() => setShowDialog(false)}>
          <p>
            This is a <strong>{dialogKind}</strong> dialog. The color and
            icon are controlled by the kind prop. This content is passed
            as children — the Dialog doesn't need to know what goes here.
          </p>
        </Dialog>
      )}

      {/* buttons to toggle dialog kind — shows reusability in action */}
      <div style={{ marginBottom: '24px' }}>
        <p style={{ fontSize: '13px', color: '#888', marginBottom: '8px' }}>
          Toggle the Dialog kind to see the reusable component in action:
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

      {/* Counter — now uses useFormDirty custom hook and getCounterMessage helper */}
      <Counter />

      {/* ShoppingList — also uses useFormDirty custom hook */}
      <ShoppingList />

      {/* Student Roster — StudentCard now uses StatusBadge shared component */}
      <div style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '16px',
      }}>
        <h2>Student Roster — Reusable StatusBadge</h2>
        <p style={{ fontSize: '13px', color: '#888' }}>
          The selected badge and featured badge are both instances of the
          same StatusBadge component — same structure, different props.
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
    </main>
  );
}