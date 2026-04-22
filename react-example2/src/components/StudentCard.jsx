// src/components/StudentCard.jsx

function StudentCard({ name, grade, highlight = false }) {
  return (
    <li style={{
      border: highlight ? '2px solid gold' : '1px solid #ccc',
      borderRadius: '8px',
      padding: '10px',
      marginBottom: '8px',
      listStyle: 'none',
      backgroundColor: highlight ? '#fffbea' : '#fff',
    }}>
      <h3 style={{ margin: 0 }}>{name}</h3>
      <p style={{ margin: '4px 0 0' }}>Grade: {grade}</p>
    </li>
  );
}

export default StudentCard;