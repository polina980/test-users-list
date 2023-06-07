import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { emailRegex } from './../../utils/constants';
import ModalOverlay from '../ModalOverlay/ModalOverlay.jsx';
import styles from './SignUpModal.module.css';

function SignUpModal() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isValidForm, setIsValidForm] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isValidForm && !emailError) {
      localStorage.setItem('email', email);
      navigate('/users');
    }
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setEmail(value);
  };

  const handleBlur = (event) => {
    const { value } = event.target;

    if (!value.includes('@') || !emailRegex.test(value)) {
      setEmailError('Ошибка');
      setIsValidForm(false);
    } else {
      setEmailError('');
      setIsValidForm(true);
    }
  };

  const handleFocus = () => {
    setEmailError('');
  };

  return createPortal(
    <>
      <ModalOverlay />
      <form className={styles.form}>
        <h1 className={styles.title}>Регистрация</h1>
        <label>
          Имя
          <input type="text" placeholder='Артур' />
        </label>
        <label>
          Электронная почта
          <input
            type="email"
            className={emailError && styles.errorInput}
            placeholder='example@mail.ru'
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            value={email}
            name='email'
          />
          {emailError && <div className={styles.errorText}>{emailError}</div>}
        </label>
        <label>
          Пароль
          <input type="password" placeholder='******' className={styles.password} />
        </label>
        <label>
          Подтвердите пароль
          <input type="password" placeholder='******' className={styles.password} />
        </label>
        <button onClick={handleSubmit} disabled={!isValidForm} className={styles.modalButton}>Зарегистрироваться</button>
      </form>
    </>,
    document.getElementById('modal')
  );
}

export default SignUpModal;
