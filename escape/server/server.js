const express = require("express");
const db = require("../database");
const {getAllEquipments, getEquipmentsToRent, getEquipmentsToBuy, getEquipmentByPriceInc, updateInCartValue, getElementInCart} = require('../database/query.js')
const app = express();
const port = process.env.PORT || 3001;
var cors = require('cors')
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

//get all equipmenets
app.get('/api/allEquipments', (req, res) => {
  getAllEquipments().then( (data) => {
    res.send(data[0])
  })
})

//get equipToBeRent
app.get('/api/toRent', (req, res) => {
  getEquipmentsToRent().then( (data) => {
    res.send(data[0])
  })
})

//get equipToBesold
app.get('/api/toBuy', (req, res) => {
  getEquipmentsToBuy().then( (data) => {
    res.send(data[0])
  }).catch((err) => {console.log(err);})
})

//filter by price
app.get('/api/select/:price', (req, res) => {
  let price = req.params.price;
  getEquipmentByPriceInc(price).then((data) => {
    if(price === 'priceRent') {
    res.send( data[0].filter((element) => {
           return element.toRent
      }))
    } else if (price === 'priceSell') {
      res.send( data[0].filter((element) => {
        return element.toSell
   }))
    }
  }).catch((err) => {console.log(err);})
})

//update item in cart
app.patch('/api/catItem/:id', (req, res) => {
  let id = req.params.id;
  updateInCartValue(id).then(() => {
    res.status(201).send('updated')
  }).catch((err) => {console.log(err);})
})

//get element inCart

app.get('/api/inCart', (req, res) => {
  getElementInCart().then((result) => {
    console.log(result[0])
    res.status(200).send(result[0])
  })
  .catch((err) => { console.log(err);})
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