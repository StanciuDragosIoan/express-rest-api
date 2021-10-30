const checkIfJson = (err, req, res, next) => {
  if (err) {
    return res
      .status(500)
      .send("payload is badly formatted or some other error occurred =)!");
  }
  next();
};
module.exports = {
  checkIfJson,
};
