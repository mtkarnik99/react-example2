// src/components/shared/StatusBadge.jsx

// reusable component — extracted from StudentCard
// same structure every time, content and color controlled through props
// could be used anywhere in the app that needs a small status indicator
// default props ensure it works even if color isn't passed
function StatusBadge({ label, color = '#4caf50' }) {
  return (
    <span style={{
      display: 'inline-block',
      marginTop: '6px',
      padding: '2px 8px',
      backgroundColor: color,
      color: '#fff',
      borderRadius: '4px',
      fontSize: '12px',
    }}>
      {label}
    </span>
  );
}

export default StatusBadge;