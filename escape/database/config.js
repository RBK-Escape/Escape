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
      email VARCHAR(255),
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
            priceRent INT ,
            priceSell INT ,
            toRent BOOLEAN ,
            toSell BOOLEAN ,
            status BOOLEAN DEFAULT false,
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
    .error((err) => {
      console.log(err);
    });
};
