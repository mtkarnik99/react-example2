// src/components/roster/StudentList.jsx
import StudentCard from './StudentCard';
import { useTheme } from '../../context/ThemeContext';

function StudentList({ students, children, onSelectStudent, selectedStudent }) {
  // consuming ThemeContext directly — no theme prop needed from App
  // this is the prop drilling elimination in action
  // last week App would have needed to pass theme down through every level
  const { theme } = useTheme();

  return (
    <ul
      onClick={() => console.log('List clicked — bubbling demo')}
      style={{
        padding: 0,
        backgroundColor: theme === 'dark' ? '#34495e' : 'transparent',
        borderRadius: '8px',
      }}
    >
      <p style={{ fontSize: '13px', color: theme === 'dark' ? '#aaa' : '#888' }}>
        StudentList reads theme directly from ThemeContext — no prop needed.
      </p>

      {children}

      {students.length === 0 ? (
        <p style={{ color: '#888', fontStyle: 'italic' }}>
          No students in the roster yet.
        </p>
      ) : (
        students.map((student) => (
          <StudentCard
            key={student.id}
            name={student.name}
            grade={student.grade}
            onSelect={onSelectStudent}
            isSelected={selectedStudent === student.name}
          />
        ))
      )}
    </ul>
  );
}

export default StudentList;