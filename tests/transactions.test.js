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

function checkSuccessAdd(
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

const getToken = () => set.user.token;
const getDate = (hour = 10, day = 22, month = 12, year = 2021) =>
  new Date(`${year}-${month}-${day}T${hour}:35:00.000Z`);

const set = {
  user: { userName: 'Kapusta', email: 'test@email.test', token: null },
  validPassword: '1234aB',
  incomeTransactionID: null,
  expenseTransactionID: null,
  deleteTransactionID: null,
  typeExp: 'expense',
  typeInc: 'income',
};

describe('Test transactions api', () => {
  //REGISTER TEST USER FOR TRANSACTIONS
  test('import: _register/3.4 signup - удачная регистрация c именем пользователя', async () => {
    const { data, status } = await registrationTest(
      set.user.email,
      set.validPassword,
      '',
      set.user.userName,
    );

    set.user.token = data.token;
    checkSuccessRegistration(data, status, set.user.email, set.user.userName);
  });
  // TRANSACTION TESTS
  test('1.01 add - добавление транзакции Дохода', async () => {
    const { data, status } = await addTransactionTest(
      set.typeInc,
      'salary',
      getDate(),
      450,
      'з/п',
      getToken(),
    );
    set.incomeTransactionID = data.transaction._id;
    checkSuccessAdd(data, status, set.typeInc, 'salary', getDate(), 450, 'з/п');
  });

  test('1.02 add - добавление транзакции Расхода', async () => {
    const { data, status } = await addTransactionTest(
      set.typeExp,
      'fun',
      getDate(15),
      80,
      'Игра',
      getToken(),
    );
    set.expenseTransactionID = data.transaction._id;

    checkSuccessAdd(data, status, set.typeExp, 'fun', getDate(15), 80, 'Игра');
  });

  test('1.03 add - добавление транзакции с отрицательным ammount', async () => {
    await expect(() =>
      addTransactionTest(set.typeExp, 'goods', getDate(), -8, 'No', getToken()),
    ).rejects.toThrow('"amount" must be greater than or equal to 1');
  });

  test('1.04 add - добавление транзакции с отсутствующим типом', async () => {
    await expect(() =>
      addTransactionTest('neutral', 'goods', getDate(), 80, 'Сыр', getToken()),
    ).rejects.toThrow(
      'ValidationError: "type" must be one of [income, expense]',
    );
  });

  test('1.05 add - добавление транзакции с неверной категорией', async () => {
    await expect(() =>
      addTransactionTest(set.typeExp, '123', getDate(), 80, 'Раки', getToken()),
    ).rejects.toThrow(
      'ValidationError: "category" must be one of [transport, goods, health, alco, fun, house, tech, utilities, sport, education, other]',
    );
  });

  test('1.06 add - добавление транзакции без даты', async () => {
    await expect(() =>
      addTransactionTest(set.typeExp, 'goods', '', 800, 'Novus', getToken()),
    ).rejects.toThrow('ValidationError: "date" must be a valid date');
  });

  test('1.07 add - добавление транзакции без токена', async () => {
    await expect(() =>
      addTransactionTest(set.typeExp, 'goods', getDate(), 800, 'Novus', ''),
    ).rejects.toThrow('No authorized');
  });

  test('1.08 add - добавление транзакции без описания', async () => {
    await expect(() =>
      addTransactionTest(set.typeExp, 'goods', getDate(), 800, '', getToken()),
    ).rejects.toThrow('"description" is not allowed to be empty');
  });
  test('1.09 add - добавление транзакции Доход с категорией расхода', async () => {
    await expect(() =>
      addTransactionTest(set.typeInc, 'goods', getDate(), 800, 'i', getToken()),
    ).rejects.toThrow(
      'ValidationError: "category" must be one of [salary, freelance]',
    );
  });
  test('1.10 add - добавление транзакции Расход с категорией дохода', async () => {
    await expect(() =>
      addTransactionTest(set.typeExp, 'salary', getDate(), 80, 'i', getToken()),
    ).rejects.toThrow(
      'ValidationError: "category" must be one of [transport, goods, health, alco, fun, house, tech, utilities, sport, education, other]',
    );
  });
});
