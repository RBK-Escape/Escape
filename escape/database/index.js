const mysql = require("mysql2");
const createTables = require("./config");
const Promise = require("bluebird");
const database = "escape";

const connection = mysql.createConnection({
  user: "root",
  password: "000000",
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
  db.query("SELECT * FROM equipments", (err, result) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, result);
    }
  });
};
var searchProducts = (cb) => {
  db.query("SELECT * FROM equipments", (err, result) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, result);
    }
  });
};

var blog = (cb) => {
  db.query("SELECT * FROM blogs", (err, result) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, result);
    }
  });
};

const postRent = function (data, val, callback) {
  let query =
    "INSERT INTO equipments (category,name, description, etat,image,priceRent,priceSell,toRent,toSell,status,isRented,isSold,favorite, renter) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  db.query(
    query,
    [
      data.category,
      data.title,
      data.description,
      data.condition,
      val,
      data.price,
      null,
      true,
      null,
      "pending",
      false,
      false,
      false,
      null,
    ],
    callback
  );
};

const postSell = function (data, val, callback) {
  let query =
    "INSERT INTO equipments (category,name, description, etat,image,priceSell,priceRent,toRent,toSell,status,isRented,isSold,favorite, renter) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  db.query(
    query,
    [
      data.category,
      data.title,
      data.description,
      data.condition,
      val,
      data.price,
      null,
      null,
      true,
      "pending",
      false,
      false,
      false,
      null,
    ],
    callback
  );
};
const postBlog = (place,image,description) => {
  db.queryAsync(
    `INSERT INTO blogs (place,image,experience) VALUES ('${place}','${image}','${description}')`
  );
};

const createUser = function (data, hachedPW, callback) {
  let query =
    "INSERT into users (fullName,password,phoneNumber,adress,email) VALUES (?,?,?,?,?)";
  db.query(
    query,
    [data.fullname, hachedPW, data.phone, data.adress, data.email],
    callback
  );
};

const selectUserByEmail = function (data, callback) {
  let query = "SELECT * FROM users WHERE email =  ? ";
  db.query(query, [data.email], callback);
};

const getDataAdmin = function (callback) {
  let query =
    "select id,userId, name, description, etat, image, status, toRent, toSell,priceSell,priceRent from equipments where status = 0;";
  db.query(query, callback);
};

const acceptPost = function (val, callback) {
  let query = `UPDATE equipments SET status = "accepted" WHERE id = ${val};`;
  db.query(query, callback);
};

const deletePost = function (val, callback) {
  let query = `delete from equipments WHERE id = ${val};`;
  db.query(query, callback);
};

module.exports = {
  db,
  homeProducts,
  postRent,
  postSell,
  searchProducts,
  getDataAdmin,
  acceptPost,
  deletePost,
  createUser,
  selectUserByEmail,
  postBlog,
  blog,
};
