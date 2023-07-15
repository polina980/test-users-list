import styles from './ModalButton.module.css';

function ModalButton({ title, onClick, active, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${styles.modalButton} ${active ? styles.active : ''}`}
    >
      {title}
    </button>
  );
};

export default ModalButton;
