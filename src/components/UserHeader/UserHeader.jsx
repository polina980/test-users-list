import styles from './UserHeader.module.css';
import Button from '../Button/Button';
import BackImage from '../../images/arrow.svg';
import ExitImage from '../../images/exit.svg';
import Avatar from '../../images/avatars/avatar-1.jpg';

const positionLeft = {
  top: '25px',
  left: '85px'
}

const positionRight = {
  top: '25px',
  right: '85px'
}

function UserHeader() {
  return (
    <div className={styles.header}>
      <Button title="Назад" style={positionLeft} />
      <img src={BackImage} alt="Назад" className={styles.backImage} />
      <div className={styles.user}>
        <img src={Avatar} alt="Avatar" className={styles.avatar} />
        <div>
          <h1>Артур Королёв</h1>
          <span className={styles.parnter}>Партнер</span>
        </div>
      </div>
      <Button title="Выход" style={positionRight} />
      <img src={ExitImage} alt="Выход" className={styles.exitImage} />
    </div>
  )
}

export default UserHeader;
