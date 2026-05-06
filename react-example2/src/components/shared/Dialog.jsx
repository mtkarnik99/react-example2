// src/components/shared/Dialog.jsx

// lookup objects — map the kind prop to colors and icons
// adding a new dialog type only requires updating these two objects
// no if/else chains needed
const colors = {
  error: '#f6bed7',
  info: '#bec7f6',
  success: '#bef6c5',
  warning: '#f6eebc',
};

const icons = {
  error: '❌',
  info: 'ℹ️',
  success: '✔️',
  warning: '⚠️',
};

// reusable component — kind prop controls color and icon
// children prop controls the content — no need to predict every use case
// default kind of 'info' means it works even if no kind is passed
function Dialog({ children, kind = 'info', onDismiss }) {
  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      marginBottom: '24px',
      overflow: 'hidden',
    }}>
      {/* heading — background color comes from the colors lookup object */}
      <div style={{
        backgroundColor: colors[kind],
        padding: '10px 16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <strong>{kind.toUpperCase()}</strong>
        {/* icon comes from the icons lookup object */}
        <span>{icons[kind]}</span>
      </div>

      {/* content — children renders whatever is passed between the tags */}
      {/* the Dialog doesn't need to know what the content is */}
      <div style={{ padding: '16px' }}>
        {children}
      </div>

      {/* controls — onDismiss is optional, only renders if passed */}
      {onDismiss && (
        <div style={{ padding: '0 16px 16px' }}>
          <button onClick={onDismiss}>Dismiss</button>
        </div>
      )}
    </div>
  );
}

export default Dialog;