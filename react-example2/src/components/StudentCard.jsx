// src/components/StudentCard.jsx

function StudentCard({ name, grade, highlight = false, onSelect, isSelected = false }) {
  return (
    <li
      onClick={(event) => {
        event.stopPropagation();
        console.log('Card clicked — stopPropagation prevented bubbling to the list');
        onSelect(name);
      }}
      style={{
        border: highlight ? '2px solid gold' : '1px solid #ccc',
        borderRadius: '8px',
        padding: '10px',
        marginBottom: '8px',
        listStyle: 'none',
        // conditional styling — selected card gets a green background
        backgroundColor: highlight ? '#fffbea' : isSelected ? '#e8f5e9' : '#fff',
        cursor: 'pointer',
      }}
    >
      <h3 style={{ margin: 0 }}>{name}</h3>
      <p style={{ margin: '4px 0 0' }}>Grade: {grade}</p>

      {/* && operator — only renders the badge when isSelected is true */}
      {isSelected && (
        <span style={{
          display: 'inline-block',
          marginTop: '6px',
          padding: '2px 8px',
          backgroundColor: '#4caf50',
          color: '#fff',
          borderRadius: '4px',
          fontSize: '12px',
        }}>
          ✓ Selected
        </span>
      )}
    </li>
  );
}

export default StudentCard;