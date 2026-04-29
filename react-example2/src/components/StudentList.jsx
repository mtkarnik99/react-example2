// src/components/StudentList.jsx
import StudentCard from './StudentCard';

function StudentList({ students, children, onSelectStudent, selectedStudent }) {
  return (
    <ul
      onClick={() => console.log('List clicked — this fires if bubbling is not stopped')}
      style={{ padding: 0 }}
    >
      <p style={{ fontSize: '13px', color: '#888' }}>
        Click a card and check the console — stopPropagation prevents the
        click from reaching the list's own onClick handler.
      </p>

      {children}

      {/* ternary — show empty message or the list of cards */}
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
            // isSelected — true only for the currently selected student
            // conditional rendering in StudentCard depends on this value
            isSelected={selectedStudent === student.name}
          />
        ))
      )}
    </ul>
  );
}

export default StudentList;