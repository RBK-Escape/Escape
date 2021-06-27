const mysql = require("mysql2");
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
  db.query('SELECT * FROM equipments', (err, result) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, result);
    }
  });
}

var blog = (cb) => {
  db.query("SELECT * FROM blogs where status= 'accepted'", (err, result) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, result);
    }
  });
};

const postRent = function (data, val, callback) {
  let query = "INSERT INTO equipments (category,name, description, etat,image,price,toRent,toSell,status,isRented,isSold,favorite, renter, userId) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  db.query(query, [data.category, data.title, data.description, data.condition, val, data.price, true, null, "pending", false, false, false, null, data.id.id], callback)
};

const postSell = function (data, val, callback) {
  let query = "INSERT INTO equipments (category,name, description, etat,image,price,toRent,toSell,status,isRented,isSold,favorite, renter,userId) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  db.query(query, [data.category, data.title, data.description, data.condition, val, data.price, null, true, "pending", false, false, false, null, data.id.id], callback)
};

const uploadImage = function (data, val, cb) {
  let query = "INSERT INTO blogs (place,image, experience, name,userId, status) VALUES (?,?,?,?,?,'pending')";
  db.query(query, [data.place, val, data.description, data.name, data.id.id], cb)
}

const postBlog = (data, callback) => {
  let query1 = `select fullName  from users where userID = "${data.id.id}"`
  db.query(query1, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      let query2 = "INSERT INTO blogs (place,image, experience, userId, name ,status) VALUES (?,?,?,?,?,?)";
      return db.query(query2, [data.place, data.image, data.description, data.id.id, result[0].fullName, "pending"], callback)
    }
  })
};

const createUser = function (data, hachedPW, callback) {
  let query = "INSERT into users (fullName,password,phoneNumber,adress,email) VALUES (?,?,?,?,?)";
  db.query(query, [data.fullname, hachedPW, data.phone, data.adress, data.email], callback)
}

const selectUserByEmail = function (data, callback) {
  let query = "SELECT * FROM users WHERE email =  ? ";
  db.query(query, [data.email], callback)
}


const getDataAdmin = function (callback) {
  let query = "select id,userId, name, description, etat, image, status, toRent, toSell, price from equipments where status = 0 ORDER BY id DESC;"
  db.query(query, callback)
};

const acceptPost = function (val, callback) {
  let query = `UPDATE equipments SET status = "accepted" WHERE id = ${val};`;
  db.query(query, callback);
};

const deletePost = function (val, callback) {
  let query = `delete from equipments WHERE id = ${val};`;
  db.query(query, callback);
};


const getBlogAdmin = function (callback) {
  let query = "select * from blogs ORDER BY id DESC;"
  db.query(query, callback)
};
const acceptBlog = function (val, callback) {
  let query = `UPDATE blogs SET status = "accepted" WHERE id = ${val};`
  db.query(query, callback)
};

const deleteBlog = function (val, callback) {
  let query = `delete from blogs WHERE id = ${val};`
  db.query(query, callback)
};

const InCart = function (val, callback) {
  let query = `INSERT into Cart (equipmentId,userId,price,name) values (?,?,?,?);`
  db.query(query, [val.equipmentId, val.userId.id, val.price, val.name], callback)
}

const OutCart = function (item, user, callback) {
  let query = `delete from Cart where equipmentId= "${item}" and userId= "${user}";`
  db.query(query, callback)
}

const EmptyCart = function (user, callback) {
  console.log("userId here", user)
  let query = `delete from Cart where userId= "${user}";`
  db.query(query, callback)
}

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
  getBlogAdmin,
  acceptBlog,
  deleteBlog,
  uploadImage,
  InCart,
  OutCart,
  EmptyCart
};