import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserRegister } from '../../services/actions/registerAction';
import { registerUser } from '../../services/selectors/registerSelector';
import { validateEmail, validatePassword, validateConfirmPassword } from '../../utils/validation';
import styles from './SignUpModal.module.css';
import ModalButton from '../ModalButton/ModalButton';

function SignUpModal() {
  const auth = useSelector(registerUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      navigate('/users');
    }
  }, [auth, navigate]);

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
  const [isPasswordVisible, setIsPasswordVisible] = useState({
    password: false,
    confirmPassword: false
  });

  const isActive = formData.email &&
    formData.password &&
    formData.confirmPassword &&
    !formErrors.emailError &&
    !formErrors.passwordError &&
    !formErrors.confirmPasswordError;

  const handleRegister = (event) => {
    event.preventDefault();
    dispatch(getUserRegister(formData.email, formData.password));

    const { email, password, confirmPassword } = formData;
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(password, confirmPassword);

    setFormErrors({
      emailError,
      passwordError,
      confirmPasswordError
    });
  }

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
    };

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
    };

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
    };
  };

  const focusHandler = (event) => {
    const { name } = event.target;
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: ''
    }));
  };

  const togglePasswordVisible = (inputName) => {
    setIsPasswordVisible((prevState) => ({
      ...prevState,
      [inputName]: !prevState[inputName]
    }));
  };

  return createPortal(
    <form className={styles.form}>
      <h1 className={styles.title}>Регистрация</h1>
      <label>
        Имя
        <input
          type="text"
          placeholder="Артур"
          name="name"
          value={formData.name}
          autoComplete="off"
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
          autoComplete="off"
          onChange={handleChange}
          onFocus={focusHandler}
        />
        {formErrors.emailError && (
          <div className={styles.errorText}>{formErrors.emailError}</div>
        )}
      </label>
      <label>
        Пароль
        <div className={styles.inputContainer}>
          <input
            type={isPasswordVisible.password ? "text" : "password"}
            placeholder="******"
            className={styles.password}
            name="password"
            value={formData.password}
            autoComplete="off"
            onChange={handleChange}
            onFocus={focusHandler}
          />
          <figure
            className={`${styles.inputFigure} ${!isPasswordVisible.password ? styles.hidden : styles.visible
              }`}
            onClick={() => togglePasswordVisible("password")}
          />
        </div>
        {formErrors.passwordError && (
          <div className={styles.errorText}>{formErrors.passwordError}</div>
        )}
      </label>
      <label>
        Подтвердите пароль
        <div className={styles.inputContainer}>
          <input
            type={isPasswordVisible.confirmPassword ? "text" : "password"}
            placeholder="******"
            className={styles.password}
            name="confirmPassword"
            value={formData.confirmPassword}
            autoComplete="off"
            onChange={handleChange}
            onFocus={focusHandler}
          />
          <figure
            className={`${styles.inputFigure} ${!isPasswordVisible.confirmPassword ? styles.hidden : styles.visible
              }`}
            onClick={() => togglePasswordVisible("confirmPassword")}
          />
        </div>
        {formErrors.confirmPasswordError && (
          <div className={styles.errorText}>
            {formErrors.confirmPasswordError}
          </div>
        )}
      </label>
      <ModalButton title="Зарегистрироваться" onClick={handleRegister} active={isActive} disabled={!isValidForm} />
    </form>,
    document.getElementById('modal')
  );
};

export default SignUpModal;
