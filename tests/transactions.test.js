/* eslint-disable no-undef */
import { connect, closeDatabase } from '../bin/dbMongoMemory.js';

beforeAll(async () => await connect());
afterAll(async () => await closeDatabase());

function checkSuccessRegistration(
  data,
  status,
  inputMail,
  inputName = 'Unnamed',
) {
  expect(data.token).not.toBeNull();
  expect(data.user.email).toStrictEqual(inputMail);
  expect(data.user.userName).toStrictEqual(inputName);
  expect(data.user._id).not.toBeNull();
  expect(status).toBe(201);
}

function checkSuccessAddTransaction(
  data,
  status,
  type,
  category,
  date,
  amount,
  description,
) {
  expect(data).not.toBeNull();
  expect(data.transaction).not.toBeNull();
  expect(data.transaction._id).not.toBeNull();
  expect(data.transaction.owner).not.toBeNull();
  expect(data.transaction.type).toStrictEqual(type);
  expect(data.transaction.date).toStrictEqual(date);
  expect(data.transaction.category).toStrictEqual(category);
  expect(data.transaction.amount).toStrictEqual(amount);
  expect(data.transaction.description).toStrictEqual(description);
  expect(data.message).toStrictEqual('transaction added');
  expect(data.currentBalance).not.toBeNaN();
  expect(status).toBe(200);
}
import registrationTest from '../middlewares/tests/registrationTest.js';
import addTransactionTest from '../middlewares/tests/addTransactionTest.js';

const userName = 'Kapusta';
const email = 'test@email.test';
const validPassword = '1234aB';
let TOKEN;
let incomeTransactionID;
let expenseTransactionID;

