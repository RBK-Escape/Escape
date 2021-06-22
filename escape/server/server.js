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


app.post('/signup', (req,res) => {

  db.selectUserByEmail(req.body , (err,result) => {
    if(err) res.send({err:err})
    if(result.length > 0){
      throw "user already exists"
    }})

  bcrypt.hash(req.body.password, 10 , (err,hash) => {
    if(err){
      console.log(err)
    }
    db.createUser(req.body,hash, (err,result) => {
      if(err) console.log(err)
      res.send(result)
    })
  });
})


app.post('/signin', (req,res) => {
  db.selectUserByEmail(req.body , (err,result) => {
    if(err) res.send({err:err})
    if(result.length > 0){
      bcrypt.compare(req.body.password ,result[0].password ,(err,response) => {
        if(err) res.send(err)
        if(response){
          const id = result[0].id
          const token =jwt.sign({id} , "jwtSecret" ,{
            expiresIn: 6000
          })
          res.json({ token , result })
        }else {
          res.send({message : "Login failed"})
        }
      })
    } else {
      res.send({message : "User doesn't exist"})
    }
  })
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


  
  