import styles from './Button.module.css';

function Button({ title, style }) {
  return (
    <button
      type="button"
      className={styles.button}
      style={style}>
      {title}
    </button>
  );
}

export default Button;
