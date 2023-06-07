import React, { useState } from 'react';
import styles from './UserCard.module.css';
import { users } from '../../utils/users.js';

function UserCard() {
  const [likedUsers, setLikedUsers] = useState([]);

  const handleLike = (index) => {
    if (likedUsers.includes(index)) {
      setLikedUsers(likedUsers.filter((item) => item !== index));
    } else {
      setLikedUsers([...likedUsers, index]);
    }
  };

  return (
    <section className={styles.cards}>
      {users.map((user, index) => (
        <div key={index} className={styles.card}>
          <img src={user.avatar} alt="Avatar" className={styles.avatar} />
          <span>{user.name}</span>
          <button
            type="button"
            className={`${styles.like} ${likedUsers.includes(index) ? styles.active : ''}`}
            onClick={() => handleLike(index)}
          />
        </div>
      ))}
    </section>
  );
}

export default UserCard;

