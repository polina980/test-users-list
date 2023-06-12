const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email) {
  if (!email.includes('@') || !emailRegex.test(email)) {
    return 'Введите корректный адрес электронной почты';
  }
  return '';
}

export function validatePassword(password) {
  if (password.length < 6) {
    return 'Пароль должен содержать не менее 6 символов';
  }
  return '';
}

export function validateConfirmPassword(password, confirmPassword) {
  if (password !== confirmPassword) {
    return 'Пароли должны совпадать';
  }
  return '';
}
