import styles from './HeaderButton.module.css';

function HeaderButton({ title, style, onClick }) {
  return (
    <button
      type="button"
      className={styles.button}
      style={style}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default HeaderButton;
