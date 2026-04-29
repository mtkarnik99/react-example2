// src/App.jsx
import { useState, useEffect } from 'react';
import Counter from './components/Counter';
import ShoppingList from './components/ShoppingList';
import StudentCard from './components/StudentCard';
import StudentList from './components/StudentList';

export default function App() {
  const [selectedStudent, setSelectedStudent] = useState(null);

  const students = [
    { id: 1, name: 'Ethan', grade: 'A' },
    { id: 2, name: 'Nataly', grade: 'B' },
    { id: 3, name: 'Vanessa', grade: 'A' },
    { id: 4, name: 'John', grade: 'B+' },
  ];

  // useEffect with no dependency array — runs after every render
  useEffect(() => {
    console.log('App re-rendered — selectedStudent is:', selectedStudent);
  });

  // useEffect with empty dependency array — runs only once on mount
  useEffect(() => {
    console.log('App mounted — this only runs once');
    return () => {
      console.log('App unmounted — cleanup ran');
    };
  }, []);

  function handleSelectStudent(name) {
    // ternary — deselect if already selected, otherwise select
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
      <h1>React Fundamentals</h1>

      {/* Controlled Input & Confirm/Cancel */}
      <Counter />

      {/* Local State, Confirm/Cancel & Conditional Rendering */}
      <ShoppingList />

      {/* Conditional Rendering & Selected State */}
      <div style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '16px',
      }}>
        <h2>Student Roster — Conditional Rendering</h2>
        <p style={{ fontSize: '13px', color: '#888' }}>
          Click a card to select it — click again to deselect.
          The selected badge uses the && operator to conditionally render.
        </p>

        {/* && operator — only renders when a student is selected */}
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
            name="⭐ Marcus — Student of the Month!"
            grade="A+"
            highlight={true}
            onSelect={handleSelectStudent}
            isSelected={selectedStudent === '⭐ Marcus — Student of the Month!'}
          />
        </StudentList>
      </div>
    </main>
  );
}