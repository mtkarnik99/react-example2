// src/components/StudentList.jsx
import StudentCard from './StudentCard';

// onSelectStudent is a handler prop passed down from App
// it gets forwarded to each StudentCard
function StudentList({ students, children, onSelectStudent }) {
  return (
    // the list has its own onClick to demonstrate event bubbling
    // if stopPropagation is removed from StudentCard, clicking a card
    // will trigger this handler too
    <ul
      onClick={() => console.log('List clicked — this fires if bubbling is not stopped')}
      style={{ padding: 0 }}
    >
      <p style={{ fontSize: '13px', color: '#888' }}>
        Click a card and check the console — stopPropagation prevents the
        click from reaching the list's own onClick handler.
      </p>

      {/* children renders first — guaranteed to appear at the top */}
      {children}

      {students.map((student) => (
        // onSelect is passed to each card as a handler prop
        // when a card is clicked, it calls onSelectStudent with the student's name
        <StudentCard
          key={student.id}
          name={student.name}
          grade={student.grade}
          onSelect={onSelectStudent}
        />
      ))}
    </ul>
  );
}

export default StudentList;