const { read } = require("../controller/Resource");
const checkIfDuplicate = (data) => {
  const crtData = read();
  const duplicate = crtData.find(
    (i) => i.color === data.color && i.name === data.name
  );
  return duplicate;
};

const findById = (id) => {
  const crtData = read();
  const item = crtData.find((i) => i.id === id);
  return item;
};

module.exports = {
  checkIfDuplicate,
  findById,
};
