// src/components/roster/StudentList.jsx
import StudentCard from './StudentCard';

// onSelectStudent must be a stable reference for React.memo on StudentCard to work
// if the function changes every render, memo sees a new prop and re-renders anyway
// that's why App wraps handleSelectStudent in useCallback before passing it down
function StudentList({ students, children, onSelectStudent, selectedStudent }) {
  return (
    <ul
      onClick={() => console.log('List clicked — bubbling demo')}
      style={{ padding: 0 }}
    >
      <p style={{ fontSize: '13px', color: '#888' }}>
        Open the console — with React.memo, cards only log "rendered"
        when their own props change, not on every App re-render.
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