const express = require("express");
const db = require("../database");
const app = express();
const port = 1337;


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});