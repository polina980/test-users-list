import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import Button from '../Button/Button';
import exitImage from '../../images/exit.svg';

const position = {
  top: '25px',
  right: '85px'
};

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className={styles.header}>
      <h1>Наша команда</h1>
      <p className={styles.description}>
        Это опытные специалисты, хорошо разбирающиеся во всех задачах,
        которые ложатся на их плечи, и умеющие находить выход из любых,
        даже самых сложных ситуаций.
      </p>
      <Button title="Выход" style={position} onClick={handleLogout} />
      <img src={exitImage} alt="Выход" className={styles.exitImage} />
    </div>
  );
}

export default Header;
