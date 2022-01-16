import mongoose from 'mongoose';
const { Schema } = mongoose;

const transactionSchema = Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    type: {
      type: String,
      enum: ['income', 'expense'],
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      enum: [
        'transport',
        'goods',
        'health',
        'alco',
        'fun',
        'house',
        'tech',
        'utilities',
        'sport',
        'education',
        'other',
        'salary',
        'freelance',
      ],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    month: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

const Transaction = mongoose.model('transaction', transactionSchema);

export default Transaction;
