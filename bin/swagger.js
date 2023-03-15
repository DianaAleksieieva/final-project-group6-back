const getCurrentYear = () => new Date().getFullYear();

const description = {
  emailToken: 'Токен для верификации email',
  refreshToken: 'Токен для обновления токена',
  type: 'Тип транзакции доход(income) или расход(expense)',
  category: 'Категория транзакции',
  id: 'id',
  request200: 'ОК - [Запрос соответствует всем критериями]',
  request201: 'Created - [Запрос соответствует всем критериями]',
  request400: 'Bad Request - [Поисковый запрос содержит неверные даные]',
  request401: 'Unauthorized - [Запрос выдал ошибку авторизации]',
  request404: 'Not Found - [Поисковый запрос не дал результатов]',
  request409: 'Conflict - [Запрос выдал конфликт]',
};

const examples = {
  userID: '61e09dc909927ca3105b32b4',
  transactionID: '61e45142008a3b98cdbfd355',
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZTZkM2U3NmNhY2MwMTVkNzYyODQyMyIsImlhdCI6MTY0MjUxNzQ3OX0.poPWJlV3qZHa1NMLDkSLfxfaI9bEqk_yWfZzowgJBgU',
  refreshToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZTA5ZGM5MDk5MjdjYTMxMDViMzJiNCIsImlhdCI6MTY0MjYzNzAyNywiZXhwIjoxNjQyNjQwNjI3fQ.fAdmQGHqTDx5XX3z7lZ2J5Bi1F2fI3mJbEg-iYWT2JI',
  userName: 'Иванов Иван Иванович',
  avatarUrl: 'https://cdn.tvc.ru/pictures/o/246/533.jpg',
  type: 'income',
  month: 9,
  year: getCurrentYear() - 1,
  sum: 205014,
};

