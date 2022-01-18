const description = {
  emailToken: 'Токен для верификации email',
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
  mailPasswordNameBody: {
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
            userName: {
              type: 'string',
              example: '',
            },
          },
        },
      },
    },
  },
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
      version: '1.0.0',
      description: 'https://final-project-group6-back.herokuapp.com/',
    },
    paths: {
      '/api/auth/register': {
        post: {
          description: 'Регистрация нового пользователя',
          tags: ['Auth'],
          produces: ['application/json'],
          requestBody: reqBodys.mailPasswordNameBody,
          responses: {
            201: {
              description: description.request201,
              content: {
                'application/json': {
                  schema: {
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
            409: {
              description: description.request409,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    example: examples.response409EmailInUse,
                  },
                },
              },
            },
          },
        },
      },
      '/api/auth/login': {
        post: {
          description: 'Авторизация нового пользователя',
          tags: ['Auth'],
          produces: ['application/json'],
          requestBody: reqBodys.mailPasswordBody,
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
                    example: examples.response401wrongLoginPassword,
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
                    example: {
                      message: 'Email in use',
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/auth/verify/{emailToken}': {
        //
        get: {
          description: 'Верификация нового логина',
          tags: ['Auth'],
          produces: ['application/json'],
          parameters: [params.emailToken],
          responses: {
            200: {
              description: description.request200,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    example: examples.response200VerificationSuccessful,
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
                    example: examples.response404UserNotFound,
                  },
                },
              },
            },
          },
        },
      },
      '/api/auth/resend': {
        get: {
          description: 'Повторная отправка письма верификации на почту',
          tags: ['Auth'],
          produces: ['application/json'],
          parameters: [params.email],
          responses: {
            200: {
              description: description.request200,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    example: examples.response200VerificationSend,
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
            409: {
              description: description.request409,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    example: examples.response409VerificationPassed,
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
                    example: examples.response404UserNotFound,
                  },
                },
              },
            },
          },
        },
      },
      '/api/auth/logout': {
        post: {
          description: 'Выход пользователя',
          tags: ['Auth'],
          security: { bearerAuth: [] },
          produces: ['application/json'],
          responses: {
            204: {
              description: description.request200,
              content: null,
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
      '/api/auth/current': {
        get: {
          description: 'Выход пользователя',
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
          description: 'Отправка новой картинки для смены Аватара',
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
          description: 'Обновление значения баланса',
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
          description: 'Добавление транзакции доход или расход',
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
      '/api/transactions/:id': {
        delete: {
          description: 'Удаление транзакции',
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
      '/api/transactions/set/:year/:month/:count': {
        put: {
          description:
            'DEV:) Совершает :COUNT циклов добавления транзакций за :MONTH месяц :YEAR года',
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
      '/api/transactions/get/:year': {
        get: {
          description:
            'Сбор информации за год по транзакциях доходов или расходов',
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
      '/api/transactions/get/:year/:month': {
        get: {
          description:
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
                          {
                            _id: '61e618a9a4fd75592726384c',
                            date: '2021-09-09T15:03:00.000Z',
                            description: 'Уколы',
                            category: 'health',
                            amount: 455,
                          },
                          {
                            _id: '61e618a9a4fd755927263851',
                            date: '2021-09-23T19:20:00.000Z',
                            description: 'Сантехника',
                            category: 'house',
                            amount: 120,
                          },
                          {
                            _id: '61e618a9a4fd75592726384e',
                            date: '2021-09-02T13:50:00.000Z',
                            description: 'Водка',
                            category: 'alco',
                            amount: 48,
                          },
                          {
                            _id: '61e618a9a4fd755927263853',
                            date: '2021-09-19T15:46:00.000Z',
                            description: 'Вода',
                            category: 'utilities',
                            amount: 444,
                          },
                          {
                            _id: '61e618a9a4fd755927263852',
                            date: '2021-09-27T12:40:00.000Z',
                            description: 'Клининг',
                            category: 'house',
                            amount: 418,
                          },
                          {
                            _id: '61e618a9a4fd75592726384f',
                            date: '2021-09-12T11:36:00.000Z',
                            description: 'Пиво с водкой',
                            category: 'alco',
                            amount: 466,
                          },
                          {
                            _id: '61e618a9a4fd755927263850',
                            date: '2021-09-09T18:42:00.000Z',
                            description: 'Пивариум',
                            category: 'fun',
                            amount: 43,
                          },
                          {
                            _id: '61e618a9a4fd755927263854',
                            date: '2021-09-07T16:30:00.000Z',
                            description: 'Шахматы',
                            category: 'sport',
                            amount: 133,
                          },
                          {
                            _id: '61e618a9a4fd755927263855',
                            date: '2021-09-03T14:13:00.000Z',
                            description: 'Курсы',
                            category: 'education',
                            amount: 580,
                          },
                          {
                            _id: '61e618a9a4fd755927263856',
                            date: '2021-09-30T15:54:00.000Z',
                            description: 'Выкуп с ломбарда',
                            category: 'other',
                            amount: 24,
                          },
                          {
                            _id: '61e618a9a4fd75592726385a',
                            date: '2021-09-01T08:41:00.000Z',
                            description: 'Выпечка',
                            category: 'goods',
                            amount: 324,
                          },
                          {
                            _id: '61e618a9a4fd755927263857',
                            date: '2021-09-07T12:17:00.000Z',
                            description: 'Кража',
                            category: 'other',
                            amount: 24,
                          },
                          {
                            _id: '61e618a9a4fd755927263859',
                            date: '2021-09-24T16:09:00.000Z',
                            description: 'Овощи',
                            category: 'goods',
                            amount: 431,
                          },
                          {
                            _id: '61e618a9a4fd755927263858',
                            date: '2021-09-16T08:26:00.000Z',
                            description: 'Пельмени',
                            category: 'goods',
                            amount: 406,
                          },
                          {
                            _id: '61e618a9a4fd75592726385d',
                            date: '2021-09-16T16:39:00.000Z',
                            description: 'Библиотека',
                            category: 'fun',
                            amount: 77,
                          },
                          {
                            _id: '61e618a9a4fd75592726385e',
                            date: '2021-09-02T18:07:00.000Z',
                            description: 'Клининг',
                            category: 'house',
                            amount: 480,
                          },
                          {
                            _id: '61e618a9a4fd75592726385c',
                            date: '2021-09-05T11:54:00.000Z',
                            description: 'Лекарства',
                            category: 'health',
                            amount: 233,
                          },
                          {
                            _id: '61e618a9a4fd75592726385f',
                            date: '2021-09-25T12:21:00.000Z',
                            description: 'Свет',
                            category: 'utilities',
                            amount: 390,
                          },
                          {
                            _id: '61e618a9a4fd75592726385b',
                            date: '2021-09-23T13:08:00.000Z',
                            description: 'Салаты',
                            category: 'goods',
                            amount: 136,
                          },
                          {
                            _id: '61e618a9a4fd755927263863',
                            date: '2021-09-05T13:39:00.000Z',
                            description: 'Крупы',
                            category: 'goods',
                            amount: 294,
                          },
                          {
                            _id: '61e618a9a4fd755927263862',
                            date: '2021-09-29T14:35:00.000Z',
                            description: 'Возврат кредита',
                            category: 'other',
                            amount: 80,
                          },
                          {
                            _id: '61e618a9a4fd755927263865',
                            date: '2021-09-05T13:40:00.000Z',
                            description: 'Лекарства',
                            category: 'health',
                            amount: 221,
                          },
                          {
                            _id: '61e618a9a4fd755927263860',
                            date: '2021-09-23T18:02:00.000Z',
                            description: 'Газ',
                            category: 'utilities',
                            amount: 327,
                          },
                          {
                            _id: '61e618a9a4fd755927263861',
                            date: '2021-09-16T12:12:00.000Z',
                            description: 'Теннис',
                            category: 'sport',
                            amount: 172,
                          },
                          {
                            _id: '61e618a9a4fd755927263864',
                            date: '2021-09-24T16:59:00.000Z',
                            description: 'Салаты',
                            category: 'goods',
                            amount: 281,
                          },
                          {
                            _id: '61e618a9a4fd755927263869',
                            date: '2021-09-26T09:12:00.000Z',
                            description: 'Телефон',
                            category: 'tech',
                            amount: 40,
                          },
                          {
                            _id: '61e618a9a4fd75592726386b',
                            date: '2021-09-05T10:08:00.000Z',
                            description: 'Такси',
                            category: 'transport',
                            amount: 96,
                          },
                          {
                            _id: '61e618a9a4fd755927263868',
                            date: '2021-09-10T08:56:00.000Z',
                            description: 'Болгарка',
                            category: 'tech',
                            amount: 514,
                          },
                          {
                            _id: '61e618a9a4fd75592726386d',
                            date: '2021-09-09T20:01:00.000Z',
                            description: 'Сыр',
                            category: 'goods',
                            amount: 240,
                          },
                          {
                            _id: '61e618a9a4fd755927263867',
                            date: '2021-09-20T16:26:00.000Z',
                            description: 'Пивариум',
                            category: 'fun',
                            amount: 182,
                          },
                          {
                            _id: '61e618a9a4fd75592726386e',
                            date: '2021-09-26T17:57:00.000Z',
                            description: 'Молоко',
                            category: 'goods',
                            amount: 138,
                          },
                          {
                            _id: '61e618a9a4fd75592726386f',
                            date: '2021-09-08T18:14:00.000Z',
                            description: 'Зелень',
                            category: 'goods',
                            amount: 458,
                          },
                          {
                            _id: '61e618a9a4fd75592726386a',
                            date: '2021-09-05T20:20:00.000Z',
                            description: 'Велосипед',
                            category: 'tech',
                            amount: 323,
                          },
                          {
                            _id: '61e618a9a4fd755927263870',
                            date: '2021-09-30T12:19:00.000Z',
                            description: 'Криветки',
                            category: 'goods',
                            amount: 466,
                          },
                          {
                            _id: '61e618a9a4fd75592726386c',
                            date: '2021-09-26T20:33:00.000Z',
                            description: 'Хлеб',
                            category: 'goods',
                            amount: 594,
                          },
                          {
                            _id: '61e618a9a4fd755927263872',
                            date: '2021-09-20T10:36:00.000Z',
                            description: 'Пиво',
                            category: 'alco',
                            amount: 228,
                          },
                          {
                            _id: '61e618a9a4fd755927263871',
                            date: '2021-09-08T19:58:00.000Z',
                            description: 'Выпечка',
                            category: 'goods',
                            amount: 109,
                          },
                          {
                            _id: '61e618a9a4fd755927263875',
                            date: '2021-09-10T16:46:00.000Z',
                            description: 'Свет',
                            category: 'utilities',
                            amount: 276,
                          },
                          {
                            _id: '61e618a9a4fd755927263874',
                            date: '2021-09-13T10:31:00.000Z',
                            description: 'Телефон',
                            category: 'tech',
                            amount: 186,
                          },
                          {
                            _id: '61e618a9a4fd755927263873',
                            date: '2021-09-08T09:21:00.000Z',
                            description: 'Ремонт',
                            category: 'house',
                            amount: 534,
                          },
                          {
                            _id: '61e618a9a4fd755927263876',
                            date: '2021-09-23T20:21:00.000Z',
                            description: 'Макароны',
                            category: 'goods',
                            amount: 586,
                          },
                          {
                            _id: '61e618a9a4fd755927263877',
                            date: '2021-09-12T08:48:00.000Z',
                            description: 'Уколы',
                            category: 'health',
                            amount: 312,
                          },
                          {
                            _id: '61e618a9a4fd755927263879',
                            date: '2021-09-09T12:11:00.000Z',
                            description: 'Ремонт',
                            category: 'house',
                            amount: 533,
                          },
                          {
                            _id: '61e618a9a4fd755927263878',
                            date: '2021-09-14T16:14:00.000Z',
                            description: 'Пиво с водкой',
                            category: 'alco',
                            amount: 527,
                          },
                          {
                            _id: '61e618a9a4fd75592726387a',
                            date: '2021-09-10T14:03:00.000Z',
                            description: 'Болгарка',
                            category: 'tech',
                            amount: 117,
                          },
                          {
                            _id: '61e618a9a4fd75592726387d',
                            date: '2021-09-16T09:15:00.000Z',
                            description: 'Курсы',
                            category: 'education',
                            amount: 564,
                          },
                          {
                            _id: '61e618a9a4fd75592726387e',
                            date: '2021-09-20T11:46:00.000Z',
                            description: 'Выкуп с ломбарда',
                            category: 'other',
                            amount: 182,
                          },
                          {
                            _id: '61e618a9a4fd755927263866',
                            date: '2021-09-23T20:12:00.000Z',
                            description: 'Кинотеатр',
                            category: 'fun',
                            amount: 72,
                          },
                          {
                            _id: '61e618a9a4fd75592726387b',
                            date: '2021-09-26T08:47:00.000Z',
                            description: 'Свет',
                            category: 'utilities',
                            amount: 340,
                          },
                          {
                            _id: '61e618a9a4fd75592726387c',
                            date: '2021-09-11T08:08:00.000Z',
                            description: 'Теннис',
                            category: 'sport',
                            amount: 492,
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
      '/api/transactions/category/:year/:month': {
        get: {
          description: 'Сбор информации за месяц по категориях',
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
                          {
                            _id: '61e618a9a4fd755927263858',
                            type: 'expense',
                            date: '2021-09-16T08:26:00.000Z',
                            description: 'Пельмени',
                            category: 'goods',
                            amount: 406,
                          },
                          {
                            _id: '61e618a9a4fd75592726385b',
                            type: 'expense',
                            date: '2021-09-23T13:08:00.000Z',
                            description: 'Салаты',
                            category: 'goods',
                            amount: 136,
                          },
                          {
                            _id: '61e618a9a4fd755927263863',
                            type: 'expense',
                            date: '2021-09-05T13:39:00.000Z',
                            description: 'Крупы',
                            category: 'goods',
                            amount: 294,
                          },
                          {
                            _id: '61e618a9a4fd755927263864',
                            type: 'expense',
                            date: '2021-09-24T16:59:00.000Z',
                            description: 'Салаты',
                            category: 'goods',
                            amount: 281,
                          },
                          {
                            _id: '61e618a9a4fd75592726386d',
                            type: 'expense',
                            date: '2021-09-09T20:01:00.000Z',
                            description: 'Сыр',
                            category: 'goods',
                            amount: 240,
                          },
                          {
                            _id: '61e618a9a4fd75592726386e',
                            type: 'expense',
                            date: '2021-09-26T17:57:00.000Z',
                            description: 'Молоко',
                            category: 'goods',
                            amount: 138,
                          },
                          {
                            _id: '61e618a9a4fd75592726386f',
                            type: 'expense',
                            date: '2021-09-08T18:14:00.000Z',
                            description: 'Зелень',
                            category: 'goods',
                            amount: 458,
                          },
                          {
                            _id: '61e618a9a4fd755927263870',
                            type: 'expense',
                            date: '2021-09-30T12:19:00.000Z',
                            description: 'Криветки',
                            category: 'goods',
                            amount: 466,
                          },
                          {
                            _id: '61e618a9a4fd75592726386c',
                            type: 'expense',
                            date: '2021-09-26T20:33:00.000Z',
                            description: 'Хлеб',
                            category: 'goods',
                            amount: 594,
                          },
                          {
                            _id: '61e618a9a4fd755927263871',
                            type: 'expense',
                            date: '2021-09-08T19:58:00.000Z',
                            description: 'Выпечка',
                            category: 'goods',
                            amount: 109,
                          },
                          {
                            _id: '61e618a9a4fd755927263876',
                            type: 'expense',
                            date: '2021-09-23T20:21:00.000Z',
                            description: 'Макароны',
                            category: 'goods',
                            amount: 586,
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
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      shemas: {
        BadRequest: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: '<Ошибка от Joi или другой библиотеки валидации>',
            },
          },
        },
      },
    },
    tags: [
      {
        name: 'Auth',
        description:
          'API ПОЛЬЗОВАТЕЛЯ. Отвечает за вход, выход, регистрацию и авторизацию пользователя',
      },
      {
        name: 'Transactions',
        description:
          'API ТРАНЗАКЦИЙ. Отвечает за все запросы связаные с транзакциями',
      },
    ],
  },
  apis: ['./src/routes*.js'], // files containing annotations as above
};

export default swagger;
