const mysql = require("mysql");
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

// var postTodo = (params, cb) => {
//   db.query("INSERT INTO todos (name,todo) VALUES (?,?)", (err, result) => {
//     cb(err, result);
//   });
// };
// var postUser = (params, cb) => {
//   db.query("INSERT INTO users (name,password) VALUES (?,?)", (err, result) => {
//     cb(err, result);
//   });
// };

// module.exports = {
//   postTodo,
  
// };