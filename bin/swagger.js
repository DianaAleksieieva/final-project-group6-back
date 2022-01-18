const description = {
  emailToken: 'Токен для верификации email',
  authorization: 'JWT Токен для авторизации',
  bodyRegistration: 'Тело запроса на регистрацию пользователя',
  password: 'Пароль пользователя',
  currentBalance: 'Текущий баланс',
  type: 'Тип транзакции доход(income) или расход(expense)',
  date: 'Дата транзакции',
  category: 'Категория транзакции',
  amount: 'Значение транзакции',
  id: 'id',
  request200: 'ОК - [Запрос соответствует всем критериями]',
  request201: 'Created - [Запрос соответствует всем критериями]',
  request400: 'Bad Request - [Поисковый запрос содержит неверные даные]',
  request401: 'Unauthorized - [Запрос выдал ошибку авторизации]',
  request404: 'Not Found - [Поисковый запрос не дал результатов]',
  request409: 'Conflict - [Запрос выдал конфликт]',
};

const examples = {
  userID: {
    $oid: '61e09dc909927ca3105b32b4',
  },
  transactionID: {
    $oid: '61e45142008a3b98cdbfd355',
  },
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZTZkM2U3NmNhY2MwMTVkNzYyODQyMyIsImlhdCI6MTY0MjUxNzQ3OX0.poPWJlV3qZHa1NMLDkSLfxfaI9bEqk_yWfZzowgJBgU',
  email: 'test@email.com',
  userName: 'Иванов Иван Иванович',
  type: 'income',
  date: '21.09.2021',
  category: 'salary',
  amount: 25000,
  month: 9,
  year: 2021,
  sum: 205014,
  response200VerificationSuccessful: {
    message: 'Verification successful',
  },
  response200VerificationSend: {
    message: 'Verification email sent',
  },
  response200currentBalance: {
    currentBalance: 1000,
  },
  response200transactionDeleted: {
    message: 'Transaction deleted',
  },
  response400validator: {
    message: '<Ошибка от Joi или другой библиотеки валидации>',
  },
  response200avatarSuccess: {
    avatarURL: 'тут будет ссылка на изображение',
  },
  response401wrongLoginPassword: {
    message: 'Email or password is wrong',
  },
  response404NotFound: {
    message: 'Not found',
  },
  response404UserNotFound: {
    message: 'User not found',
  },
  response404TransactionNotFound: {
    message: 'Transaction not found',
  },
  response409EmailInUse: {
    message: 'Email in use',
  },
  response409VerificationPassed: {
    message: 'Verification has already been passed',
  },
  response401unautorized: {
    message: 'Not authorized',
  },
};

const params = {
  emailToken: {
    name: 'emailToken',
    description: description.emailToken,
    in: 'path',
    required: true,
    type: 'string',
    schema: {
      type: 'string',
      examples: 'loC--iEY_hm3AmzoeBZpt',
    },
  },

  authorization: {
    name: 'authorization',
    description: description.authorization,
    in: 'header',
    required: true,
    type: 'http',
    schema: 'bearer',
    bearerFormat: 'JWT',
  },
  password: {
    in: 'body',
    // in: 'body',
    name: 'password',
    description: description.password,
    required: true,
    type: 'string',
  },
  currentBalance: {
    name: 'currentBalance',
    description: description.currentBalance,
    in: 'formData',
    required: true,
    type: 'number',
  },
  currentBalanceInBody: {
    in: 'body',
    name: 'currentBalance',
    description: description.currentBalance,
    in: 'formData',
    required: true,
    type: 'number',
  },
  type: {
    name: 'type',
    description: description.type,
    in: 'formData',
    required: true,
    type: 'string',
    enum: ['income', 'expense'],
  },
  typeInBody: {
    in: 'body',
    name: 'type',
    description: description.type,
    in: 'formData',
    required: true,
    type: 'string',
    enum: ['income', 'expense'],
  },
  dateInBody: {
    in: 'body',
    name: 'date',
    description: description.date,
    in: 'formData',
    required: true,
    type: 'date',
  },
  categoryInBody: {
    in: 'body',
    name: 'category',
    description: description.category,
    in: 'formData',
    required: true,
    type: String,
    enum: [
      'transport',
      'goods',
      'health',
      'alco',
      'fun',
      'house',
      'tech',
      'utilities',
      'sport',
      'education',
      'other',
      'salary',
      'freelance',
    ],
  },
  amount: {
    in: 'body',
    name: 'amount',
    description: description.amount,
    in: 'formData',
    required: true,
    type: 'number',
  },
  id: {
    name: 'id',
    description: description.id,
    in: 'formData',
    required: true,
    type: 'string',
  },

  idInBody: {
    in: 'body',
    name: 'id',
    description: description.id,
    in: 'formData',
    required: true,
    type: 'string',
  },
};

