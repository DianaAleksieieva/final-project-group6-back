const validationMiddleware = (
  schema,
  schemaIncome = null,
  schemaExpene = null,
) => {
  return (req, res, next) => {
    let error;
    if (req.body.type === 'income') {
      console.log(1);
      error = schemaIncome.validate(req.body).error;
    } else if (req.body.type === 'expense') {
      console.log(2);
      error = schemaExpene.validate(req.body).error;
    } else {
      console.log(3);
      error = schema.validate(req.body).error;
    }
    if (error) {
      error.status = 400;
      next(error);
    }
    next();
  };
};

export default validationMiddleware;
