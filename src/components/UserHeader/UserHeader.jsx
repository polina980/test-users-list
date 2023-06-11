import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './UserHeader.module.css';
import Button from '../Button/Button';
import BackImage from '../../images/arrow-left.svg';
import ExitImage from '../../images/exit.svg';
import { getSelectedUser } from '../../services/selectors/userSelectors';
import { clearSelectedUser } from '../../services/actions/userActions';

const positionLeft = {
  top: '25px',
  left: '85px',
};

const positionRight = {
  top: '25px',
  right: '85px',
};

function UserHeader() {
  const selectedUser = useSelector(getSelectedUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoBack = () => {
    dispatch(clearSelectedUser());
    navigate('/users');
  };

  // const handleLogout = () => {
  //   localStorage.removeItem('email', email);
  //   navigate('/');
  // }; сбросить пользователя и лайки

  return (
    <div className={styles.header}>
      <Button title="Назад" style={positionLeft} onClick={handleGoBack} />
      <img src={BackImage} alt="Назад" className={styles.backImage} />
      {selectedUser && (
        <div className={styles.user}>
          <img src={selectedUser.avatar} alt="Avatar" className={styles.avatar} />
          <div>
            <h1>{selectedUser.first_name} {selectedUser.last_name}</h1>
            <span className={styles.parnter}>Партнер</span>
          </div>
        </div>
      )}
      <Button title="Выход" style={positionRight} />
      <img src={ExitImage} alt="Выход" className={styles.exitImage} />
    </div>
  );
}

export default UserHeader;
