import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      login: "Login",
      logout: "Logout",
      search_inv: "Search inventories...",
      sign_or_log: "Sign Up or Log In",
      name: "Username",
      email: "Email address",
      password: "Password",
      registration: "Registration",
      register: "Registration",
      or: "OR",
      or_use_third: "Or use a third-party",
      continue_google: "Continue with Google",
      continue_facebook: "Continue with Facebook",
      is_required: "is required",
      is_invalid: "is invalid",
      should_be_one_word: "should be one word",
      successful: "successful",

      password_no_spaces: "Password must not contain spaces",
      password_invalid_characters: "Password contains invalid characters",
      password_min_length_5: "Password must be at least 5 characters long",

      errors: {
        no_user: "No user with this name was found",
        incorrect_credentials: "Incorrect name or email",
        blocked: "This user is blocked",
        incorrect_password: "Incorrect password",
        login_error: "Login error",
        name_exists: "This name is already in use",
        email_exists: "This email is already in use",
        password_short: "Password too short",
        register_error: "Registration error",
        profile_error: "Profile error",
        unknown_error: "Unknown error",
      },
    },
  },

  ru: {
    translation: {
      login: "Вход",
      logout: "Выйти",
      search_inv: "Найти инвентарь...",
      sign_or_log: "Авторизуйтесь",
      name: "Имя пользователя",
      email: "Электронная почта",
      password: "Пароль",
      registration: "Регистрация",
      register: "Регистрация",
      or: "ИЛИ",
      or_use_third: "Или используйте сторонние сервисы",
      continue_google: "Продолжить с Google",
      continue_facebook: "Продолжить с Facebook",
      is_required: "не может отсутствовать",
      is_invalid: "некорректная",
      should_be_one_word: "не может содержать пробелы",
      successful: "выполнен",

      password_no_spaces: "Пароль не должен содержать пробелы",
      password_invalid_characters: "Пароль содержит недопустимые символы",
      password_min_length_5: "Пароль должен содержать минимум 5 символов",

      errors: {
        no_user: "Пользователь с таким именем не найден",
        incorrect_credentials: "Неверное имя или адрес электронной почты",
        blocked: "Этот пользователь заблокирован",
        incorrect_password: "Неверный пароль",
        login_error: "Ошибка входа",
        name_exists: "Это имя уже используется",
        email_exists: "Этот email уже используется",
        password_short: "Пароль слишком короткий",
        register_error: "Ошибка регистрации",
        profile_error: "Ошибка профиля",
        unknown_error: "Неизвестная ошибка",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;