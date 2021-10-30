const badRequest = (res, msg) => {
  res.statusCode = 400;
  return res.send(msg);
};

const sendOk = (res, data, status = 200) => {
  return res.status(status).send(data);
};

module.exports = {
  badRequest,
  sendOk,
};
