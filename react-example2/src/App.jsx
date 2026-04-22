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
    { id: 4, name: 'Marcus', grade: 'B+' },
  ];

  // useEffect with no dependency array — runs after every render
  // demonstrates the difference between dependency array behaviors
  // open the console to see this fire on every state change in the app
  useEffect(() => {
    console.log('App re-rendered — selectedStudent is:', selectedStudent);
  });

  // useEffect with empty dependency array — runs only once on mount
  // cleanup runs when the component unmounts
  // demonstrates the mount/unmount lifecycle
  useEffect(() => {
    console.log('App mounted — this only runs once');

    return () => {
      console.log('App unmounted — cleanup ran');
    };
  }, []);

  // handler function defined in the parent
  // passed down to StudentList, then forwarded to each StudentCard
  // when a card is clicked, this function receives the student's name
  // and updates selectedStudent state — triggering a re-render
  function handleSelectStudent(name) {
    setSelectedStudent(name);
    console.log('Handler called in App — selected:', name);
  }

  return (
    <main style={{
      maxWidth: '600px',
      margin: '0 auto',
      padding: '24px',
      fontFamily: 'sans-serif',
    }}>
      <h1>React Fundamentals — Week 5</h1>

      {/* useEffect & Stale State */}
      <Counter />

      {/* useRef & Immutability */}
      <ShoppingList />

      {/* Events, Handler Props & Event Propagation */}
      <div style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '16px',
      }}>
        <h2>Student Roster — Events & Handlers</h2>
        <p style={{ fontSize: '13px', color: '#888' }}>
          Click any student card to trigger the handler. The selected student's
          name is passed back up to App via the onSelectStudent callback.
        </p>

        {/* selected student display — updates when a card is clicked */}
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

        {/* onSelectStudent is passed down to StudentList */}
        {/* StudentList forwards it to each StudentCard as onSelect */}
        <StudentList
          students={students}
          onSelectStudent={handleSelectStudent}
        >
          {/* children prop — always renders first */}
          <StudentCard
            name="⭐ Marcus — Student of the Month!"
            grade="A+"
            highlight={true}
            onSelect={handleSelectStudent}
          />
        </StudentList>
      </div>
    </main>
  );
}