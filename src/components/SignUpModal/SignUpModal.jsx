import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import ModalOverlay from '../ModalOverlay/ModalOverlay.jsx';
import styles from './SignUpModal.module.css';
import { validateEmail, validatePassword, validateConfirmPassword } from '../../utils/validation.js';

function SignUpModal() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [formErrors, setFormErrors] = useState({
    emailError: '',
    passwordError: '',
    confirmPasswordError: ''
  });

  const [isValidForm, setIsValidForm] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password, confirmPassword } = formData;

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(password, confirmPassword);

    setFormErrors({
      emailError,
      passwordError,
      confirmPasswordError
    });

    if (!emailError && !passwordError && !confirmPasswordError) {
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
      navigate('/users');
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));

    if (name === 'email') {
      const emailError = validateEmail(value);
      setFormErrors((prevErrors) => {
        const newErrors = {
          ...prevErrors,
          emailError
        };
        setIsValidForm(() => !newErrors.emailError && !newErrors.passwordError);
        return newErrors;
      });
    }

    if (name === 'password') {
      const passwordError = validatePassword(value);
      setFormErrors((prevErrors) => {
        const newErrors = {
          ...prevErrors,
          passwordError
        };
        setIsValidForm(() => !prevErrors.emailError && !newErrors.passwordError);
        return newErrors;
      });
    }

    if (name === 'confirmPassword') {
      const confirmPasswordError = validateConfirmPassword(formData.password, value);
      setFormErrors((prevErrors) => {
        const newErrors = {
          ...prevErrors,
          confirmPasswordError
        };
        setIsValidForm(() => !prevErrors.emailError && !prevErrors.passwordError && !newErrors.confirmPasswordError);
        return newErrors;
      });
    }
  };

  const focusHandler = (event) => {
    const { name } = event.target;
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: ''
    }));
  };

  return createPortal(
    <>
      <ModalOverlay />
      <form className={styles.form}>
        <h1 className={styles.title}>Регистрация</h1>
        <label>
          Имя
          <input
            type="text"
            placeholder="Артур"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onFocus={focusHandler}
          />
        </label>
        <label>
          Электронная почта
          <input
            type="email"
            className={formErrors.emailError && styles.errorInput}
            placeholder="example@mail.ru"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onFocus={focusHandler}
          />
          {formErrors.emailError && (
            <div className={styles.errorText}>{formErrors.emailError}</div>
          )}
        </label>
        <label>
          Пароль
          <input
            type="password"
            placeholder="******"
            className={styles.password}
            name="password"
            value={formData.password}
            onChange={handleChange}
            onFocus={focusHandler}
          />
          {formErrors.passwordError && (
            <div className={styles.errorText}>{formErrors.passwordError}</div>
          )}
        </label>
        <label>
          Подтвердите пароль
          <input
            type="password"
            placeholder="******"
            className={styles.password}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            onFocus={focusHandler}
          />
          {formErrors.confirmPasswordError && (
            <div className={styles.errorText}>
              {formErrors.confirmPasswordError}
            </div>
          )}
        </label>

        <button
          onClick={handleSubmit}
          disabled={!isValidForm}
          className={styles.modalButton}
        >
          Зарегистрироваться
        </button>
      </form>
    </>,
    document.getElementById('modal')
  );
}

export default SignUpModal;
