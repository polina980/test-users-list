import styles from './UserInfo.module.css';
import { useSelector } from 'react-redux';
import { getSelectedUser } from '../../services/selectors/userSelectors';
import { specialists } from '../../utils/constants';
import PhoneImage from '../../images/phone.svg';
import EmailImage from '../../images/email.svg';

function UserInfo() {
  const selectedUser = useSelector(getSelectedUser);

  if (!selectedUser) {
    return null
  }

  return (
    <section className={styles.info}>
      <aside>
        <figure className={styles.figure}>
          <img src={PhoneImage} alt="Телефон" />
          <figcaption>
            <p className={styles.text}>{specialists.find(specialist => specialist.id === selectedUser.id).phone}</p>
          </figcaption>
        </figure>
        <figure className={styles.figure}>
          <img src={EmailImage} alt="Почта" />
          <figcaption>
            <p className={styles.text}>{selectedUser.email}</p>
          </figcaption>
        </figure>
      </aside>
      <ul className={styles.list}>
        <li className={styles.description}>
          <p className={styles.text}>{specialists.find(specialist => specialist.id === selectedUser.id).description}</p>
        </li>
      </ul>
    </section>
  );
}

export default UserInfo;
