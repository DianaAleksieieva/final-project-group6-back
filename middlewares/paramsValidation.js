const paramsValidationMware = schema => {
  return (req, res, next) => {
    const { error } = schema.validate(req.params);
    if (error) {
      error.status = 400;
      next(error);
    }
    next();
  };
};

export default paramsValidationMware;
