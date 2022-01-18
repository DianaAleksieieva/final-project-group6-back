import Transaction from '../../schemas/mongoose/transaction.js';
function toStringNumber(number) {
  return number < 10 ? '0' + number : number.toString();
}

async function putSetOfTransactionsModel(
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
        owner: '61e09dc909927ca3105b32b4',
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
