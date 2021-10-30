const router = require("express");
const { badRequest, sendOk } = require("../helpers/errorHandlerHelper");
const { checkIfDuplicate, findById } = require("../helpers/resourceHelper");
const app = router();
const {
  read,
  add,
  update,
  deleteItem,
  deleteAll,
} = require("../controller/Resource");

const { validatePayload, grabPayload } = require("../helpers/securityHelper");
/*
 *  GET
 *  payload null
 *  returns JSON payload with resources
 */
app.get("/", (req, res) => {
  const data = read();
  return res.send(data);
});

/*
 *  POST
 *  payload color: string, name: string
 *  returns JSON payload with resource id
 */
app.post("/", (req, res) => {
  const payload = req.body;
  const isValid = validatePayload(payload);

  if (isValid) {
    const data = grabPayload(payload);
    const duplicate = checkIfDuplicate(data);

    if (duplicate) {
      badRequest(res, "Duplicate Entry");
    } else {
      return add(data, res);
    }
  } else {
    badRequest(res, "Some field is missing or is bad X_X");
  }
});

/*
 *  POST
 *  payload color: string, name: string
 *  returns JSON payload with success message with resource id
 */
app.post("/:id", (req, res) => {
  const isValid = validatePayload(req.body);
  const { id } = req.params;

  if (isValid) {
    const found = findById(id);
    if (found) {
      const data = grabPayload(req.body);
      data.id = id;
      update(id, data);
      sendOk(res, `item with id ${id} updated successfully`);
    } else {
      badRequest(res, `item with id ${id} could not be found`);
    }
  } else {
    badRequest(res, "Some field is missing or is bad X_X");
  }
});

/*
 *  PUT
 *  payload color: string, name: string
 *  returns JSON payload with success message with resource id
 */
app.put("/:id", (req, res) => {
  const payload = req.body;
  console.log(payload);
  const isValid = validatePayload(payload);
  const { id } = req.params;

  if (isValid) {
    const crtData = read();

    const found = crtData.find((i) => i.id === id);
    if (found) {
      const data = payload;
      data.id = id;
      update(id, data);
      return res.send(`item with id ${id} updated successfully`);
    } else {
      res.statusCode = 400;
      return res.end(`item with id ${id} could not be found`);
    }
  }
  res.statusCode = 400;
  return res.end("Some field is missing or is bad X_X");
});

/*
 *  DELETE
 *  payload null
 *  returns JSON payload with deleted item id
 */
app.delete("/:id", (req, res) => {
  const { id } = req.params;
  const crtData = read();
  const found = crtData.find((i) => i.id === id);
  if (found) {
    deleteItem(id);
    sendOk(res, `resource with id ${id} deleted successfully`);
  } else {
    res.statusCode = 400;
    return res.end(`item with id ${id} could not be found`);
  }
});

/*
 *  GET
 *  payload null
 *  returns JSON payload with respective item
 */
app.get("/:id", (req, res) => {
  const { id } = req.params;
  const item = findById(id);
  if (item) {
    return res.send(item);
  } else {
    res.statusCode = 404;
    return res.end(`resource with id ${id} not found`);
  }
});

/*
 *  DELETE ALL
 *  payload null
 *  returns JSON payload with success message
 */

app.delete("/", (req, res) => {
  deleteAll();
  return res.end("resources deleted successfully");
});

module.exports = app;
