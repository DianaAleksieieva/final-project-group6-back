import app from '../app.js';
import chalk from 'chalk';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const { DB_HOST, PORT = 4321 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log(chalk.blue('mongoose DB connection successful'));
    app.listen(PORT, () => {
      console.log('Server running. Use our API on port: ' + chalk.blue(PORT));
    });
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });
