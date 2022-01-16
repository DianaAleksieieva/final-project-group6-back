import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import chalk from 'chalk';

import { authRouter, transactionsRouter } from './routes/api/index.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/auth', authRouter);
app.use('/api/transactions', transactionsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  console.log(chalk.red('Catch error'), chalk.yellow(status, message));
  res.status(status).json({ message });
});

export default app;
