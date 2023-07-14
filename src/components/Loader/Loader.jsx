import styles from './Loader.module.css';
import { BallTriangle } from 'react-loader-spinner';

function Loader() {
  return (
    <div className={styles.loaderContainer}>
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#512689"
        ariaLabel="ball-triangle-loading"
        visible={true}
      />
    </div>
  );
}

export default Loader;
