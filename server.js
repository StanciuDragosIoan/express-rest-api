const express = require("express");
const app = express();
const port = 3000 || process.env.PORT;
app.use(express.json()); // This middleware is available in Express v4.16.0 onwards.
const { checkIfJson } = require("./middleware/middleware");
app.use(checkIfJson);
const resources = require("./routes/resources");
app.use("/resources", resources);
app.get("/", (req, res) => {
  return res.end("Welcome to the homepage!");
});

//generic middleware
app.use((req, res) => {
  if (req.method !== "GET") {
    res.statusCode = 405;
    return res.end("Method not allowed");
  }
  res.statusCode = 404;
  return res.end("Unfortunately this page could not be found X_x");
});

console.log(`server up and running on port ${port}`);

app.listen(port);
