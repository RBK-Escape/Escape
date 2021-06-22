const express = require("express");
const db = require("../database");
const {getAllEquipments, getEquipmentsToRent, getEquipmentsToBuy} = require('../database/query.js')
const app = express();
const port = process.env.PORT || 3001;
var cors = require('cors')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

app.use(cors())


var cors = require('cors')

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: "50mb", extended: true }))


const fileupload = require('express-fileupload');
app.use(fileupload({ useTempFiles: true }))

var cloudinary = require("cloudinary").v2
cloudinary.config({
  cloud_name: 'rbkescape',
  api_key: '451369544519695',
  api_secret: 'VIQOj1T-DuUD0goCYRK3WwqeK2k'

})


app.post("/api/upload", async (req, res) => {

  try {

    const image = req.body.data
    let data = req.body
    const result = await cloudinary.uploader.upload(image, {
      upload_preset: 'Escape',
    })
    if (data.rent ==="rent" ){
   db.postRent(data, result.secure_url, (err, result) => {
      if (err) console.log(err)
      console.log(result)
    })
  } else {
    db.postSell(data, result.secure_url, (err, result) => {
      if (err) console.log(err)
      console.log(result)
    })
  }
  }
  catch (err) {
    console.log("Error", err)
    return res.status(400).json({ error: err })
  }
})


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
///////////////////auth////////////////////


app.post('/signin', async (req, res) => {
  try {
    let {email, password} = req.body
    let user = await db.query("SELECT * FROM users WHERE email = ? ;", email)
    if (!user) {
      throw "User doesn't exist"
    }
    let isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      throw "Wrong password"
    }
    let token = jwt.sign(
      {
        email: user.email,
        id: user.userID
      },
      "jwtSecret",
      {
        expiresIn: "1h"
      }
    );
    res.send({
      user,
      token: token
    })
  }
  catch(error) {
    res.send(error)
  }
})

app.post('/signup', async (req, res) => {
  try {
    let { fullname , email, password , phone , address } = req.body
    let existingUser = await db.query("SELECT * FROM users WHERE email = ? ;", email)
    if (existingUser) {
      throw "User already exists"
    }
    let newPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
    let user = await db.query("INSERT INTO users (fullName,password,phoneNumber,adress,email) VALUES (?,?,?,?,?);",[fullname,password,phone,address,email])
    
    let token = jwt.sign(
      {
        email: user.email,
        id: user.userID
      },
      "jwtSecret",
      {
        expiresIn: "1h"
      }
    );
    res.send({
      user,
      token: token
    })
  }
  catch(error) {
    res.send(error)
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


  
  