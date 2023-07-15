import styles from './ModalOverlay.module.css';

function ModalOverlay({ onClick }) {
  return (
    <div className={styles.overlay} onClick={onClick}></div>
  );
};

export default ModalOverlay;
