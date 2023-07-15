import { useState } from 'react';
import { useSelector } from 'react-redux';
import { createPortal } from 'react-dom';
import { getSelectedUser } from '../../services/selectors/usersSelector';
import styles from './AvatarModal.module.css';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import ModalButton from '../ModalButton/ModalButton';

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

  return createPortal(
    <>
      <ModalOverlay onClick={handleCloseModal} />
      <section className={styles.modal}>
        <button type="button" className={styles.close} onClick={handleCloseModal}></button>
        <h1 className={styles.title}>Обновить аватар</h1>
        <form className={styles.form} >
          <input placeholder="Ссылка на картинку" onChange={handleAvatarChange} />
          <ModalButton title="Сохранить" onClick={handleSaveAvatar} active={!isInputEmpty} disabled={isInputEmpty} />
        </form>
      </section>
    </>,
    document.getElementById('modal')
  );
};

export default AvatarModal;
