// src/components/StudentCard.jsx

// onSelect is a handler prop passed down from StudentList
// when clicked, it calls back up to the parent with this student's name
// this is how child components communicate back to their parents
function StudentCard({ name, grade, highlight = false, onSelect }) {
  return (
    <li
      onClick={(event) => {
        // stopPropagation prevents the click from bubbling up to the
        // parent list's own onClick handler
        // without this, clicking a card would trigger BOTH handlers
        event.stopPropagation();
        console.log('Card clicked — stopPropagation prevented bubbling to the list');

        // invoke the callback passed from the parent
        // this is how we communicate back up the component tree
        onSelect(name);
      }}
      style={{
        border: highlight ? '2px solid gold' : '1px solid #ccc',
        borderRadius: '8px',
        padding: '10px',
        marginBottom: '8px',
        listStyle: 'none',
        backgroundColor: highlight ? '#fffbea' : '#fff',
        cursor: 'pointer',
      }}
    >
      <h3 style={{ margin: 0 }}>{name}</h3>
      <p style={{ margin: '4px 0 0' }}>Grade: {grade}</p>
    </li>
  );
}

export default StudentCard;