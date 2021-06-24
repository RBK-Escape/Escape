const express = require("express");
const db = require("../database");
const {
  getAllEquipments,
  getEquipmentsToRent,
  getEquipmentsToBuy,
  getEquipmentByPriceInc,
  updateInCartValue,
  removeItemFromCart,
} = require("../database/query.js");
const app = express();
const port = process.env.PORT || 3001;
var cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

app.use(cors());

var cors = require("cors");

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

const fileupload = require("express-fileupload");
app.use(fileupload({ useTempFiles: true }));

var cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "rbkescape",
  api_key: "451369544519695",
  api_secret: "VIQOj1T-DuUD0goCYRK3WwqeK2k",
});

app.post("/api/upload", async (req, res) => {
  try {
    const image = req.body.data;
    let data = req.body;
    const result = await cloudinary.uploader.upload(image, {
      upload_preset: "Escape",
    });
    if (data.rent === "rent") {
      db.postRent(data, result.secure_url, (err, result) => {
        if (err) console.log(err);
        console.log(result);
      });
    } else {
      db.postSell(data, result.secure_url, (err, result) => {
        if (err) console.log(err);
        console.log(result);
      });
    }
  } catch (err) {
    console.log("Error", err);
    return res.status(400).json({ error: err });
  }
});

app.post("http://localhost:3001/api/postblog", async (req, res) => {
  try {
    const fileStr = req.body.data;
    let data = req.body;
    const result = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "Escape",
    });
    console.log(result);
    db.uploadImage(data, result.secure_url, (err, result) => {
      if (err) console.log(err);
      console.log(result);
    });
    console.log(fileStr);
  } catch (error) {
    console.log(error);
  }
});

///////////////////////////////////////////////////////////
// fetch element for the store.js component
//////////////////////////////////////////////////////////

//get all equipmenets
app.get("/api/allEquipments", (req, res) => {
  getAllEquipments().then((data) => {
    res.send(data[0]);
  });
});

//get equipToBeRent
app.get("/api/toRent", (req, res) => {
  getEquipmentsToRent().then((data) => {
    res.send(data[0]);
  });
});

app.get("/api/toBuy", (req, res) => {
  getEquipmentsToBuy().then((data) => {
    res.send(data[0]);
  });
});
////////////////////////////////////////////////////////////

////From bechir
app.get("/api/searchProducts", (req, res) => {
  db.searchProducts(function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(err);
    }
  });
});
//get equipToBesold
app.get("/api/toBuy", (req, res) => {
  getEquipmentsToBuy()
    .then((data) => {
      res.send(data[0]);
    })
    .catch((err) => {
      console.log(err);
    });
});

//filter by price
app.get("/api/select/:price", (req, res) => {
  let type = req.params.price;
  getEquipmentByPriceInc(type)
    .then((data) => {
      if (type === "toRent") {
        res.send(data[0]);
      } else if (type === "toSell") {
        res.send(data[0]);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

//update item in cart
app.patch("/api/catItem/:id", (req, res) => {
  let id = req.params.id;
  updateInCartValue(id)
    .then(() => {
      res.status(201).send("updated");
    })
    .catch((err) => {
      console.log(err);
    });
});

//Remove item from cart
app.patch("/api/removeFromCart/:id", (req, res) => {
  let id = req.params.id;
  removeItemFromCart(id)
    .then(() => {
      res.status(201).send("removed from card");
    })
    .catch((err) => {
      console.log(err);
    });
});

////////////////////////////////////////////////////////////

////From bechir
app.get("/api/searchProducts", (req, res) => {
  db.searchProducts(function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});
///////////////////auth////////////////////

app.post("/signup", (req, res) => {
  db.selectUserByEmail(req.body, (err, result) => {
    if (err) res.send({ err: err });
    if (result.length > 0) {
      throw "user already exists";
    }
  });

  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      console.log(err);
    }
    db.createUser(req.body, hash, (err, result) => {
      if (err) console.log(err);
      res.send(result);
    });
  });

  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      console.log(err);
    }
    db.createUser(req.body, hash, (err, result) => {
      if (err) console.log(err);
      res.send(result);
    });
  });
});

app.post("/signin", (req, res) => {
  db.selectUserByEmail(req.body, (err, result) => {
    if (err) res.send({ err: err });
    if (result.length > 0) {
      bcrypt.compare(req.body.password, result[0].password, (err, response) => {
        if (err) res.send(err);
        if (response) {
          const id = result[0].id;
          const token = jwt.sign({ id }, "jwtSecret", {
            expiresIn: 6000,
          });
          res.json({ token, result });
        } else {
          res.send({ message: "Login failed" });
        }
      });
    } else {
      res.send({ message: "User doesn't exist" });
    }
  });
});

// app.get("/api/homeProducts", (req, res) => {
//   db.homeProducts(function (err, result) {
//     if (err) {
//       res.send(err);
//     }
app.get("/api/homeProducts", (req, res) => {
  db.homeProducts(function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});

// app.post("/api/postBlog", (req, res) => {
//   // db.postItem(
//   //   [req.body.place, req.body.image, req.body.description],
//   //   (err, result) => {
//   //     if (err) {
//   //       console.log(err);
//   //     } else {
//   //       res.json(result);
//   //     }
//   //   }
//   // );

//   db.postBlog(req.body, (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.json(result);
//     }
//   });
// });

app.get("/api/blogs", (req, res) => {
  db.blog(function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});

///////Admin

app.get("/admin/data", (req, res) => {
  db.getDataAdmin(function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});

app.patch("/admin/patch/:id", (req, res) => {
  console.log(req.params.id);
  db.acceptPost(req.params.id, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.status(201).send(result);
    }
  });
});

app.delete("/admin/delete/:id", (req, res) => {
  console.log(req.params.id);
  db.deletePost(req.params.id, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.status(201).send(result);
    }
  });
});

////// admin blog

app.get("/admin/blog", (req, res) => {
  db.getBlogAdmin(function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});

app.patch("/admin/blog/patch/:id", (req, res) => {
  console.log(req.params.id);
  db.acceptBlog(req.params.id, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.status(201).send(result);
    }
  });
});

app.delete("/admin/blog/delete/:id", (req, res) => {
  console.log(req.params.id);
  db.deleteBlog(req.params.id, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.status(201).send(result);
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
