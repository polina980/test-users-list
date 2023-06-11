import styles from './Button.module.css';

function Button({ title, style, onClick }) {
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
}

export default Button;
