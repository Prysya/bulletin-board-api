module.exports = {
  auth: {
    authIsSuccess: 'Авторизация прошла успешно',
    notAuthorised: 'Необходима аутентификация',
    wrongEmailOrPassword: 'Неправильная почта или пароль',
    logout: 'Вы успешно вышли с учетной записи',
    notEnoughRights: 'Недостаточно прав для выполнения операции',
  },
  advertisement: {
    idIsNotValid: 'Данный id невалиден',
    shortTextIsRequired:
      'Необходимо заполнить название объявления (поле shortText)',
    isDeleted: 'Объявление успешно удалено',
  },
  user: {
    passwordIsNotValid:
      'Длинна пароля менее 8 символов, либо пароль не валиден',
    idIsNotFound: 'Нет пользователя с таким id',
    passwordTooShort: 'Длинна пароля должна быть не менее 8 символов',
    emailIsNotUnique: 'Данный email уже зарегестрирован',
    emailIsRequired: 'Необходимо указать email',
    passwordIsRequired: 'Необходимо указать пароль',
    nameLengthIsNotValid: 'Длинна поля имени должна быть от 2 до 30 символов',
  },
  validation: {
    urlIsNotValid: 'Невалидный URL',
    notFound: 'Запрашиваемый ресурс не найден',
    userNotFound: 'Запрашиваемый пользователь не найден',
  },
  schemas: {
    isEmpty: 'Поле не может быть пустым',
    wrongUrl: 'Неправильный формат ссылки',
    emailIsNotValid: 'Невалидный email',
    isRequired: 'Поле обязательно для заполнения',
    mobilePhoneIsNotValid: 'Невалидный номер телефона',
    isRequiredFunc: (paramsArr) =>
      `${paramsArr.length === 1 ? 'Поле' : 'Поля'} ${paramsArr.join(', ')} ${
        paramsArr.length === 1 ? 'обязательно' : 'обязательны'
      } для заполнения`,
  },
};
