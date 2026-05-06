// src/components/roster/StudentCard.jsx
import StatusBadge from '../shared/StatusBadge';

// StatusBadge is now a shared reusable component
// StudentCard no longer contains the badge styling — it just uses the component
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
        backgroundColor: highlight ? '#fffbea' : isSelected ? '#e8f5e9' : '#fff',
        cursor: 'pointer',
      }}
    >
      <h3 style={{ margin: 0 }}>{name}</h3>
      <p style={{ margin: '4px 0 0' }}>Grade: {grade}</p>

      {/* StatusBadge is now a reusable shared component */}
      {/* same component, different label and color could be used anywhere */}
      {isSelected && <StatusBadge label="✓ Selected" color="#4caf50" />}
      {highlight && <StatusBadge label="⭐ Featured" color="#f5a623" />}
    </li>
  );
}

export default StudentCard;