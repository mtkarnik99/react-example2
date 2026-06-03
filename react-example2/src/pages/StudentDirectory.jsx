// src/pages/StudentDirectory.jsx
import { useReducer, useCallback } from 'react';
import { Link } from 'react-router';
import StudentList from '../components/roster/StudentList';
import StudentCard from '../components/roster/StudentCard';
import { useTheme } from '../context/ThemeContext';
import {
  studentReducer,
  initialState,
  studentActions,
} from '../reducers/studentReducer';

// students data defined here — in a real app this would come from an API
const students = [
  { id: 1, name: 'Ethan', grade: 'A' },
  { id: 2, name: 'Nataly', grade: 'B' },
  { id: 3, name: 'Vanessa', grade: 'A' },
  { id: 4, name: 'John', grade: 'B+' },
];

function StudentDirectory() {
  const { theme } = useTheme();
  const [studentState, dispatch] = useReducer(studentReducer, initialState);
  const { selectedStudent } = studentState;

  const handleSelectStudent = useCallback((name) => {
    dispatch({ type: studentActions.SELECT, name });
  }, []);

  return (
    <div>
      <h2 style={{ color: theme === 'dark' ? '#fff' : '#2c3e50', marginBottom: '16px' }}>
        Student Directory
      </h2>
      <p style={{ fontSize: '13px', color: theme === 'dark' ? '#aaa' : '#888', marginBottom: '16px' }}>
        Click a student card to select it or click the name link to view
        their profile page. Demonstrates React Router with useParams.
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

      {/* Link to individual student profiles — demonstrates dynamic routing */}
      <div style={{ marginTop: '16px' }}>
        <p style={{ fontSize: '13px', color: theme === 'dark' ? '#aaa' : '#888' }}>
          View individual profiles:
        </p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px' }}>
          {students.map((student) => (
            // Link navigates to /students/:id — id is the student's id
            // this demonstrates how dynamic routes work with real data
            <Link
              key={student.id}
              to={`/students/${student.id}`}
              style={{
                padding: '6px 12px',
                backgroundColor: theme === 'dark' ? '#34495e' : '#ecf0f1',
                color: theme === 'dark' ? '#fff' : '#2c3e50',
                borderRadius: '4px',
                textDecoration: 'none',
                fontSize: '14px',
              }}
            >
              {student.name}'s Profile
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StudentDirectory;