import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './UserCard.module.css';
import { fetchUsers, setSelectedUser } from '../../services/actions/userActions';
import { getUsers } from '../../services/selectors/userSelectors';

function UserCard() {
  const [likedUsers, setLikedUsers] = useState([]);

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

  const handleLike = (index) => {
    if (likedUsers.includes(index)) {
      setLikedUsers(likedUsers.filter((item) => item !== index));
    } else {
      setLikedUsers([...likedUsers, index]);
    }
  };

  const handleUserClick = (user) => {
    dispatch(setSelectedUser(user));
  };

  return (
    <>
      <div className={styles.cards}>
        {users.map((user, index) => (
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
      <button type="button" className={styles.buttonMore}>Показать еще</button>
    </>
  );
}

export default UserCard;