describe('Test transactions api', () => {
  //REGISTER TEST USER FOR TRANSACTIONS
  test('import: _register/3.4 signup - удачная регистрация c именем пользователя', async () => {
    const { data, status } = await registrationTest(
      email,
      validPassword,
      '',
      userName,
    );
    TOKEN = data.token;
    checkSuccessRegistration(data, status, email, userName);
  });
  // TRANSACTION TESTS
  test('1.1 add - добавление транзакции Дохода', async () => {
    const type = 'income';
    const category = 'salary';
    const date = new Date('2021-12-22T08:35:00.000Z');
    const amount = 45000;
    const description = 'з/п';

    const { data, status } = await addTransactionTest(
      type,
      category,
      date,
      amount,
      description,
      TOKEN,
    );
    incomeTransactionID = data.transaction._id;
    console.log(incomeTransactionID);
    checkSuccessAddTransaction(
      data,
      status,
      type,
      category,
      date,
      amount,
      description,
    );
  });

  test('1.2 add - добавление транзакции Расхода', async () => {
    const type = 'expense';
    const category = 'goods';
    const date = new Date('2021-12-23T18:35:00.000Z');
    const amount = 800;
    const description = 'Novus';

    const { data, status } = await addTransactionTest(
      type,
      category,
      date,
      amount,
      description,
      TOKEN,
    );
    expenseTransactionID = data.transaction._id;
    console.log(incomeTransactionID);
    checkSuccessAddTransaction(
      data,
      status,
      type,
      category,
      date,
      amount,
      description,
    );
  });
  // test('1.2 email - очень короткий', async () => {
  //   await expect(() => loginTest('as', validPassword, '')).rejects.toThrow(
  //     '"email" must be a valid email',
  //   );
  // });

  // test('1.3 email - очень длинный', async () => {
  //   await expect(() =>
  //     loginTest(
  //       'email13@eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZTA5ZGM5MDk5MjdjYTMxMDViMzJiNCIsImlhdCI6MTY0Mjg3ODE0OCwiZXhwIjoxNjQyODc5MDQ4fQ.9mVXUlOs8aprh-6eqOUTjNdnnDeGpln6k90bLAHNF6I',
  //       validPassword,
  //       '',
  //     ),
  //   ).rejects.toThrow('"email" must be a valid email');
  // });

  // test('1.4 email - без знака "@"', async () => {
  //   await expect(() =>
  //     loginTest('email14.email.test', validPassword, ''),
  //   ).rejects.toThrow('"email" must be a valid email');
  // });

  // test('1.5 email - без домена', async () => {
  //   await expect(() =>
  //     loginTest('email15@email', validPassword, ''),
  //   ).rejects.toThrow('"email" must be a valid email');
  // });

  // test('1.6 email - без домена и сервера', async () => {
  //   await expect(() =>
  //     loginTest('email16@', validPassword, ''),
  //   ).rejects.toThrow('"email" must be a valid email');
  // });

  // test('1.7 email - с пробелом', async () => {
  //   await expect(() =>
  //     loginTest('email17@e mail.test', validPassword, ''),
  //   ).rejects.toThrow('"email" must be a valid email');
  // });

  // //PASSWORD
  // test('2.1 password - пустой', async () => {
  //   await expect(() => loginTest('email21@email.test', '', '')).rejects.toThrow(
  //     '"password" is not allowed to be empty',
  //   );
  // });

  // test('2.2 password - короче 6 символов', async () => {
  //   await expect(() =>
  //     loginTest('email22@email.test', '123aB', ''),
  //   ).rejects.toThrow('"password" length must be at least 6 characters long');
  // });

  // test('2.3 password - длина 6 символов', async () => {
  //   const inputMail = 'email23@email.test';
  //   await registrationTest(inputMail, validPassword, '', userName);
  //   const { data, status } = await loginTest(inputMail, validPassword, '');
  //   checkSuccess(data, status, inputMail, userName);
  // });

  // test('2.4 password - длина 10 символов', async () => {
  //   const inputMail = 'email24@email.test';
  //   await registrationTest(inputMail, validPassword + 'asdf', '');
  //   const { data, status } = await loginTest(
  //     inputMail,
  //     validPassword + 'asdf',
  //     '',
  //   );
  //   checkSuccess(data, status, inputMail);
  // });

  // test('2.5 password - длина > 10 ', async () => {
  //   await expect(() =>
  //     loginTest('email25@email.test', '123456789aB', ''),
  //   ).rejects.toThrow(
  //     '"password" length must be less than or equal to 10 characters long',
  //   );
  // });

  // test('2.6 password - состоит из цифр', async () => {
  //   await expect(() =>
  //     loginTest('email26@email.test', 123456, ''),
  //   ).rejects.toThrow('"password" must be a string');
  // });

  // test('2.7 password - состоит из букв', async () => {
  //   const inputMail = 'email27@email.test';
  //   await registrationTest(inputMail, 'abcdDEF', '');
  //   const { data, status } = await loginTest(inputMail, 'abcdDEF', '');
  //   checkSuccess(data, status, inputMail);
  // });

  // test('2.8 password - состоит из прописных букв>', async () => {
  //   const inputMail = 'email28@email.test';
  //   await registrationTest(inputMail, 'abcddef', '');
  //   const { data, status } = await loginTest(inputMail, 'abcddef', '');
  //   checkSuccess(data, status, inputMail);
  // });

  // test('2.9 password - состоит из ЗАГЛАВНЫХ букв>', async () => {
  //   const inputMail = 'email29@email.test';
  //   await registrationTest(inputMail, 'ABCDDEF', '');
  //   const { data, status } = await loginTest(inputMail, 'ABCDDEF', '');
  //   checkSuccess(data, status, inputMail);
  // });

  // // SIGNUP
  // test('3.1 login - логин с токеном', async () => {
  //   const inputMail = 'email29@email.test';
  //   const { data, status } = await loginTest(inputMail, 'ABCDDEF', 'token');
  //   checkSuccess(data, status, inputMail);
  // });
  // test('3.2 login - логин с неверным паролем', async () => {
  //   const inputMail = 'email29@email.test';
  //   await expect(() => loginTest(inputMail, 'abcddef', '')).rejects.toThrow(
  //     'Email or password is wrong',
  //   );
  // });
  // test('3.3 login - логин незарегистрированного пользователя', async () => {
  //   const inputMail = 'email33@email.test';
  //   await expect(() => loginTest(inputMail, validPassword, '')).rejects.toThrow(
  //     'Email or password is wrong',
  //   );
  // });
});
