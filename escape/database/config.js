const Promise = require("bluebird");

module.exports = (db) => {
  if (!db.queryAsync) {
    db = Promise.promisifyAll(db);
  }
  // Create a table
  return db
    .queryAsync(
      `
    CREATE TABLE IF NOT EXISTS users (
      userID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      fullName VARCHAR(100),
      password VARCHAR(900),
      image VARCHAR(900),
      phoneNumber INT,
      adress VARCHAR(255),
      email VARCHAR(255) UNIQUE,
      pocket INT 
    )`
    )
    .then(() => {
      return db
        .queryAsync(
          ` 
            CREATE TABLE IF NOT EXISTS equipments (
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            category VARCHAR(255),
            userId INT ,
            name VARCHAR(255),
            description VARCHAR(1000),
            etat VARCHAR(255),
            price INT DEFAULT null,
            toRent BOOLEAN ,
            toSell BOOLEAN ,
            status VARCHAR(255) DEFAULT 'pending',
            isRented BOOLEAN ,
            isSold BOOLEAN ,
            favorite BOOLEAN DEFAULT false,
            image VARCHAR(1000),
            FOREIGN KEY (userId) REFERENCES users (userID),
            inCart BOOLEAN DEFAULT false,
            renter INT 
            )
        `
        );
    })
    .then(() => {
      return db
        .queryAsync(
          ` 
            CREATE TABLE IF NOT EXISTS blogs (
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            image VARCHAR(3000),
            upImage VARCHAR(3000),
            place VARCHAR(255),
            userId INT ,
            name VARCHAR(255),
            experience VARCHAR(2000),
            status VARCHAR(255) DEFAULT 'pending',
            FOREIGN KEY (userId) REFERENCES users (userID)
            )
        `
        );
    }).then(() => {
      return db
        .queryAsync(
          ` 
            CREATE TABLE IF NOT EXISTS userCart (
            cartId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            userId INT ,
            itemId INT,
            FOREIGN KEY (userId) REFERENCES users (userID),
            FOREIGN KEY (itemId) REFERENCES equipments (id)            
            )
        `
        );
    })
    .error((err) => {
      console.log(err);
    });
};