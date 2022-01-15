import app from '../app.js';
import chalk from 'chalk';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log(chalk.green('mongoose DB connection successful'));
    app.listen(PORT, () => {
      console.log(
        `Server running. Use our API on port: ${PORT}`,
        'Database connection successful',
      );
    });
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });
