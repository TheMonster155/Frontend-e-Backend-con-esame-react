const badRequestHandler = (err, req, res, next) => {
  if (err.staus === 400) {
    res.staus().send({
      message: err.message,
      errors: err.errorsList.message.map((e) => e.msg),
    });
  } else {
    next(err);
  }
};

module.exports = badRequestHandler;
