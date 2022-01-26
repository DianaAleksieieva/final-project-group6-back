/* eslint-disable no-undef */
import { connect, closeDatabase } from '../bin/dbMongoMemory.js';
beforeAll(async () => await connect());
afterAll(async () => await closeDatabase());

function checkSuccess(data, status, inputMail, inputName = 'Unnamed') {
  expect(data.token).not.toBeNull();
  expect(data.user.email).toStrictEqual(inputMail);
  expect(data.user.userName).toStrictEqual(inputName);
  expect(data.user._id).not.toBeNull();
  expect(status).toBe(201);
}
import registrationTest from '../middlewares/tests/registrationTest.js';

const userName = 'Kapusta';

describe('Test register controller function', () => {
  //EMAIL
  test('1.1 email - пустой', async () => {
    await expect(() => registrationTest('', '1234aB', '')).rejects.toThrow(
      'ValidationError: "email" is not allowed to be empty',
    );
  });

  test('1.2 email - очень короткий', async () => {
    await expect(() => registrationTest('as', '1234aB', '')).rejects.toThrow(
      '"email" must be a valid email',
    );
  });

  test('1.3 email - очень длинный', async () => {
    await expect(() =>
      registrationTest(
        'thisIsVerylong@email.inOurSoStressAndHopeless.World123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890',
        '1234aB',
        '',
      ),
    ).rejects.toThrow('"email" must be a valid email');
  });

  test('1.4 email - без знака "@"', async () => {
    await expect(() =>
      registrationTest('email14.email.test', '1234aB', ''),
    ).rejects.toThrow('"email" must be a valid email');
  });

  test('1.5 email - без домена', async () => {
    await expect(() =>
      registrationTest('email15@email', '1234aB', ''),
    ).rejects.toThrow('"email" must be a valid email');
  });

  test('1.6 email - без домена и сервера', async () => {
    await expect(() =>
      registrationTest('email16@', '1234aB', ''),
    ).rejects.toThrow('"email" must be a valid email');
  });

  test('1.7 email - с пробелом', async () => {
    await expect(() =>
      registrationTest('email17@e mail.test', '1234aB', ''),
    ).rejects.toThrow('"email" must be a valid email');
  });

  test('1.8 email - дубль с разным регистром', async () => {
    await registrationTest('email18@email.test', '1234aB', '');
    await expect(() =>
      registrationTest('Email18@email.test', '1234aB', ''),
    ).rejects.toThrow('Email in use');
  });

  //PASSWORD
  test('2.1 password - пустой', async () => {
    await expect(() =>
      registrationTest('email21@email.test', '', ''),
    ).rejects.toThrow('"password" is not allowed to be empty');
  });

  test('2.2 password - короче 6 символов', async () => {
    await expect(() =>
      registrationTest('email22@email.test', '123aB', ''),
    ).rejects.toThrow('"password" length must be at least 6 characters long');
  });

  test('2.3 password - длина 6 символов', async () => {
    const inputMail = 'email23@email.test';
    const { data, status } = await registrationTest(
      inputMail,
      '1234aB',
      '',
      userName,
    );
    checkSuccess(data, status, inputMail, userName);
  });

  test('2.4 password - длина 10 символов', async () => {
    const inputMail = 'email24@email.test';
    const { data, status } = await registrationTest(
      inputMail,
      '1234aB7890',
      '',
      userName,
    );
    checkSuccess(data, status, inputMail, userName);
  });

  test('2.5 password - длина > 10 ', async () => {
    await expect(() =>
      registrationTest('email25@email.test', '123456789aB', '', userName),
    ).rejects.toThrow(
      '"password" length must be less than or equal to 10 characters long',
    );
  });

  test('2.6 password - состоит из цифр', async () => {
    const inputMail = 'email26@email.test';
    const { data, status } = await registrationTest(
      inputMail,
      '1234567',
      '',
      userName,
    );
    checkSuccess(data, status, inputMail, userName);
  });

  test('2.7 password - состоит из букв', async () => {
    const inputMail = 'email27@email.test';
    const { data, status } = await registrationTest(
      inputMail,
      'abcDEFG',
      '',
      userName,
    );
    checkSuccess(data, status, inputMail, userName);
  });

  test('2.8 password - состоит из прописных букв>', async () => {
    const inputMail = 'email28@email.test';
    const { data, status } = await registrationTest(
      inputMail,
      'abcdefg',
      '',
      userName,
    );
    checkSuccess(data, status, inputMail, userName);
  });
  test('2.9 password - состоит из ЗАГЛАВНЫХ букв>', async () => {
    const inputMail = 'email29@email.test';
    const { data, status } = await registrationTest(
      inputMail,
      'ABCDEFG',
      '',
      userName,
    );
    checkSuccess(data, status, inputMail, userName);
  });

  // SIGNUP
  test('3.1 signup - регистрация с токеном', async () => {
    await expect(
      () =>
        registrationTest(
          'email31@email.test',
          '1234aB',
          'someValueOrValidToken',
          userName,
        ),
      // ).rejects.toThrow('Email in use');
    ).rejects.toThrow('Please logout');
  });

  test('3.2 signup - логин существует', async () => {
    await expect(() =>
      registrationTest('email29@email.test', '1234aB', '', userName),
    ).rejects.toThrow('Email in use');
  });

  test('3.3 signup - удачная регистрация без имени пользователя', async () => {
    const inputMail = 'email33@email.test';
    const { data, status } = await registrationTest(inputMail, '1234aB', '');
    checkSuccess(data, status, inputMail);
  });

  test('3.4 signup - удачная регистрация c именем пользователя', async () => {
    const inputMail = 'email34@email.test';
    const { data, status } = await registrationTest(
      inputMail,
      '1234aB',
      '',
      userName,
    );
    checkSuccess(data, status, inputMail, userName);
  });

  test('4.1 userName - имя пользователя из цифр', async () => {
    await expect(
      () => registrationTest('email41@email.test', '1234aB', '', 453),
      // ).rejects.toThrow('Email in use');
    ).rejects.toThrow('ValidationError: "userName" must be a string');
  });
  test('4.2 userName - длина короче 3 символов', async () => {
    await expect(
      () => registrationTest('email42@email.test', '1234aB', '', 'ab'),
      // ).rejects.toThrow('Email in use');
    ).rejects.toThrow(
      'ValidationError: "userName" length must be at least 3 characters long',
    );
  });
  test('4.3 userName - длина 3 символа', async () => {
    const inputMail = 'email43@email.test';
    const { data, status } = await registrationTest(
      inputMail,
      '1234aB',
      '',
      'two',
    );
    checkSuccess(data, status, inputMail, 'two');
  });
  test('4.4 userName - имя пользователя из цифр', async () => {
    await expect(
      () => registrationTest('valid18@email.test', '1234aB', '', 453),
      // ).rejects.toThrow('Email in use');
    ).rejects.toThrow('ValidationError: "userName" must be a string');
  });
});
