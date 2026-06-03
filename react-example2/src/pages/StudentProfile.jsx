// src/pages/StudentProfile.jsx
import { useParams, Link } from 'react-router';
import { useTheme } from '../context/ThemeContext';

// students data — in a real app this would come from an API or shared state
// useParams gives us the id from the URL — we use it to find the right student
const students = [
  { id: 1, name: 'Ethan', grade: 'A', bio: 'Loves JavaScript and hiking.' },
  { id: 2, name: 'Nataly', grade: 'B', bio: 'Passionate about UI design and CSS.' },
  { id: 3, name: 'Vanessa', grade: 'A', bio: 'Full stack developer in training.' },
  { id: 4, name: 'John', grade: 'B+', bio: 'Backend focused, enjoys databases.' },
];

function StudentProfile() {
  const { theme } = useTheme();

  // useParams reads the dynamic segment from the URL
  // if the URL is /students/2, then id === "2" (always a string)
  const { id } = useParams();

  // convert id to a number for comparison — useParams always returns strings
  const student = students.find((s) => s.id === parseInt(id, 10));

  // handle case where no student matches the ID in the URL
  // this is the same pattern as the 404 route but at the component level
  if (!student) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h2 style={{ color: theme === 'dark' ? '#fff' : '#2c3e50' }}>
          Student not found
        </h2>
        <p style={{ color: theme === 'dark' ? '#aaa' : '#888' }}>
          No student exists with ID: {id}
        </p>
        <Link
          to="/students"
          style={{ color: '#2980b9', textDecoration: 'none' }}
        >
          Back to Student Directory
        </Link>
      </div>
    );
  }

  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '24px',
      backgroundColor: theme === 'dark' ? '#2c3e50' : '#fff',
      maxWidth: '400px',
    }}>
      <h2 style={{ color: theme === 'dark' ? '#fff' : '#2c3e50', marginTop: 0 }}>
        {student.name}'s Profile
      </h2>

      <p style={{ color: theme === 'dark' ? '#aaa' : '#555' }}>
        <strong>Grade:</strong> {student.grade}
      </p>

      <p style={{ color: theme === 'dark' ? '#aaa' : '#555' }}>
        <strong>Bio:</strong> {student.bio}
      </p>

      <p style={{ fontSize: '13px', color: theme === 'dark' ? '#aaa' : '#888' }}>
        URL parameter: id = <strong>{id}</strong> (string from useParams,
        converted to number for lookup)
      </p>

      {/* Link back to the directory — uses React Router Link not anchor tag */}
      <Link
        to="/students"
        style={{
          display: 'inline-block',
          marginTop: '16px',
          padding: '8px 16px',
          backgroundColor: theme === 'dark' ? '#fff' : '#2c3e50',
          color: theme === 'dark' ? '#2c3e50' : '#fff',
          borderRadius: '4px',
          textDecoration: 'none',
        }}
      >
        Back to Directory
      </Link>
    </div>
  );
}

export default StudentProfile;