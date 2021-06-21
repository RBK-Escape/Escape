const mysql = require("mysql");
const createTables = require("./config");
const Promise = require("bluebird");
const database = "escape";

const connection = mysql.createConnection({
  user: "root",
  password: "",
});

const db = Promise.promisifyAll(connection, { multiArgs: true });

db.connectAsync()
  .then(() =>
    console.log(`Connected to ${database} database as ID ${db.threadId}`)
  )
  .then(() => db.queryAsync(`CREATE DATABASE IF NOT EXISTS ${database}`))
  .then(() => db.queryAsync(`USE ${database}`))
  .then(() => createTables(db));



const postRent = function (data, val, callback) {
  let query = "INSERT INTO equipments (category,name, description, etat,image,priceRent,priceSell,toRent,toSell,status,isRented,isSold,favorite, renter) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  db.query(query, [data.category, data.title, data.description, data.condition, val, data.price, 0, true, null, false, false, false, false, null], callback)
};

const postSell = function (data, val, callback) {
  let query = "INSERT INTO equipments (category,name, description, etat,image,priceSell,priceRent,toRent,toSell,status,isRented,isSold,favorite, renter) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  db.query(query, [data.category, data.title, data.description, data.condition, val, data.price, 0, null, true, false, false, false, false, null], callback)
};


module.exports = {
  postRent,
  postSell

};

