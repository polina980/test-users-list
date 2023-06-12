import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Header.module.css';
import Button from '../Button/Button';
import exitImage from '../../images/exit.svg';
import BackImage from '../../images/arrow-left.svg';
import { useSelector, useDispatch } from 'react-redux';
import { getSelectedUser } from '../../services/selectors/userSelectors';
import { setSelectedUser, clearSelectedUser } from '../../services/actions/userActions';

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

  const handleLogout = () => {
    localStorage.removeItem('likedUsers');
    localStorage.removeItem('email');
    localStorage.removeItem('password');
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
    }
  }, [dispatch]);

  if (isLoggedOut) {
    return null;
  }

  const isUserHeader = location.pathname === '/about';

  return (
    <div className={styles.header}>
      {isUserHeader && (
        <>
          <Button title="Назад" style={positionLeft} onClick={handleGoBack} />
          <button className={styles.backImage} onClick={handleGoBack}>
            <img src={BackImage} alt="Назад" />
          </button>
          {selectedUser && (
            <div className={styles.user}>
              <img src={selectedUser.avatar} alt="Avatar" className={styles.avatar} />
              <div className={styles.parnterName}>
                <h1>{selectedUser.first_name} {selectedUser.last_name}</h1>
                <span className={styles.parnter}>Партнер</span>
              </div>
            </div>
          )}
          <Button title="Выход" style={positionRight} onClick={handleLogout} />
          <button className={styles.exitImage} onClick={handleLogout}>
            <img src={exitImage} alt="Выход" />
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
            <img src={exitImage} alt="Выход" />
          </button>
        </>
      )}
    </div>
  );
}

export default Header;
