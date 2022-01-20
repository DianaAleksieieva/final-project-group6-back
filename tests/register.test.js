function checkSuccess(data, status, inputMAil) {
  expect(data.token).not.toBeNull();
  expect(data.user).toStrictEqual({ email: inputMAil });
  expect(status).toBe(201);
}
import registrationTest from '../middlewares/tests/registrationTest.js';

describe('Test register controller function', () => {
  //EMAIL
  test('1.1 email - пустой', async () => {
    expect(() => registrationTest('', '1234aB', '')).rejects.toThrow(
      '"email" is not allowed to be empty',
    );
  });
  test('1.2 email - очень короткий', async () => {
    expect(() => registrationTest('as', '1234aB', '')).rejects.toThrow(
      '"email" must be a valid email',
    );
  });
  test('1.3 email - очень длинный', async () => {
    expect(() =>
      registrationTest(
        'thisIsVerylong@email.inOurSoStressAndHopeless.World123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890',
        '1234aB',
        '',
      ),
    ).rejects.toThrow('"email" must be a valid email');
  });
  test('1.4 email - без знака "@"', async () => {
    expect(() =>
      registrationTest('invalid.email.test', '1234aB', ''),
    ).rejects.toThrow('"email" must be a valid email');
  });
  test('1.5 email - без домена', async () => {
    expect(() =>
      registrationTest('invalid@email', '1234aB', ''),
    ).rejects.toThrow('"email" must be a valid email');
  });
  test('1.6 email - без домена и сервера', async () => {
    expect(() => registrationTest('invalid@', '1234aB', '')).rejects.toThrow(
      '"email" must be a valid email',
    );
  });
  test('1.7 email - с пробелом', async () => {
    expect(() =>
      registrationTest('invalid@e mail.test', '1234aB', ''),
    ).rejects.toThrow('"email" must be a valid email');
  });
  test('1.8 email - дубль с разным регистром', async () => {
    registrationTest('someWORDS@email.test', '1234aB', '');
    expect(() =>
      registrationTest('somewords@email.test', '1234aB', ''),
    ).rejects.toThrow('Email in use');
  });

  //PASSWORD
  test('2.1 password - пустой', async () => {
    expect(() => registrationTest('valid@email.test', '', '')).rejects.toThrow(
      '"password" is not allowed to be empty',
    );
  });
  test('2.2 password - короче 6 символов', async () => {
    expect(() =>
      registrationTest('invalid5@email.test', '123aB', ''),
    ).rejects.toThrow('"password" length must be at least 6 characters long');
  });
  test('2.3 password - длина 6 символов', async () => {
    const inputMAil = 'valid6@email.test';
    const { data, status } = await registrationTest(inputMAil, '1234aB', '');
    checkSuccess(data, status, inputMAil);
  });
  test('2.4 password - длина 10 символов', async () => {
    const inputMAil = 'valid10@email.test';
    const { data, status } = await registrationTest(
      inputMAil,
      '1234aB7890',
      '',
    );
    checkSuccess(data, status, inputMAil);
  });
  test('2.5 password - длина > 10 ', async () => {
    // expect(() =>
    //   registrationTest('valid@email.test', '123456789aB', ''),
    // ).rejects.toThrow(
    //   '"password" length must be less than or equal to 10 characters long',
    // );
    const inputMAil = 'valid11@email.test';
    const { data, status } = await registrationTest(
      inputMAil,
      '123456789aB',
      '',
    );
    checkSuccess(data, status, inputMAil);
  });
  test('2.6 password - состоит из цифр', async () => {
    // expect(() =>
    //   registrationTest('digit@email.test', '1234567', ''),
    // ).rejects.toThrow(
    //   '"password" length must be less than or equal to 10 characters long',
    // );
    const inputMAil = 'valid12@email.test';
    const { data, status } = await registrationTest(inputMAil, '1234567', '');
    checkSuccess(data, status, inputMAil);
  });
  test('2.7 password - состоит из букв', async () => {
    // expect(() =>
    //   registrationTest('digit@email.test', '1234567', ''),
    // ).rejects.toThrow(
    //   '"password" length must be less than or equal to 10 characters long',
    // );
    const inputMAil = 'valid13@email.test';
    const { data, status } = await registrationTest(inputMAil, 'abcDEFG', '');
    checkSuccess(data, status, inputMAil);
  });
  test('2.8 password - состоит из прописных букв>', async () => {
    // expect(() =>
    //   registrationTest('digit@email.test', '1234567', ''),
    // ).rejects.toThrow(
    //   '"password" length must be less than or equal to 10 characters long',
    // );
    const inputMAil = 'valid14@email.test';
    const { data, status } = await registrationTest(inputMAil, 'abcdefg', '');
    checkSuccess(data, status, inputMAil);
  });
  test('2.9 password - состоит из ЗАГЛАВНЫХ букв>', async () => {
    // expect(() =>
    //   registrationTest('digit@email.test', '1234567', ''),
    // ).rejects.toThrow(
    //   '"password" length must be less than or equal to 10 characters long',
    // );
    const inputMAil = 'valid15@email.test';
    const { data, status } = await registrationTest(inputMAil, 'ABCDEFG', '');
    checkSuccess(data, status, inputMAil);
  });
// TOKEN
  test('3.1 signup - регистрация с токеном', async () => {
    expect(
      () =>
        registrationTest(
          'valid16@email.test',
          '1234aB',
          'someValueOrValidToken',
        ),
      // ).rejects.toThrow('Email in use');
    ).rejects.toThrow('Please logout');
  });
// SIGNUP
  test('3.2 signup - логин существует', async () => {
    expect(() =>
      registrationTest('valid10@email.test', '1234aB', ''),
    ).rejects.toThrow('Email in use');
  });
  test('3.3 signup - удачная регистрация', async () => {
    const inputMAil = 'correct@email.test';
    const { data, status } = await registrationTest(inputMAil, '1234aB', '');
    checkSuccess(data, status, inputMAil);
  });
});
