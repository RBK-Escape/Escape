const express = require("express");
const db = require("../database");
const app = express();
const port = 3001;
var cors = require('cors') 
app.use(cors())  


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


  
  