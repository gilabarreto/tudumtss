export default function Modal({ onClose, className = 'modal-card', children }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={className} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
