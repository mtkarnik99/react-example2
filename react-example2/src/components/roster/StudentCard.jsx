// src/components/roster/StudentCard.jsx
import { memo } from 'react';
import StatusBadge from '../shared/StatusBadge';

// NEW this week — wrapped with React.memo
// React.memo skips re-rendering this component if its props haven't changed
// without memo, every StudentCard re-renders whenever App state changes
// even if name, grade, highlight, and isSelected are all identical
// open the console — you'll see "StudentCard rendered" only when props change
const StudentCard = memo(function StudentCard({
  name,
  grade,
  highlight = false,
  onSelect,
  isSelected = false,
}) {
  console.log(`StudentCard rendered: ${name}`);

  return (
    <li
      onClick={(event) => {
        event.stopPropagation();
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
      {isSelected && <StatusBadge label="✓ Selected" color="#4caf50" />}
      {highlight && <StatusBadge label="⭐ Featured" color="#f5a623" />}
    </li>
  );
});

export default StudentCard;