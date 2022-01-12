const { Schema, model } = require('mongoose')
const Joi = require('joi')

const transactionsSchema = Schema(
 
);

const joiSchema = Joi.object({

})

const Transaction = model('contact', transactionsSchema);

module.exports = {
  Transaction,
  joiSchema,
};
