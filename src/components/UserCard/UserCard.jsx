import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './UserCard.module.css';
import { fetchUsers, setSelectedUser } from '../../services/actions/userActions';
import { getUsers } from '../../services/selectors/userSelectors';

function UserCard() {
  const [likedUsers, setLikedUsers] = useState([]);
  const [visibleUsers, setVisibleUsers] = useState(4);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const savedLikedUsers = localStorage.getItem('likedUsers');
    if (savedLikedUsers) {
      setLikedUsers(JSON.parse(savedLikedUsers));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('likedUsers', JSON.stringify(likedUsers));
  }, [likedUsers]);

  const dispatch = useDispatch();
  const users = useSelector(getUsers);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    setTotalUsers(users.length);
  }, [users]);

  const handleLike = (index) => {
    if (likedUsers.includes(index)) {
      setLikedUsers(likedUsers.filter((item) => item !== index));
    } else {
      setLikedUsers([...likedUsers, index]);
    }
  };

  const handleUserClick = (user) => {
    localStorage.setItem('selectedUser', JSON.stringify(user));
    dispatch(setSelectedUser(user));
  };

  const handleShowMore = () => {
    setVisibleUsers(visibleUsers + 4);
  };

  const handleShowLess = () => {
    setVisibleUsers(4);
  };

  return (
    <>
      <div className={styles.cards}>
        {users.slice(0, visibleUsers).map((user, index) => (
          <div key={index} className={styles.card}>
            <Link to="/about" onClick={() => handleUserClick(user)} className={styles.user}>
              <img src={user.avatar} alt="Avatar" className={styles.avatar} />
              <span>{user.first_name} {user.last_name}</span>
            </Link>
            <button
              type="button"
              className={`${styles.like} ${likedUsers.includes(index) ? styles.active : ''}`}
              onClick={() => handleLike(index)}
            />
          </div>
        ))}
      </div>
      {visibleUsers < totalUsers ? (
        <button type="button" className={styles.buttonMore} onClick={handleShowMore}>Показать еще</button>
      ) : (
        <button type="button" className={`${styles.buttonMore} ${styles.less}`} onClick={handleShowLess}>Свернуть</button>
      )}
    </>
  );
}

export default UserCard;
