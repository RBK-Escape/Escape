const mysql = require("mysql2");
const createTables = require("./config");
const Promise = require("bluebird");
const database = "escape";

const connection = mysql.createConnection({
  user: "root",
  password: "root",
});

const db = Promise.promisifyAll(connection, { multiArgs: true });

db.connectAsync()
  .then(() =>
    console.log(`Connected to ${database} database as ID ${db.threadId}`)
  )
  .then(() => db.queryAsync(`CREATE DATABASE IF NOT EXISTS ${database}`))
  .then(() => db.queryAsync(`USE ${database}`))
  .then(() => createTables(db));


var homeProducts = (cb) => {
  db.query('SELECT * FROM equipments', (err, result) => {
    if(err){
      cb(err, null);
    } else {
      cb(null, result);
    }
  })
}

const postRent = function (data, val, callback) {
  let query = "INSERT INTO equipments (category,name, description, etat,image,priceRent,priceSell,toRent,toSell,status,isRented,isSold,favorite, renter) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  db.query(query, [data.category, data.title, data.description, data.condition, val, data.price, 0, true, null, false, false, false, false, null], callback)
};

const postSell = function (data, val, callback) {
  let query = "INSERT INTO equipments (category,name, description, etat,image,priceSell,priceRent,toRent,toSell,status,isRented,isSold,favorite, renter) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  db.query(query, [data.category, data.title, data.description, data.condition, val, data.price, 0, null, true, false, false, false, false, null], callback)
};

const createUser = function (data,hachedPW,callback){
  let query = "INSERT into users (fullName,password,phoneNumber,adress,email) VALUES (?,?,?,?,?)";
  db.query(query,[data.fullname,hachedPW,data.phone,data.adress,data.email] ,callback )
}

const selectUserByEmail = function (data,callback){
  let query = "SELECT * FROM users WHERE email =  ? ";
  db.query(query,[data.email],callback)
}


module.exports = {
  db,
  homeProducts,
  postRent,
  postSell,
  createUser,
  selectUserByEmail
}






