const express = require("express");
const db = require("../database");

var cors = require('cors')

var cloudinary = require("cloudinary").v2
cloudinary.config({
  cloud_name: 'rbkescape',
  api_key: '451369544519695',
  api_secret: 'VIQOj1T-DuUD0goCYRK3WwqeK2k'

})


const app = express();
app.use(cors())
const port = process.env.PORT || 3001



app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: "50mb", extended: true }))


const fileupload = require('express-fileupload');
app.use(fileupload({ useTempFiles: true }))




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



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});