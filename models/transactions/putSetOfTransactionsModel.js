import Transaction from '../../schemas/mongoose/transaction.js';
function toStringNumber(number) {
  return number < 10 ? '0' + number : number.toString();
}

async function putSetOfTransactionsModel(
  owner,
  type,
  category,
  description,
  amount,
  year,
  month,
  day,
  hour,
  minute,
) {
  return await Transaction.create(
    [
      {
        owner,
        type,
        description,
        category,
        amount,
        month,
        year,
        date:
          toStringNumber(year) +
          '-' +
          toStringNumber(month) +
          '-' +
          toStringNumber(day) +
          'T' +
          toStringNumber(hour) +
          ':' +
          toStringNumber(minute) +
          ':00Z',
      },
    ],
    [
      '_id',
      ' owner',
      'type',
      'description',
      'category',
      'amount',
      'month',
      'year',
      'date',
    ],
  );
}
export default putSetOfTransactionsModel;
