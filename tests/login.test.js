import { connect, clearDatabase, closeDatabase } from '../bin/dbMongoMemory.js';

beforeAll(async () => await connect());
// afterEach(async () => await clearDatabase())
afterAll(async () => await closeDatabase());

function checkSuccess(data, status, inputMail) {
  expect(data.token).not.toBeNull();
  expect(data.refreshToken).not.toBeNull();
  expect(data.user._id).not.toBeNull();
  expect(data.user.email).toStrictEqual(inputMail);
  expect(data.user.userName).toStrictEqual(inputName);
  expect(status).toBe(200);
}
import loginTest from '../middlewares/tests/loginTest.js';
import registrationTest from '../middlewares/tests/registrationTest.js';

const userName = 'Kapusta';

describe('Test login controller function', () => {
  //EMAIL
  test('1.1 email - пустой', async () => {
    await expect(() => loginTest('', '1234aB', '')).rejects.toThrow(
      'ValidationError: "email" is not allowed to be empty',
    );
  });

  test('1.2 email - очень короткий', async () => {
    await expect(() => loginTest('as', '1234aB', '')).rejects.toThrow(
      '"email" must be a valid email',
    );
  });

  test('1.3 email - очень длинный', async () => {
    await expect(() =>
      loginTest(
        'email13@eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZTA5ZGM5MDk5MjdjYTMxMDViMzJiNCIsImlhdCI6MTY0Mjg3ODE0OCwiZXhwIjoxNjQyODc5MDQ4fQ.9mVXUlOs8aprh-6eqOUTjNdnnDeGpln6k90bLAHNF6I',
        '1234aB',
        '',
      ),
    ).rejects.toThrow('"email" must be a valid email');
  });

  test('1.4 email - без знака "@"', async () => {
    await expect(() =>
      loginTest('email14.email.test', '1234aB', ''),
    ).rejects.toThrow('"email" must be a valid email');
  });

  test('1.5 email - без домена', async () => {
    await expect(() =>
      loginTest('invalid@email', '1234aB', ''),
    ).rejects.toThrow('"email" must be a valid email');
  });

  test('1.6 email - без домена и сервера', async () => {
    await expect(() => loginTest('invalid@', '1234aB', '')).rejects.toThrow(
      '"email" must be a valid email',
    );
  });

  test('1.7 email - с пробелом', async () => {
    await expect(() =>
      loginTest('invalid@e mail.test', '1234aB', ''),
    ).rejects.toThrow('"email" must be a valid email');
  });

  //PASSWORD
  test('2.1 password - пустой', async () => {
    await expect(() => loginTest('valid@email.test', '', '')).rejects.toThrow(
      '"password" is not allowed to be empty',
    );
  });

  test('2.2 password - короче 6 символов', async () => {
    await expect(() =>
      loginTest('invalid5@email.test', '123aB', ''),
    ).rejects.toThrow('"password" length must be at least 6 characters long');
  });

  // test('2.3 password - длина 6 символов', async () => {
  //   jest.setTimeout(7000);
  //   const inputMail = 'valid6@email.test';
  //   await registrationTest(inputMail, '1234aB', '');
  //   const { data, status } = await loginTest(inputMail, '1234aB', '');
  //   checkSuccess(data, status, inputMail);
  // });

  //   test('2.4 password - длина 10 символов', async () => {
  //     const inputMail = 'valid10@email.test';
  //     const { data, status } = await loginTest(
  //       inputMail,
  //       '1234aB7890',
  //       '',
  //       userName,
  //     );
  //     checkSuccess(data, status, inputMail);
  //   });

  //   test('2.5 password - длина > 10 ', async () => {
  //     await expect(() =>
  //       loginTest('valid@email.test', '123456789aB', ''),
  //     ).rejects.toThrow(
  //       '"password" length must be less than or equal to 10 characters long',
  //     );
  //   });

  //   test('2.6 password - состоит из цифр', async () => {
  //     const inputMail = 'valid12@email.test';
  //     const { data, status } = await loginTest(
  //       inputMail,
  //       '1234567',
  //       '',
  //       userName,
  //     );
  //     checkSuccess(data, status, inputMail);
  //   });

  //   test('2.7 password - состоит из букв', async () => {
  //     const inputMail = 'valid13@email.test';
  //     const { data, status } = await loginTest(
  //       inputMail,
  //       'abcDEFG',
  //       '',
  //       userName,
  //     );
  //     checkSuccess(data, status, inputMail);
  //   });

  //   test('2.8 password - состоит из прописных букв>', async () => {
  //     const inputMail = 'valid14@email.test';
  //     const { data, status } = await loginTest(
  //       inputMail,
  //       'abcdefg',
  //       '',
  //       userName,
  //     );
  //     checkSuccess(data, status, inputMail);
  //   });
  //   test('2.9 password - состоит из ЗАГЛАВНЫХ букв>', async () => {
  //     const inputMail = 'valid15@email.test';
  //     const { data, status } = await loginTest(
  //       inputMail,
  //       'ABCDEFG',
  //       '',
  //       userName,
  //     );
  //     checkSuccess(data, status, inputMail);
  //   });

  //   // SIGNUP
  //   test('3.1 signup - регистрация с токеном', async () => {
  //     await expect(
  //       () =>
  //         loginTest(
  //           'valid16@email.test',
  //           '1234aB',
  //           'someValueOrValidToken',
  //           userName,
  //         ),
  //       // ).rejects.toThrow('Email in use');
  //     ).rejects.toThrow('Please logout');
  //   });

  //   test('3.2 signup - логин существует', async () => {
  //     await expect(() =>
  //       loginTest('valid10@email.test', '1234aB', ''),
  //     ).rejects.toThrow('Email in use');
  //   });

  //   test('3.3 signup - удачная регистрация без имени пользователя', async () => {
  //     const inputMail = 'valid16@email.test';
  //     const { data, status } = await loginTest(inputMail, '1234aB', '');
  //     checkSuccess(data, status, inputMail);
  //   });

  //   test('3.4 signup - удачная регистрация', async () => {
  //     const inputMail = 'correct@email.test';
  //     const { data, status } = await loginTest(inputMail, '1234aB', '');
  //     checkSuccess(data, status, inputMail);
  //   });
});

// // ValidationError: "userName" must be a string
