import { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './AvatarModal.module.css';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import { getSelectedUser } from '../../services/selectors/userSelectors';

function AvatarModal({ avatarUrl, setAvatarUrl, setIsModalOpen }) {
  const [isInputEmpty, setIsInputEmpty] = useState(true);
  const selectedUser = useSelector(getSelectedUser);

  const handleAvatarChange = (event) => {
    const url = event.target.value;
    setAvatarUrl(url);
    setIsInputEmpty(url.trim() === '');
  };

  const handleSaveAvatar = () => {
    if (avatarUrl) {
      selectedUser.avatar = avatarUrl;
      localStorage.setItem('selectedUser', JSON.stringify(selectedUser));
      setIsModalOpen(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <ModalOverlay onClick={handleCloseModal} />
      <section className={styles.modal}>
        <button type="button" className={styles.close} onClick={handleCloseModal}></button>
        <h1 className={styles.title}>Обновить аватар</h1>
        <form className={styles.form} >
          <input placeholder="Ссылка на картинку" onChange={handleAvatarChange} />
          <button
            type="button"
            onClick={handleSaveAvatar}
            disabled={isInputEmpty}
            className={`${styles.modalButton} ${!isInputEmpty ? styles.active : ''}`}
          >
            Сохранить
          </button>
        </form>
      </section>
    </>
  );
}

export default AvatarModal;
