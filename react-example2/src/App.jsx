/* eslint-disable no-unused-vars */
// src/App.jsx
import { useState } from 'react';
import Counter from './components/Counter';
import ShoppingList from './components/ShoppingList';
import StudentCard from './components/StudentCard';
import StudentList from './components/StudentList';

export default function App() {
  const students = [
    { id: 1, name: 'Ethan', grade: 'A' },
    { id: 2, name: 'Nataly', grade: 'B' },
    { id: 3, name: 'Vanessa', grade: 'A' },
    { id: 4, name: 'Marcus', grade: 'B+' },
  ];

  return (
    <main style={{
      maxWidth: '600px',
      margin: '0 auto',
      padding: '24px',
      fontFamily: 'sans-serif',
    }}>
      <h1>React Fundamentals — Week 4</h1>

      {/* useState & Stale State */}
      <Counter />

      {/* Immutability */}
      <ShoppingList />

      {/* Props, Component Refactoring & Children Props */}
      <div style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '16px',
      }}>
        <h2>Student Roster — Props & Children</h2>

        <StudentList students={students}>
          {/* passed as children — always renders first */}
          <StudentCard
            name="⭐ Marcus — Student of the Month!"
            grade="A+"
            highlight={true}
          />
        </StudentList>
      </div>
    </main>
  );
}