![feature-sliced-banner](/static/logo.png)

<p align="center">
    <img alt="Version" src="https://img.shields.io/github/package-json/v/prysya/bulletin-board-api" />
    <img alt="Made by: Prysya" src="https://img.shields.io/badge/Made%20by-Prysya-blueviolet" />
    <img alt="Stars *" src="https://img.shields.io/github/stars/prysya/bulletin-board-api" />
    <img alt="Beta Quality" src="https://img.shields.io/badge/Status-Beta-orange.svg" >
    <img alt="Code Size" src="https://img.shields.io/github/languages/code-size/prysya/bulletin-board-api" >
</p>

## Работа с api

К api можно обратиться по адресам:

> `www.api.prysya-news-explorer.tk`
>
> `api.prysya-news-explorer.tk`
>
> `84.201.147.94`

## Установка

Для работы необходим [Docker](https://www.docker.com/).

Склонировать проект

```sh
$ git clone https://github.com/Prysya/bulletin-board-api.git
$ cd bulletin-board-api
```

Запуск локального сервера в контейнере доступного по ссылке http://localhost/

```sh
$ docker-compose up -d
```

## Работа

### Аутентификация

| Метод  | Путь          | Описание                                                              |
| ------ | ------------- | --------------------------------------------------------------------- |
| `POST` | `/api/signup` | Создаёт пользователя с переданными в теле `email`, `password`, `name` |

- **Пример запроса**

```json
{
  "email": "kulagin@netology.ru",
  "password": "ad service",
  "name": "Alex Kulagin",
  "contactPhone": "+7 123 456 78 90"
}
```

- **Пример ответа в случае отсутствия ошибок валидации**

```json
{
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "email": "kulagin@netology.ru",
    "name": "Alex Kulagin",
    "contactPhone": "+7 123 456 78 90"
  },
  "status": "ok"
}
```

- **Пример ответа в случае отсутствия ошибок**

```json
{
  "message": "Сообщение об ошибке",
  "status": "error"
}
```

| Метод  | Путь          | Описание                                                                |
| ------ | ------------- | ----------------------------------------------------------------------- |
| `POST` | `/api/signin` | Проверяет переданные в теле почту и пароль и возвращает `json и cookie` |

- **Пример запроса**

```json
{
  "email": "kulagin@netology.ru",
  "password": "ad service"
}
```

- **Пример ответа в случае отсутствия ошибок валидации**

```json
{
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "email": "kulagin@netology.ru",
    "name": "Alex Kulagin",
    "contantPhone": "+7 123 456 78 90"
  },
  "status": "ok"
}
```

- **Пример ответа в случае ошибки аутентификации**

```json
{
  "message": "Неправильная почта или пароль",
  "status": "error"
}
```

### Просмотр объявлений

| Метод | Путь                  | Описание                                 |
| ----- | --------------------- | ---------------------------------------- |
| `GET` | `/api/advertisements` | Возвращает массив объявлений или ошибку. |

- **Пример ответа**

```json
{
  "data": [
    {
      "id": "507f1f77bcf86cd799439012",
      "shortTitle": "Продам слона",
      "description": "kulagin@netology.ru",
      "images": [
        "/uploads/507f1f77bcf86cd799439011/slon_v_profil.jpg",
        "/uploads/507f1f77bcf86cd799439011/slon_v_fas.jpg",
        "/uploads/507f1f77bcf86cd799439011/slon_hobot.jpg"
      ],
      "user": {
        "id": "507f1f77bcf86cd799439011",
        "name": "Alex Kulagin"
      },
      "createdAt": "2020-12-12T10:00:00.000Z"
    }
  ],
  "status": "ok"
}
```

| Метод | Путь                      | Описание                                |
| ----- | ------------------------- | --------------------------------------- |
| `GET` | `/api/advertisements/:id` | Возвращает объявление по id или ошибку. |

- **Пример ответа**

```json
{
  "data": {
    "id": "507f1f77bcf86cd799439012",
    "shortTitle": "Продам слона",
    "description": "kulagin@netology.ru",
    "images": [
      "/uploads/507f1f77bcf86cd799439011/slon_v_profil.jpg",
      "/uploads/507f1f77bcf86cd799439011/slon_v_fas.jpg",
      "/uploads/507f1f77bcf86cd799439011/slon_hobot.jpg"
    ],
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "Alex Kulagin"
    },
    "createdAt": "2020-12-12T10:00:00.000Z"
  },
  "status": "ok"
}
```

### Управление объявлениями (необходима аутентификация)

| Метод  | Путь                  | Описание                                         |
| ------ | --------------------- | ------------------------------------------------ |
| `POST` | `/api/advertisements` | Создать обьявление, возвращает `json` или ошибку |

Формат данных при отправке `FormData`. Пример запроса:

| Поле        |   Тип    | Обязательное |
| ----------- | :------: | :----------: |
| shortTitle  | `string` |      да      |
| description | `string` |     нет      |
| images      | `File[]` |     нет      |

- **Пример ответа для не аутентифицированного пользователя**

```json
{
  "message": "Необходима аутентификация",
  "status": "error"
}
```

- **Пример ответа для аутентифицированного пользователя**

```json
{
  "data": [
    {
      "id": "507f1f77bcf86cd799439012",
      "shortTitle": "Продам слона",
      "description": "kulagin@netology.ru",
      "images": [
        "/uploads/507f1f77bcf86cd799439011/slon_v_profil.jpg",
        "/uploads/507f1f77bcf86cd799439011/slon_v_fas.jpg",
        "/uploads/507f1f77bcf86cd799439011/slon_hobot.jpg"
      ],
      "user": {
        "id": "507f1f77bcf86cd799439011",
        "name": "Alex Kulagin"
      },
      "createdAt": "2020-12-12T10:00:00.000Z"
    }
  ],
  "status": "ok"
}
```

| Метод    | Путь                      | Описание           |
| -------- | ------------------------- | ------------------ |
| `DELETE` | `/api/advertisements/:id` | Удалить объявление |

- **Пример ответа если пользователь не аутентифицирован и пытается удалить объявление**

```json
{
  "message": "Необходима аутентификация",
  "status": "error"
}
```

- **Пример ответа если пользователь аутентифицирован, но не является автором объявления**

```json
{
  "message": "Недостаточно прав для выполнения операции",
  "status": "error"
}
```

- **Пример ответа для авторизованного пользователя в случае отстуствия ошибок**

```json
{
  "message": "Объявление успешно удалено",
  "status": "ok"
}
```

### Общение (Socket.IO)

#### События отправляемые через `socket` с клиента

|    Событие    |  Передаваемые даные  | Описание                      |
| :-----------: | :------------------: | ----------------------------- |
| `sendMessage` | `{ receiver, text }` | Отправить сообщение на сервер |

| Поле     | Тип      | Описание       |
| -------- | -------- | -------------- |
| receiver | `string` | id собеседника |
| text     | `string` | Тело сообщения |

---

|   Событие    | Передаваемые даные | Описание                   |
| :----------: | :----------------: | -------------------------- |
| `getHistory` |     `receiver`     | Получить историю сообщений |

| Поле     | Тип      | Описание       |
| -------- | -------- | -------------- |
| receiver | `string` | id собеседника |

#### События отправляемые через `socket` клитенту

|   Событие    |               Передаваемые даные                | Описание                    |
| :----------: | :---------------------------------------------: |-----------------------------|
| `newMessage` | `{ _id, author, sentAt, sentAt, text, readAt }` | Отправить сообщение клиенту |

|  Поле  |    Тип     |         Описание         |
| :----: | :--------: | :----------------------: |
|  \_id  | `ObjectId` |       id сообщения       |
| author | `ObjectId` |        id автора         |
| sentAt |   `Date`   | Дата отправки сообщения  |
|  text  |  `string`  |     Текст сообщения      |
| readAt |   `Date`   | Дата прочтения сообщения |

---

|    Событие    |                Передаваемые даные                 | Описание                   |
| :-----------: |:-------------------------------------------------:|----------------------------|
| `chatHistory` | `[{ _id, author, sentAt, sentAt, text, readAt }]` | Отправить массив сообщений |

## Логгирование

В проекта настроено логгирование с помощью библиотеки [winston](https://www.npmjs.com/package/winston) и [express-winston](https://www.npmjs.com/package/express-winston)

Все логи сохраняются в папке `./logs` в `.json` формате

| Название файла | Описание                                             |
| -------------- | ---------------------------------------------------- |
| `request.log`  | Хранит информацию о всех запросах к API              |
| `error.log`    | Хранит информацию об ошибках, которые возвращало API |