const reqBodys = {
  mailPasswordBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              example: '@mail.com',
            },
            password: {
              type: 'string',
              example: '',
            },
          },
        },
      },
    },
  },
};

const swagger = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Kapusta-API',
      version: '2.0.1',
      description: 'https://pedantic-engelbart-4b98e1.netlify.app/',
    },
    consumes: ['application/json', 'multipart/form-data'],
    produsces: ['application/json'],
    servers: [
      { url: 'http://localhost:4321' },
      { url: 'https://final-project-group6-back.herokuapp.com/' },
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
      '/api/auth/current': {
        get: {
          summary: 'Выход пользователя',
          tags: ['Auth'],
          security: { bearerAuth: [] },
          produces: ['application/json'],
          responses: {
            200: {
              description: description.request200,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      user: {
                        type: 'object',
                        properties: {
                          _id: {
                            type: 'object',
                            example: examples.userID,
                          },
                          email: {
                            type: 'string',
                            example: examples.email,
                          },
                          userName: {
                            type: 'string',
                            example: examples.userName,
                          },
                        },
                      },
                      token: {
                        type: 'string',
                        example: examples.token,
                      },
                    },
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
                    example: examples.response401unautorized,
                  },
                },
              },
            },
          },
        },
      },
      '/api/auth/avatar': {
        patch: {
          summary: 'Отправка новой картинки для смены Аватара',
          tags: ['Auth'],
          security: { bearerAuth: [] },
          produces: ['multipart/form-data'],
          requestBody: {
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
                    example: examples.response200avatarSuccess,
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
                    example: examples.response401unautorized,
                  },
                },
              },
            },
          },
        },
      },
      '/api/transactions/balance': {
        put: {
          summary: 'Обновление значения баланса',
          tags: ['Transactions'],
          security: { bearerAuth: [] },
          parameters: [params.currentBalance],
          produces: ['application/json'],
          responses: {
            200: {
              description: description.request200,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    example: examples.response200currentBalance,
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
                    example: examples.response401unautorized,
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
                    example: examples.response400validator,
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
          security: { bearerAuth: [] },
          parameters: [
            params.type,
            params.date,
            params.category,
            params.amount,
          ],
          produces: ['application/json'],
          responses: {
            200: {
              description: description.request200,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      transaction: {
                        type: 'object',
                        properties: {
                          _id: {
                            type: 'object',
                            example: examples.transactionID,
                          },
                          owner: {
                            type: 'object',
                            properties: {
                              _id: {
                                type: 'object',
                                example: examples.userID,
                              },
                              email: {
                                type: 'string',
                                example: examples.email,
                              },
                              userName: {
                                type: 'string',
                                example: examples.userName,
                              },
                            },
                          },
                          type: {
                            type: 'string',
                            example: examples.type,
                          },
                          date: {
                            type: 'date',
                            example: examples.date,
                          },
                          category: {
                            type: 'string',
                            example: examples.category,
                          },
                          amount: {
                            type: 'number',
                            example: examples.amount,
                          },
                          month: {
                            type: 'number',
                            example: examples.month,
                          },
                          year: {
                            type: 'number',
                            example: examples.year,
                          },
                        },
                      },
                    },
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
                    example: examples.response401unautorized,
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
                    example: examples.response400validator,
                  },
                },
              },
            },
          },
        },
      },
      '/api/transactions/{id}': {
        delete: {
          summary: 'Удаление транзакции',
          tags: ['Transactions'],
          security: { bearerAuth: [] },
          parameters: [params.id],
          produces: ['application/json'],
          responses: {
            200: {
              description: description.request200,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    example: examples.response200transactionDeleted,
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
                    example: examples.response400validator,
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
                    example: examples.response401unautorized,
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
                    example: examples.response404NotFound,
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
            'DEV:) Совершает {count} циклов добавления транзакций за {month} месяц {year} года',
          tags: ['Transactions'],
          security: { bearerAuth: [] },
          produces: ['application/json'],
          responses: {
            200: {
              description: description.request200,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      transactionCounter: {
                        type: 'number',
                        example: 57,
                      },
                    },
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
                    example: examples.response401unautorized,
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
                    example: examples.response400validator,
                  },
                },
              },
            },
          },
        },
      },
      '/api/transactions/get/{year}': {
        get: {
          summary: 'Сбор информации за год по транзакциях доходов или расходов',
          tags: ['Transactions'],
          security: { bearerAuth: [] },
          parameters: [params.type],
          produces: ['application/json'],
          responses: {
            200: {
              description: description.request200,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      type: {
                        type: 'string',
                        example: examples.type,
                      },
                      year: {
                        type: 'string',
                        example: examples.year,
                      },
                      sum: {
                        type: 'string',
                        example: examples.sum,
                      },
                      result: {
                        type: 'object',
                        properties: {
                          1: {
                            type: 'string',
                            example: 16685,
                          },
                          2: {
                            type: 'string',
                            example: 16097,
                          },
                          3: {
                            type: 'string',
                            example: 18022,
                          },
                          4: {
                            type: 'string',
                            example: 18772,
                          },
                          5: {
                            type: 'string',
                            example: 15973,
                          },
                          6: {
                            type: 'string',
                            example: 16348,
                          },
                          7: {
                            type: 'string',
                            example: 22405,
                          },
                          8: {
                            type: 'string',
                            example: 17361,
                          },
                          9: {
                            type: 'string',
                            example: 15741,
                          },
                          10: {
                            type: 'string',
                            example: 17289,
                          },
                          11: {
                            type: 'string',
                            example: 13398,
                          },
                          12: {
                            type: 'string',
                            example: 16923,
                          },
                        },
                      },
                    },
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
                    example: examples.response401unautorized,
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
                    example: examples.response400validator,
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
                    example: examples.response404NotFound,
                  },
                },
              },
            },
          },
        },
      },
      '/api/transactions/get/{year}/{month}': {
        get: {
          summary:
            'Сбор информации за месяц по транзакциях доходов или расходов',
          tags: ['Transactions'],
          security: { bearerAuth: [] },
          parameters: [params.type],
          produces: ['application/json'],
          responses: {
            200: {
              description: description.request200,
              content: {
                'application/json': {
                  schema: {
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
                      month: {
                        type: 'number',
                        example: examples.month,
                      },
                      total: {
                        type: 'number',
                        example: 54,
                      },
                      sum: {
                        type: 'number',
                        example: 15741,
                      },
                      categories: {
                        type: 'object',
                        example: {
                          goods: {
                            sum: 5326,
                            count: 16,
                            descriptions: {
                              Салаты: 832,
                              Свинина: 336,
                              Хлеб: 706,
                              Выпечка: 433,
                              Овощи: 431,
                              Пельмени: 406,
                              Крупы: 294,
                              Сыр: 240,
                              Молоко: 138,
                              Зелень: 458,
                              Криветки: 466,
                              Макароны: 586,
                            },
                          },
                          alco: {
                            sum: 1431,
                            count: 5,
                            descriptions: {
                              Пиво: 390,
                              Водка: 48,
                              'Пиво с водкой': 993,
                            },
                          },
                          health: {
                            sum: 1221,
                            count: 4,
                            descriptions: {
                              Уколы: 767,
                              Лекарства: 454,
                            },
                          },
                          house: {
                            sum: 2085,
                            count: 5,
                            descriptions: {
                              Сантехника: 120,
                              Клининг: 898,
                              Ремонт: 1067,
                            },
                          },
                          utilities: {
                            sum: 1777,
                            count: 5,
                            descriptions: {
                              Вода: 444,
                              Свет: 1006,
                              Газ: 327,
                            },
                          },
                          fun: {
                            sum: 374,
                            count: 4,
                            descriptions: {
                              Пивариум: 225,
                              Библиотека: 77,
                              Кинотеатр: 72,
                            },
                          },
                          sport: {
                            sum: 797,
                            count: 3,
                            descriptions: {
                              Шахматы: 133,
                              Теннис: 664,
                            },
                          },
                          education: {
                            sum: 1144,
                            count: 2,
                            descriptions: {
                              Курсы: 1144,
                            },
                          },
                          other: {
                            sum: 310,
                            count: 4,
                            descriptions: {
                              'Выкуп с ломбарда': 206,
                              Кража: 24,
                              'Возврат кредита': 80,
                            },
                          },
                          tech: {
                            sum: 1180,
                            count: 5,
                            descriptions: {
                              Телефон: 226,
                              Болгарка: 631,
                              Велосипед: 323,
                            },
                          },
                          transport: {
                            sum: 96,
                            count: 1,
                            descriptions: {
                              Такси: 96,
                            },
                          },
                        },
                      },
                      transactions: {
                        type: 'array',
                        example: [
                          {
                            _id: '61e618a9a4fd75592726384b',
                            date: '2021-09-10T08:54:00.000Z',
                            description: 'Салаты',
                            category: 'goods',
                            amount: 415,
                          },
                          {
                            _id: '61e618a9a4fd75592726384d',
                            date: '2021-09-09T08:47:00.000Z',
                            description: 'Пиво',
                            category: 'alco',
                            amount: 162,
                          },
                          {
                            _id: '61e618a9a4fd755927263849',
                            date: '2021-09-21T09:56:00.000Z',
                            description: 'Свинина',
                            category: 'goods',
                            amount: 336,
                          },
                          {
                            _id: '61e618a9a4fd75592726384a',
                            date: '2021-09-25T12:52:00.000Z',
                            description: 'Хлеб',
                            category: 'goods',
                            amount: 112,
                          },
                        ],
                      },
                    },
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
                    example: examples.response401unautorized,
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
                    example: examples.response400validator,
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
                    example: examples.response404NotFound,
                  },
                },
              },
            },
          },
        },
      },
      '/api/transactions/category/{year}/{month}': {
        get: {
          summary: 'Сбор информации за месяц по категориях',
          tags: ['Transactions'],
          security: { bearerAuth: [] },
          parameters: [params.category],
          produces: ['application/json'],
          responses: {
            200: {
              description: description.request200,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      year: {
                        type: 'string',
                        example: examples.year,
                      },
                      month: {
                        type: 'string',
                        example: examples.month,
                      },
                      total: {
                        type: 'string',
                        example: 16,
                      },
                      sum: {
                        type: 'string',
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
              },
            },
            401: {
              description: description.request401,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    example: examples.response401unautorized,
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
                    example: examples.response400validator,
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
                    example: examples.response404NotFound,
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
            properties: {
              email: {
                type: 'string',
                example: '@mail.com',
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
                    type: 'object',
                    example: examples.userID,
                  },
                  email: {
                    type: 'string',
                    example: examples.email,
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
            properties: {
              email: {
                type: 'string',
                example: '@mail.com',
              },
              password: {
                type: 'string',
                example: '',
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
              user: {
                type: 'object',
                properties: {
                  _id: {
                    type: 'object',
                    example: examples.userID,
                  },
                  email: {
                    type: 'string',
                    example: examples.email,
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
