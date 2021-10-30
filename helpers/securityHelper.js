const { getId } = require("../controller/Resource");

const validatePayload = (payload) => {
  if (
    Object.prototype.hasOwnProperty.call(payload, "name") &&
    Object.prototype.hasOwnProperty.call(payload, "color") &&
    typeof payload.name === "string" &&
    typeof payload.color === "string" &&
    payload.color.length <= 15 &&
    payload.name.length <= 15 &&
    Object.keys(payload).includes("color") &&
    Object.keys(payload).includes("name") &&
    Object.keys(payload).length === 2
  ) {
    return true;
  }
  return false;
};

const grabPayload = (payload) => {
  const { color, name } = payload;
  const id = getId();
  const data = {
    name,
    color,
    id,
  };
  return data;
};

module.exports = {
  validatePayload,
  grabPayload,
};
