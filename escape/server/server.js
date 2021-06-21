const express = require("express");
const {db} = require("../database");
const {homeProducts} = require ("../database/index.js")
const {getAllEquipments, getEquipmentsToRent, getEquipmentsToBuy} = require('../database/query.js')
const app = express();
const port = 3001;
var cors = require('cors')
app.use(cors())

///////////////////////////////////////////////////////////
// fetch element for the store.js component
//////////////////////////////////////////////////////////
app.get('/api/allEquipments', (req, res) => {
  getAllEquipments().then( (data) => {
    res.send(data[0])
  })
})

app.get('/api/toRent', (req, res) => {
  getEquipmentsToRent().then( (data) => {
    res.send(data[0])
  })
})

app.get('/api/toBuy', (req, res) => {
  getEquipmentsToBuy().then( (data) => {
    res.send(data[0])
  })
})
////////////////////////////////////////////////////////////

////From bechir
app.get('/homeProducts', (req,res) =>{
  db.homeProducts( function(err,result){
    if(err){
      res.send(err)
    } else {
      res.json(result)
    }
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});