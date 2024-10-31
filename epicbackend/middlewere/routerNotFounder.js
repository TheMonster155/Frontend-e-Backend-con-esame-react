const routerNotFoundMiddleWare = (res, req, next) => {
  res.status(404).send({
    statuscode: 404,
    message: "not work",
  });
};
module.exports = routerNotFoundMiddleWare;
