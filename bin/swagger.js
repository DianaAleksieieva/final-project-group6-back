const description = {
  login: 'Логин пользователя',
  password: 'Пароль пользователя',
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
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZTQzNTg4MGU1MTY3YzVkNjJhMzdlNCIsImlhdCI6MTY0MjM0NTg2OSwiZXhwIjoxNjQyMzQ5NDY5fQ.kZLpCKFCp8rdrp9FetFM0QQOTpuVkhnqpTB0_2NqiX4',
  email: 'test@email.com',
  userName: 'Иванов Иван Иванович',
  response200VerificationSuccessful: {
    message: 'Verification successful',
  },
  response200VerificationSend: {
    message: 'Verification email sent',
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
  response404UserNotFound: {
    message: 'User not found',
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
  email: {
    name: 'email',
    description: description.login,
    in: 'formData',
    required: true,
    type: 'string',
  },
  password: {
    name: 'password',
    description: description.password,
    in: 'formData',
    required: true,
    type: 'string',
  },
};

const swagger = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Kapusta-API',
      version: '1.0.0',
      description: 'A sample API',
    },
    paths: {
      '/api/auth/register': {
        get: {
          description: 'Регистрация нового пользователя',
          tags: ['Auth'],
          produces: ['application/json'],
          parameters: [params.email, params.password],
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
          parameters: [params.email, params.password],
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
      '/api/auth/verify/:emailToken': {
        get: {
          description: 'Верификация нового логина',
          tags: ['Auth'],
          produces: ['application/json'],
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