const swagger = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Kapusta-API',
      version: '2.0.2',
      description: 'https://pedantic-engelbart-4b98e1.netlify.app/',
    },
    consumes: ['application/json', 'multipart/form-data'],
    produsces: ['application/json'],
    servers: [
      { url: 'http://localhost:4321' },
      { url: 'https://kapusta-project-aleksa.onrender.com/' },
    ],
    tags: [
      {
        name: 'Auth',
        description:
          'API ПОЛЬЗОВАТЕЛЯ. Отвечает за вход, выход, регистрацию и авторизацию пользователя',
      },
      {
        name: 'User',
        description:
          'API ТРАНЗАКЦИЙ. Отвечает за все запросы связаные с пользователем',
      },
      {
        name: 'Transactions',
        description:
          'API ТРАНЗАКЦИЙ. Отвечает за все запросы связаные с транзакциями',
      },
    ],
    host: 'final-project-group6-back.herokuapp.com',
    schemes: ['http', 'https'],
    securityDefinitions: {
      Bearer: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
      },
    },
    paths: {
      '/api/auth/register': {
        post: {
          summary: 'Регистрация нового пользователя',
          tags: ['Auth'],
          requestBody: {
            description: 'Тело запроса регистрации',
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  $ref: '#/components/schemes/Register/Request',
                },
              },
            },
          },
          responses: {
            201: {
              description: description.request201,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    $ref: '#/components/schemes/Register/Response201',
                  },
                },
              },
            },
            400: {
              description: description.request400,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    $ref: '#/components/schemes/Response400Joi',
                  },
                },
              },
            },
            400: {
              description: description.request400,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    $ref: '#/components/schemes/Response400logout',
                  },
                },
              },
            },
            409: {
              description: description.request409,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    $ref: '#/components/schemes/Response409EmailInUse',
                  },
                },
              },
            },
          },
        },
      },
      '/api/auth/login': {
        post: {
          summary: 'Авторизация нового пользователя',
          tags: ['Auth'],
          requestBody: {
            description: 'Тело запроса авторизации',
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  $ref: '#/components/schemes/Login/Request',
                },
              },
            },
          },
          responses: {
            200: {
              description: description.request200,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    $ref: '#/components/schemes/Login/Response200',
                  },
                },
              },
            },
            400: {
              description: description.request400,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    $ref: '#/components/schemes/Response400Joi',
                  },
                },
              },
            },
            401: {
              description: description.request401,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    $ref: '#/components/schemes/Response401wrongLoginPassword',
                  },
                },
              },
            },
            409: {
              description:
                'Conflict - [Логин пользователя уже зарегистрирован]',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    $ref: '#/components/schemes/Response409EmailInUse',
                  },
                },
              },
            },
          },
        },
      },

      '/api/auth/verify/{emailToken}': {
        get: {
          summary: 'Верификация нового email',
          tags: ['Auth'],
          parameters: [
            {
              name: 'emailToken',
              description: description.emailToken,
              in: 'path',
              required: true,
              type: 'string',
              schema: {
                type: 'string',
              },
            },
          ],
          responses: {
            200: {
              description: description.request200,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    $ref: '#/components/schemes/EmailToken/Response200',
                  },
                },
              },
            },
            400: {
              description: description.request400,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    $ref: '#/components/schemes/Response400Joi',
                  },
                },
              },
            },
            404: {
              description: description.request404,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    $ref: '#/components/schemes/Response404UserNotFound',
                  },
                },
              },
            },
          },
        },
      },
      '/api/auth/logout': {
        post: {
          summary: 'Выход пользователя',
          tags: ['Auth'],
          security: [{ Bearer: [] }],
          responses: {
            204: {
              description: description.request200,
              content: {},
            },
            401: {
              description: description.request401,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    $ref: '#/components/schemes/Response401unautorized',
                  },
                },
              },
            },
          },
        },
      },
      '/api/user/current': {
        get: {
          summary: 'Получение информации о текушем пользователе',
          tags: ['User'],
          security: [{ Bearer: [] }],
          responses: {
            200: {
              description: description.request200,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    $ref: '#/components/schemes/СurrentUser/Response200',
                  },
                },
              },
            },
            401: {
              description: description.request401,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    $ref: '#/components/schemes/Response401unautorized',
                  },
                },
              },
            },
          },
        },
      },
      '/api/user/token/refresh/': {
        get: {
          summary: 'Обновление токена',
          tags: ['User'],
          security: [{ Bearer: [] }],
          responses: {
            200: {
              description: description.request200,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    $ref: '#/components/schemes/RefreshToken/Response200',
                  },
                },
              },
            },
            400: {
              description: description.request400,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    $ref: '#/components/schemes/Response400Joi',
                  },
                },
              },
            },
            404: {
              description: description.request404,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    $ref: '#/components/schemes/Response404NotFound',
                  },
                },
              },
            },
          },
        },
      },
      '/api/user/avatar': {
        patch: {
          summary: 'Отправка новой картинки для смены Аватара',
          tags: ['User'],
          security: [{ Bearer: [] }],
          produces: ['multipart/form-data'],
          requestBody: {
            description: 'Тело отправки картинки',
            required: true,
            content: {
              'image/png': {
                schema: {
                  type: 'string',
                  format: 'binary',
                },
              },
              'image/jpeg': {
                schema: {
                  type: 'string',
                  format: 'binary',
                },
              },
            },
          },
          responses: {
            200: {
              description: description.request200,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    $ref: '#/components/schemes/UserAvatar/Response200',
                  },
                },
              },
            },
            401: {
              description: description.request401,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    $ref: '#/components/schemes/Response401unautorized',
                  },
                },
              },
            },
          },
        },
      },
      '/api/user/balance': {
        put: {
          summary: 'Обновление значения баланса',
          tags: ['User'],
          security: [{ Bearer: [] }],
          requestBody: {
            description: 'Тело запроса обновления баланса пользователя',
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  $ref: '#/components/schemes/UserBalance/Request',
                },
              },
            },
          },
          responses: {
            200: {
              description: description.request200,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    $ref: '#/components/schemes/UserBalance/Response200',
                  },
                },
              },
            },
            400: {
              description: description.request400,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    $ref: '#/components/schemes/Response400Joi',
                  },
                },
              },
            },
            401: {
              description: description.request401,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    $ref: '#/components/schemes/Response401unautorized',
                  },
                },
              },
            },
          },
        },
      },
      '/api/transactions/add': {
        post: {
          summary: 'Добавление транзакции доход или расход',
          tags: ['Transactions'],
          security: [{ Bearer: [] }],
          requestBody: {
            description: 'Тело запроса обновления баланса пользователя',
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  $ref: '#/components/schemes/AddTransaction/Request',
                },
              },
            },
          },
          responses: {
            200: {
              description: description.request200,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    $ref: '#/components/schemes/AddTransaction/Response200',
                  },
                },
              },
            },
            400: {
              description: description.request400,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    $ref: '#/components/schemes/Response400Joi',
                  },
                },
              },
            },
            401: {
              description: description.request401,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    $ref: '#/components/schemes/Response401unautorized',
                  },
                },
              },
            },
          },
        },
      },
      '/api/transactions/delete/{id}': {
        delete: {
          summary: 'Удаление транзакции',
          tags: ['Transactions'],
          security: [{ Bearer: [] }],
          parameters: [
            {
              name: 'id',
              description: description.id,
              in: 'path',
              required: true,
              type: 'string',
              schema: {
                type: 'string',
              },
            },
          ],
          responses: {
            200: {
              description: description.request200,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    $ref: '#/components/schemes/RemoveTransaction/Response200',
                  },
                },
              },
            },
            400: {
              description: description.request400,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    $ref: '#/components/schemes/Response400Joi',
                  },
                },
              },
            },
            401: {
              description: description.request401,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    $ref: '#/components/schemes/Response401unautorized',
                  },
                },
              },
            },
            404: {
              description: description.request404,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    $ref: '#/components/schemes/Response404UserNotFound',
                  },
                },
              },
            },
          },
        },
      },
      '/api/transactions/set/{year}/{month}/{count}': {
        put: {
          summary:
            '!!для DEV!!. Совершает {count} циклов добавления транзакций за {month} месяц {year} года',
          tags: ['Transactions'],
          security: [{ Bearer: [] }],
          parameters: [
            {
              name: 'count',
              description: 'количество циклов',
              in: 'path',
              required: true,
              type: 'number',
              schema: {
                type: 'number',
              },
            },
            {
              name: 'year',
              description: 'Год выписки транзакций',
              in: 'path',
              required: true,
              type: 'number',
              schema: {
                type: 'number',
              },
            },
            {
              name: 'month',
              description: 'Месяц выписки транзакций',
              in: 'path',
              required: true,
              type: 'number',
              schema: {
                type: 'number',
              },
            },
          ],
          responses: {
            200: {
              description: description.request200,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      TotalAddedTransactions: {
                        type: 'number',
                        example: 57,
                      },
                    },
                  },
                },
              },
            },
            400: {
              description: description.request400,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    $ref: '#/components/schemes/Response400Joi',
                  },
                },
              },
            },
            401: {
              description: description.request401,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    $ref: '#/components/schemes/Response401unautorized',
                  },
                },
              },
            },
          },
        },
      },
      '/api/transactions/getByType/{type}/{year}': {
        get: {
          summary: 'Сбор информации за год по транзакциях доходов или расходов',
          tags: ['Transactions'],
          security: [{ Bearer: [] }],
          parameters: [
            {
              name: 'type',
              description: description.type,
              in: 'path',
              required: true,
              type: 'string',
              schema: {
                type: 'string',
                example: 'income',
              },
            },
            {
              name: 'year',
              description: description.year,
              in: 'path',
              required: true,
              type: 'number',
              schema: {
                type: 'number',
                example: getCurrentYear(),
              },
            },
          ],
          responses: {
            200: {
              description: description.request200,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    $ref: '#/components/schemes/GetYearTransactions/Response200',
                  },
                },
              },
            },
            400: {
              description: description.request400,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    $ref: '#/components/schemes/Response400Joi',
                  },
                },
              },
            },
            401: {
              description: description.request401,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    $ref: '#/components/schemes/Response401unautorized',
                  },
                },
              },
            },
            404: {
              description: description.request404,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    $ref: '#/components/schemes/Response404NotFound',
                  },
                },
              },
            },
          },
        },
      },
      '/api/transactions/getByType/{type}/{year}/{month}': {
        get: {
          summary:
            'Сбор информации за месяц по транзакциях доходов или расходов',
          tags: ['Transactions'],
          security: [{ Bearer: [] }],
          parameters: [
            {
              name: 'type',
              description: description.type,
              in: 'path',
              required: true,
              type: 'string',
              schema: {
                type: 'string',
                example: 'income',
              },
            },
            {
              name: 'year',
              description: description.year,
              in: 'path',
              required: true,
              type: 'number',
              schema: {
                type: 'number',
                example: getCurrentYear() - 1,
              },
            },
            {
              name: 'month',
              description: description.month,
              in: 'path',
              required: true,
              type: 'number',
              schema: {
                type: 'number',
                example: 5,
              },
            },
          ],

          responses: {
            200: {
              description: description.request200,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    $ref: '#/components/schemes/GetMonthTransactions/Response200',
                  },
                },
              },
            },
            400: {
              description: description.request400,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    $ref: '#/components/schemes/Response400Joi',
                  },
                },
              },
            },
            401: {
              description: description.request401,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    $ref: '#/components/schemes/Response401unautorized',
                  },
                },
              },
            },
            404: {
              description: description.request404,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    $ref: '#/components/schemes/Response404NotFound',
                  },
                },
              },
            },
          },
        },
      },
      '/api/transactions/getByCategory/{category}/{year}/{month}': {
        get: {
          summary: 'Сбор информации за месяц по одной категории',
          tags: ['Transactions'],
          security: [{ Bearer: [] }],
          parameters: [
            {
              name: 'category',
              description: description.category,
              in: 'path',
              required: true,
              type: 'string',
              schema: {
                type: 'string',
                example: 'goods',
              },
            },
            {
              name: 'year',
              description: description.year,
              in: 'path',
              required: true,
              type: 'number',
              schema: {
                type: 'number',
                example: getCurrentYear() - 1,
              },
            },
            {
              name: 'month',
              description: description.month,
              in: 'path',
              required: true,
              type: 'number',
              schema: {
                type: 'number',
                example: 5,
              },
            },
          ],
          responses: {
            200: {
              description: description.request200,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    $ref: '#/components/schemes/GetMonthCategory/Response200',
                  },
                },
              },
            },
            400: {
              description: description.request400,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    $ref: '#/components/schemes/Response400Joi',
                  },
                },
              },
            },
            401: {
              description: description.request401,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    $ref: '#/components/schemes/Response401unautorized',
                  },
                },
              },
            },
            404: {
              description: description.request404,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    $ref: '#/components/schemes/Response404NotFound',
                  },
                },
              },
            },
          },
        },
      },
    },
    components: {
      securitySchemes: {
        Bearer: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemes: {
        Register: {
          Request: {
            type: 'object',
            required: ['email', 'password'],
            properties: {
              email: {
                type: 'string',
                format: 'email',
              },
              password: {
                type: 'string',
                example: '',
              },
              userName: {
                type: 'string',
                example: '',
              },
            },
          },
          Response201: {
            type: 'object',
            properties: {
              token: {
                type: 'string',
                example: examples.token,
              },
              user: {
                type: 'object',
                properties: {
                  _id: {
                    type: 'string',
                    example: examples.userID,
                  },
                  email: {
                    type: 'string',
                    format: 'email',
                  },
                  userName: {
                    type: 'string',
                    example: examples.userName,
                  },
                },
              },
            },
          },
        },
        Login: {
          Request: {
            type: 'object',
            required: ['email', 'password'],
            properties: {
              email: {
                type: 'string',
                format: 'email',
                example: 'grozny@mail.com',
              },
              password: {
                type: 'string',
                example: '123456',
              },
            },
          },
          Response200: {
            type: 'object',
            properties: {
              token: {
                type: 'string',
                example: examples.token,
              },
              refreshToken: {
                type: 'string',
                example: examples.refreshToken,
              },
              user: {
                type: 'object',
                properties: {
                  _id: {
                    type: 'string',
                    example: examples.userID,
                  },
                  email: {
                    type: 'string',
                    format: 'email',
                  },
                  userName: {
                    type: 'string',
                    example: examples.userName,
                  },
                },
              },
            },
          },
        },
        RefreshToken: {
          Response200: {
            type: 'object',
            properties: {
              token: {
                type: 'string',
                example: examples.token,
              },
              refreshToken: {
                type: 'string',
                example: examples.refreshToken,
              },
              user: {
                type: 'object',
                properties: {
                  _id: {
                    type: 'string',
                    example: examples.userID,
                  },
                  email: {
                    type: 'string',
                    format: 'email',
                  },
                  userName: {
                    type: 'string',
                    example: examples.userName,
                  },
                },
              },
            },
          },
        },
        EmailToken: {
          Response200: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                example: 'Verification successful',
              },
            },
          },
        },
        СurrentUser: {
          Response200: {
            type: 'object',
            properties: {
              _id: {
                type: 'string',
                example: examples.userID,
              },
              email: {
                type: 'string',
                format: 'email',
              },
              userName: {
                type: 'string',
                example: examples.userName,
              },
              avatarUrl: {
                type: 'string',
                example: examples.avatarUrl,
              },
              currentBalance: {
                type: 'number',
                example: 30809,
              },
              startBalance: {
                type: 'number',
                example: 10000,
              },
            },
          },
        },
        UserAvatar: {
          Response200: {
            type: 'object',
            properties: {
              avatarUrl: {
                type: 'string',
                example: 'тут будет ссылка на изображение',
              },
            },
          },
        },
        UserBalance: {
          Request: {
            type: 'object',
            required: ['currentBalance'],
            properties: {
              currentBalance: {
                type: 'number',
                example: '1000',
              },
            },
          },
          Response200: {
            type: 'object',
            properties: {
              startBalanceOld: {
                type: 'string',
                example: 1000,
              },
              startBalance: {
                type: 'string',
                example: 1000,
              },
              currentBalanceOld: {
                type: 'number',
                example: 10000,
              },
              currentBalance: {
                type: 'number',
                example: 1000,
              },
            },
          },
        },
        AddTransaction: {
          Request: {
            type: 'object',
            required: ['type', 'category', 'date', 'amount'],
            properties: {
              type: {
                type: 'string',
                example: 'expense',
              },
              category: {
                type: 'string',
                example: 'tech',
              },
              date: {
                type: 'date',
                example: '2021-05-12T08:35:00.000Z',
              },
              amount: {
                type: 'number',
                example: '35000',
              },
              description: {
                type: 'string',
                example: 'Покупка компьютера',
              },
            },
          },
          Response200: {
            type: 'object',
            properties: {
              transaction: {
                type: 'object',
                properties: {
                  _id: {
                    type: 'string',
                    example: examples.transactionID,
                  },
                  owner: {
                    type: 'string',
                    example: '61e09dc909927ca3105b32b4',
                  },
                  type: {
                    type: 'string',
                    example: 'expense',
                  },
                  date: {
                    type: 'date',
                    example: '2021-05-12T08:35:00.000Z',
                    // format: 'date-time',
                  },
                  description: {
                    type: 'string',
                    example: 'Покупка компьютера',
                  },
                  category: {
                    type: 'string',
                    example: 'tech',
                  },
                  amount: {
                    type: 'number',
                    example: 35000,
                  },
                },
              },
              message: {
                type: 'string',
                example: 'transaction added',
              },
              oldBalance: {
                type: 'number',
                example: 100000,
              },
              currentBalance: {
                type: 'number',
                example: 65000,
              },
            },
          },
        },
        RemoveTransaction: {
          Response200: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                example: 'transaction deleted',
              },
              oldBalance: {
                type: 'number',
                example: 30679,
              },
              currentBalance: {
                type: 'number',
                example: 30809,
              },
              transaction: {
                type: 'object',
                properties: {
                  _id: {
                    type: 'string',
                    example: examples.transactionID,
                  },
                  type: {
                    type: 'string',
                    example: 'expense',
                  },
                  date: {
                    type: 'date',
                    example: '2021-01-26T20:57:00.000Z',
                  },
                  description: {
                    type: 'string',
                    example: 'Макароны',
                  },
                  category: {
                    type: 'string',
                    example: 'goods',
                  },
                  amount: {
                    type: 'number',
                    example: 130,
                  },
                },
              },
              oldBalance: {
                type: 'number',
                example: 100000,
              },
              currentBalance: {
                type: 'number',
                example: 65000,
              },
            },
          },
        },
        GetYearTransactions: {
          Response200: {
            type: 'object',
            properties: {
              type: {
                type: 'string',
                example: examples.type,
              },
              year: {
                type: 'number',
                example: examples.year,
              },
              sum: {
                type: 'number',
                example: examples.sum,
              },
              result: {
                type: 'array',
                properties: {
                  type: 'object',
                  properties: {
                    1: {
                      type: 'number',
                      example: 16685,
                    },
                  },
                  type: 'object',
                  properties: {
                    2: {
                      type: 'number',
                      example: 16097,
                    },
                  },
                  type: 'object',
                  properties: {
                    3: {
                      type: 'number',
                      example: 18022,
                    },
                  },
                  type: 'object',
                  properties: {
                    4: {
                      type: 'number',
                      example: 18772,
                    },
                  },
                  type: 'object',
                  properties: {
                    5: {
                      type: 'number',
                      example: 15973,
                    },
                  },
                  type: 'object',
                  properties: {
                    6: {
                      type: 'number',
                      example: 16348,
                    },
                  },
                  type: 'object',
                  properties: {
                    7: {
                      type: 'number',
                      example: 22405,
                    },
                  },
                  type: 'object',
                  properties: {
                    8: {
                      type: 'number',
                      example: 17361,
                    },
                  },
                  type: 'object',
                  properties: {
                    9: {
                      type: 'number',
                      example: 15741,
                    },
                  },
                  type: 'object',
                  properties: {
                    10: {
                      type: 'number',
                      example: 17289,
                    },
                  },
                  type: 'object',
                  properties: {
                    11: {
                      type: 'number',
                      example: 13398,
                    },
                  },
                  type: 'object',
                  properties: {
                    12: {
                      type: 'number',
                      example: 16923,
                    },
                  },
                },
              },
            },
          },
        },
        GetMonthTransactions: {
          Response200: {
            type: 'object',
            properties: {
              type: { type: 'string', example: 'income' },
              year: { type: 'number', example: getCurrentYear() - 1 },
              month: { type: 'number', example: 5 },
              total: { type: 'number', example: 10 },
              sum: { type: 'number', example: 129824 },
              categories: {
                type: 'object',
                properties: {
                  salary: {
                    type: 'object',
                    properties: {
                      sum: { type: 'number', example: 55000 },
                      count: { type: 'number', example: 2 },
                      descriptions: {
                        type: 'object',
                        example: {
                          'Моя з/п': 40000,
                          'моя з/п': 15000,
                        },
                      },
                    },
                  },
                  freelance: {
                    type: 'object',
                    properties: {
                      sum: { type: 'number', example: 74824 },
                      count: { type: 'number', example: 8 },
                      descriptions: {
                        type: 'object',
                        example: {
                          'Сдача в аренду болгарки': 12201,
                          'Сдача в аренду комнаты': 18797,
                          Реппетиторство: 21657,
                          'Подработка таксистом': 20669,
                          'моя з/п': 1500,
                        },
                      },
                    },
                  },
                },
              },
              transactions: {
                type: 'array',
                example: [
                  {
                    _id: '61e6189ca4fd755927263672',
                    date: '2021-05-05T14:48:00.000Z',
                    description: 'Моя з/п',
                    category: 'salary',
                    amount: 40000,
                  },
                  {
                    _id: '61e6189da4fd7559272636a6',
                    date: '2021-05-25T11:30:00.000Z',
                    description: 'Сдача в аренду болгарки',
                    category: 'freelance',
                    amount: 12201,
                  },
                  {
                    _id: '61e6189da4fd7559272636a3',
                    date: '2021-05-16T08:39:00.000Z',
                    description: 'Сдача в аренду комнаты',
                    category: 'freelance',
                    amount: 12706,
                  },
                  { '...': '...' },
                ],
              },
            },
          },
        },
        GetMonthCategory: {
          Response200: {
            type: 'object',
            properties: {
              year: {
                type: 'number',
                example: examples.year,
              },
              month: {
                type: 'number',
                example: examples.month,
              },
              total: {
                type: 'number',
                example: 16,
              },
              sum: {
                type: 'number',
                example: 5326,
              },
              category: {
                type: 'string',
                example: 'goods',
              },
              description: {
                type: 'object',
                example: {
                  Салаты: {
                    total: 3,
                    sum: 832,
                  },
                  Свинина: {
                    total: 1,
                    sum: 336,
                  },
                  Хлеб: {
                    total: 2,
                    sum: 706,
                  },
                  Выпечка: {
                    total: 2,
                    sum: 433,
                  },
                  Овощи: {
                    total: 1,
                    sum: 431,
                  },
                  Пельмени: {
                    total: 1,
                    sum: 406,
                  },
                  Крупы: {
                    total: 1,
                    sum: 294,
                  },
                  Сыр: {
                    total: 1,
                    sum: 240,
                  },
                  Молоко: {
                    total: 1,
                    sum: 138,
                  },
                  Зелень: {
                    total: 1,
                    sum: 458,
                  },
                  Криветки: {
                    total: 1,
                    sum: 466,
                  },
                  Макароны: {
                    total: 1,
                    sum: 586,
                  },
                },
              },
              transactions: {
                type: 'array',
                example: [
                  {
                    _id: '61e618a9a4fd75592726384b',
                    type: 'expense',
                    date: '2021-09-10T08:54:00.000Z',
                    description: 'Салаты',
                    category: 'goods',
                    amount: 415,
                  },
                  {
                    _id: '61e618a9a4fd755927263849',
                    type: 'expense',
                    date: '2021-09-21T09:56:00.000Z',
                    description: 'Свинина',
                    category: 'goods',
                    amount: 336,
                  },
                  {
                    _id: '61e618a9a4fd75592726384a',
                    type: 'expense',
                    date: '2021-09-25T12:52:00.000Z',
                    description: 'Хлеб',
                    category: 'goods',
                    amount: 112,
                  },
                  {
                    _id: '61e618a9a4fd75592726385a',
                    type: 'expense',
                    date: '2021-09-01T08:41:00.000Z',
                    description: 'Выпечка',
                    category: 'goods',
                    amount: 324,
                  },
                  {
                    _id: '61e618a9a4fd755927263859',
                    type: 'expense',
                    date: '2021-09-24T16:09:00.000Z',
                    description: 'Овощи',
                    category: 'goods',
                    amount: 431,
                  },
                ],
              },
            },
          },
        },
        Response400logout: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'Please logout',
            },
          },
        },
        Response400Joi: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: '<Ошибка от Joi или другой библиотеки валидации>',
            },
          },
        },
        Response401wrongLoginPassword: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'Email or password is wrong',
            },
          },
        },
        Response401unautorized: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'Not authorized',
            },
          },
        },
        Response404UserNotFound: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'User not found',
            },
          },
        },
        Response404NotFound: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'Not found',
            },
          },
        },
        Response409EmailInUse: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'Email in use',
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes*.js'], // files containing annotations as above
};

export default swagger;
