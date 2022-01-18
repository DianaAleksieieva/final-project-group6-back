import putSetOfTransactionsModel from '../../models/transactions/putSetOfTransactionsModel.js';
import httpError from 'http-errors';

function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

const putSetOfTransactionsController = async (req, res) => {
  const { params, user } = req;
  const count = parseInt(params.count);
  const month = parseInt(params.month);
  const year = parseInt(params.year);

  let transactionCounter = 0;
  const categoryExpenses = {
    transport: ['Троллейбус', 'Такси', 'Метро'],
    goods: [
      'Свинина',
      'Хлеб',
      'Сыр',
      'Молоко',
      'Крупы',
      'Макароны',
      'Пельмени',
      'Зелень',
      'Овощи',
      'Криветки',
      'Выпечка',
      'Салаты',
    ],
    health: ['Уколы', 'Лекарства'],
    alco: ['Пиво', 'Водка', 'Пиво с водкой'],
    fun: ['Кинотеатр', 'Библиотека', 'Пивариум'],
    house: ['Ремонт', 'Сантехника', 'Клининг'],
    tech: ['Болгарка', 'Телефон', 'Велосипед'],
    utilities: ['Свет', 'Вода', 'Газ'],
    sport: ['Спортзал', 'Теннис', 'Шахматы'],
    education: ['Курсы'],
    other: ['Возврат кредита', 'Выкуп с ломбарда', 'Кража'],
  };
  const categoryIncomes = {
    salary: ['Моя з/п'],
    freelance: [
      'Подработка таксистом',
      'Сдача в аренду болгарки',
      'Реппетиторство',
      'Сдача в аренду комнаты',
    ],
  };

  for (let counter = 0; counter < count; counter++) {
    Object.keys(categoryExpenses).forEach(category => {
      const type = 'expense';
      categoryExpenses[category].forEach(async description => {
        const amount = getRandom(10, 600);
        const day = month === 2 ? getRandom(1, 29) : getRandom(1, 31);
        const hour = getRandom(8, 21);
        const minute = getRandom(1, 60);
        if (Math.random() > 0.7) {
          const transaction = await putSetOfTransactionsModel(
            type,
            category,
            description,
            amount,
            year,
            month,
            day,
            hour,
            minute,
          );
          console.log(transaction);
          if (transaction.length) transactionCounter++;
          console.log(transactionCounter);
        }
      });
    });
  }
  for (let i = 0; i < 1; i++) {
    const hour = getRandom(8, 21);
    const minute = getRandom(1, 60);

    const transaction = await putSetOfTransactionsModel(
      'income',
      'salary',
      categoryIncomes.salary[0],
      40000,
      year,
      month,
      5,
      hour,
      minute,
    );
    console.log(transaction);
    if (transaction.length) transactionCounter++;
    console.log(transactionCounter);
  }

  for (let counter = 0; counter < count / 1; counter++) {
    const type = 'income';
    let category = 'freelance';

    categoryIncomes[category].forEach(async description => {
      const amount = getRandom(2000, 20000);
      const day = month === 2 ? getRandom(1, 29) : getRandom(1, 31);
      const hour = getRandom(8, 21);
      const minute = getRandom(1, 60);
      if (Math.random() > 0.7) {
        const transaction = await putSetOfTransactionsModel(
          type,
          category,
          description,
          amount,
          year,
          month,
          day,
          hour,
          minute,
        );
        console.log(transaction);
        if (transaction.length) transactionCounter++;
        console.log(transactionCounter);
      }
    });
  }

  res.status(200).send({ transactionCounter });
};

export default putSetOfTransactionsController;
