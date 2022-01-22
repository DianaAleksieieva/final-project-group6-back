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
      registrationTest('invalid.email.test', '1234aB', ''),
    ).rejects.toThrow('"email" must be a valid email');
  });

  test('1.5 email - без домена', async () => {
    await expect(() =>
      registrationTest('invalid@email', '1234aB', ''),
    ).rejects.toThrow('"email" must be a valid email');
  });

  test('1.6 email - без домена и сервера', async () => {
    await expect(() =>
      registrationTest('invalid@', '1234aB', ''),
    ).rejects.toThrow('"email" must be a valid email');
  });

  test('1.7 email - с пробелом', async () => {
    await expect(() =>
      registrationTest('invalid@e mail.test', '1234aB', ''),
    ).rejects.toThrow('"email" must be a valid email');
  });

  test('1.8 email - дубль с разным регистром', async () => {
    await registrationTest('someWORDS@email.test', '1234aB', '');
    await expect(() =>
      registrationTest('somewords@email.test', '1234aB', ''),
    ).rejects.toThrow('Email in use');
  });

  //PASSWORD
  test('2.1 password - пустой', async () => {
    await expect(() =>
      registrationTest('valid@email.test', '', ''),
    ).rejects.toThrow('"password" is not allowed to be empty');
  });

  test('2.2 password - короче 6 символов', async () => {
    await expect(() =>
      registrationTest('invalid5@email.test', '123aB', ''),
    ).rejects.toThrow('"password" length must be at least 6 characters long');
  });

  test('2.3 password - длина 6 символов', async () => {
    const inputMail = 'valid6@email.test';
    const { data, status } = await registrationTest(
      inputMail,
      '1234aB',
      '',
      userName,
    );
    checkSuccess(data, status, inputMail, userName);
  });

  test('2.4 password - длина 10 символов', async () => {
    const inputMail = 'valid10@email.test';
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
      registrationTest('valid@email.test', '123456789aB', '', userName),
    ).rejects.toThrow(
      '"password" length must be less than or equal to 10 characters long',
    );
  });

  test('2.6 password - состоит из цифр', async () => {
    const inputMail = 'valid12@email.test';
    const { data, status } = await registrationTest(
      inputMail,
      '1234567',
      '',
      userName,
    );
    checkSuccess(data, status, inputMail, userName);
  });

  test('2.7 password - состоит из букв', async () => {
    const inputMail = 'valid13@email.test';
    const { data, status } = await registrationTest(
      inputMail,
      'abcDEFG',
      '',
      userName,
    );
    checkSuccess(data, status, inputMail, userName);
  });

  test('2.8 password - состоит из прописных букв>', async () => {
    const inputMail = 'valid14@email.test';
    const { data, status } = await registrationTest(
      inputMail,
      'abcdefg',
      '',
      userName,
    );
    checkSuccess(data, status, inputMail, userName);
  });
  test('2.9 password - состоит из ЗАГЛАВНЫХ букв>', async () => {
    const inputMail = 'valid15@email.test';
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
          'valid16@email.test',
          '1234aB',
          'someValueOrValidToken', 
          userName,
        ),
      // ).rejects.toThrow('Email in use');
    ).rejects.toThrow('Please logout');
  });

  test('3.2 signup - логин существует', async () => {
    await expect(() =>
      registrationTest('valid10@email.test', '1234aB', '', userName),
    ).rejects.toThrow('Email in use');
  });

    test('3.3 signup - удачная регистрация без имени пользователя', async () => {
      const inputMail = 'valid16@email.test';
      const { data, status } = await registrationTest(inputMail, '1234aB', '');
      checkSuccess(data, status, inputMail);
    });

    test('3.4 signup - удачная регистрация', async () => {
      const inputMail = 'correct@email.test';
      const { data, status } = await registrationTest(inputMail, '1234aB', '', userName);
      checkSuccess(data, status, inputMail, userName);
    });
});

// ValidationError: "userName" must be a string
