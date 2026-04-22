// src/components/StudentList.jsx
import StudentCard from './StudentCard';

function StudentList({ students, children }) {
  return (
    <ul style={{ padding: 0 }}>
      {/* whatever is passed between <StudentList> tags appears here */}
      {children}

      {/* key goes on the component here, not inside StudentCard */}
      {students.map((student) => (
        <StudentCard
          key={student.id}
          name={student.name}
          grade={student.grade}
        />
      ))}
    </ul>
  );
}

export default StudentList;