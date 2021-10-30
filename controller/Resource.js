const fs = require("fs");

const getId = () => {
  return (
    Math.random().toString(12).substring(2, 17) +
    Math.random().toString(12).substring(2, 17)
  );
};
const read = () => {
  try {
    const rawJSONData = JSON.parse(fs.readFileSync("./data/db.json"));
    return rawJSONData;
  } catch (err) {
    console.log(err.message);
    console.log(err.stack);
    const rawJSONData = { resources: [] };
    return rawJSONData;
  }
};

const add = (data, res) => {
  const crtData = read();
  crtData.push(data);
  fs.writeFileSync("./data/db.json", JSON.stringify(crtData));
  return res.status(201).send({ id: data.id });
};

const update = (id, data) => {
  let crtData = read();
  crtData.forEach((i) => {
    if (i.id === id) {
      (i.color = data.color), (i.name = data.name);
    }
  });
  fs.writeFileSync("./data/db.json", JSON.stringify(crtData));
};

const deleteItem = (id) => {
  let crtData = read();
  crtData.forEach((i, index) => {
    if (i.id === id) {
      crtData.splice(index, 1);
    }
  });
  fs.writeFileSync("./data/db.json", JSON.stringify(crtData));
};

const deleteAll = () => {
  const data = {
    resrorces: [],
  };
  fs.writeFileSync("./data/db.json", JSON.stringify(data));
};

module.exports = {
  read,
  add,
  getId,
  update,
  deleteItem,
  deleteAll,
};
