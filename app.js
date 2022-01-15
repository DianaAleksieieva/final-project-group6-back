import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import { authRouter, usersRouter } from './routes/api/index.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/auth.js', authRouter);
app.use('/api/users.js', usersRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

export default app;
