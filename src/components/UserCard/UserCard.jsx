import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUsers, fetchSelectedUser } from '../../services/actions/usersAction';
import { fetchDelayedUsers } from '../../services/actions/delayedUsersAction';
import { getUsers } from '../../services/selectors/usersSelector';
import { getDelayedUsers } from '../../services/selectors/delayedUsersSelector';
import styles from './UserCard.module.css';
import Loader from '../Loader/Loader';

function UserCard() {
  const [likedUsers, setLikedUsers] = useState([]);
  const [visibleUsers, setVisibleUsers] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const users = useSelector(getUsers);
  const delayedUsers = useSelector(getDelayedUsers);

  useEffect(() => {
    const savedLikedUsers = localStorage.getItem('likedUsers');
    if (savedLikedUsers) {
      setLikedUsers(JSON.parse(savedLikedUsers));
    }
  }, [setLikedUsers]);

  useEffect(() => {
    localStorage.setItem('likedUsers', JSON.stringify(likedUsers));
  }, [likedUsers]);

  useEffect(() => {
    dispatch(fetchUsers());
    setVisibleUsers(6);
  }, [dispatch, setVisibleUsers]);

  useEffect(() => {
    if (users.length > 0) {
      setIsLoading(false);
    }
  }, [users, delayedUsers]);

  const handleLike = (index) => {
    if (likedUsers.includes(index)) {
      setLikedUsers(likedUsers.filter((item) => item !== index));
    } else {
      setLikedUsers([...likedUsers, index]);
    }
  };

  const handleUserClick = (user) => {
    localStorage.setItem('selectedUser', JSON.stringify(user));
    dispatch(fetchSelectedUser(user));
  };

  const handleShowMore = () => {
    setVisibleUsers(visibleUsers + 6);
    dispatch(fetchDelayedUsers());
  };

  const handleShowLess = () => {
    setVisibleUsers(visibleUsers - 6);
  };

  const allUsers = [...users, ...delayedUsers];

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className={styles.cards}>
            {allUsers.slice(0, visibleUsers).map((user, index) => (
              <div key={index} className={styles.card}>
                <Link to="/about" className={styles.user} onClick={() => handleUserClick(user)}>
                  <img src={user.avatar} alt="Аватар" className={styles.avatar} />
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
          {visibleUsers === 6 ? (
            <button type="button" className={styles.buttonMore} onClick={handleShowMore}>Показать еще</button>
          ) : (
            <button type="button" className={`${styles.buttonMore} ${styles.less}`} onClick={handleShowLess}>Свернуть</button>
          )}
        </>
      )}
    </>
  );
};

export default UserCard;
