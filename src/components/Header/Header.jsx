import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Header.module.css';
import AvatarModal from '../AvatarModal/AvatarModal';
import Button from '../Button/Button';
import ExitImage from '../../images/exit.svg';
import BackImage from '../../images/arrow-left.svg';
import { setSelectedUser, clearSelectedUser } from '../../services/actions/usersAction';
import { getSelectedUser } from '../../services/selectors/usersSelector';
import { specialists } from '../../utils/constants';

const positionLeft = {
  top: '31px',
  left: '80px',
};

const positionRight = {
  top: '31px',
  right: '80px',
};

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedUser = useSelector(getSelectedUser);
  const dispatch = useDispatch();
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(selectedUser?.avatar || '');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('likedUsers');
    localStorage.removeItem('token');
    localStorage.removeItem('selectedUser');
    setIsLoggedOut(true);
    navigate('/');
  };

  const handleGoBack = () => {
    dispatch(clearSelectedUser());
    localStorage.removeItem('selectedUser');
    navigate('/users');
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('selectedUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      dispatch(setSelectedUser(parsedUser));
      setAvatarUrl(parsedUser.avatar);
    }
  }, [dispatch]);

  if (isLoggedOut) {
    return null;
  }

  const isUserHeader = location.pathname === '/about';

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className={styles.header}>
      {isUserHeader && (
        <>
          <Button title="Назад" style={positionLeft} onClick={handleGoBack} />
          <button className={styles.backImage} onClick={handleGoBack}>
            <img src={BackImage} alt="Назад" />
          </button>
          {selectedUser && (
            <div>
              <div className={styles.parnterName}>
                <h1>{selectedUser.first_name} {selectedUser.last_name}</h1>
                <span className={styles.parnter}>{specialists.find(specialist => specialist.id === selectedUser.id).position}</span>
              </div>
              <div className={styles.avatarContainer}>
                <button onClick={handleOpenModal} className={styles.avatarEdit}></button>
                {isModalOpen &&
                  <AvatarModal
                    avatarUrl={avatarUrl}
                    setAvatarUrl={setAvatarUrl}
                    setIsModalOpen={setIsModalOpen}
                  />
                }
                <img src={selectedUser.avatar || avatarUrl} alt="Аватар" className={styles.avatar} />
              </div>
            </div>
          )}
          <Button title="Выход" style={positionRight} onClick={handleLogout} />
          <button className={styles.exitImage} onClick={handleLogout}>
            <img src={ExitImage} alt="Выход" />
          </button>
        </>
      )}
      {!isUserHeader && (
        <>
          <h1>Наша команда</h1>
          <p className={styles.description}>
            Это опытные специалисты, хорошо разбирающиеся во всех задачах,
            которые ложатся на их плечи, и умеющие находить выход из любых,
            даже самых сложных ситуаций.
          </p>
          <Button title="Выход" style={positionRight} onClick={handleLogout} />
          <button className={styles.exitImage} onClick={handleLogout}>
            <img src={ExitImage} alt="Выход" />
          </button>
        </>
      )}
    </div>
  );
}

export default Header;
