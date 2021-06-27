const express = require("express");
const db = require("../database");
const {
  getAllEquipments,
  getEquipmentsToRent,
  getEquipmentsToBuy,
  getEquipmentByPriceInc,
  updateInCartValue,
  removeItemFromCart,
  getThreeRandomBlogs,
  viewPostByUser,
  viewBlogByUser,
  deleteOnePostByUser
} = require('../database/query.js')
const app = express();
const port = process.env.PORT || 3001;
var cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const stripe = require ('stripe')('sk_test_51J1vqqIjewuKal2UQMO2GnNXUHsOpis3y9RzdOsonFTpOaZ8KSR6Sfwysof7IqAMvd6xI1XdKgYOLI3ppoM9lqt300HHdrcyFP');
const uuid = require('uuid').v4
app.use(cors());

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
  console.log(req.body)
  try {
    const image = req.body.data;
    let data = req.body;
    console.log("hereeeeeeeererererer", data)
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

app.post("/api/postblog", async (req, res) => {
  try {
    const fileStr = req.body.data;
    let data = req.body;
    const result = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "Escape",
    });
    console.log(result.secure_url, 'aslema');
    db.uploadImage(data, result.secure_url, (err, result) => {
      if (err) console.log(err);
      console.log(result);
      res.sendStatus(result ? 200 : 500)
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

//Get three blogs 
app.get('/api/homeBologs', (req, res) => {
  getThreeRandomBlogs().then((result) => {
    res.status(200).json(result[0])
  })
    .catch((err) => { console.log(err); })
})
////////////////////////////////////////////////////////////


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
  getEquipmentByPriceInc(type).then((data) => {
    if (type === 'toRent') {
      res.send(data[0])
    } else if (type === 'toSell') {
      res.send(data[0])
    }
  }).catch((err) => { console.log(err); })
})

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
  removeItemFromCart(id).then(() => {
    res.status(201).send('removed from card')
  }).catch((err) => { console.log(err); })
})

//for the user to view his own post 
app.get("/api/viewpost/:id/:type", (req, res) => {
  let id = req.params.id
  let type = req.params.type
  if (type === "posts") {
    viewPostByUser(id).then((result) => {
      if (result[0].length > 0) {
        console.log(result[0]);
        res.status(200).json(result[0])
      } else {
        res.status(200).json('You don"t have any post');
      }
    }).catch((err) => { console.log(err); })
  } else {
    if (type === "blogs") {
      viewBlogByUser(id).then((result) => {
        if (result[0].length > 0) {
          res.status(200).json(result[0])
        } else {
          res.status(200).json('You don"t have any post');
        }
      }).catch((err) => { console.log(err); })


    }
  }
})

//For user to delete posts 
app.delete("/api/deletePostByUser/:id/:type", (req, res) => {
  let id = req.params.id
  let type = req.params.type
  let table;
  if (type === 'posts') {
    table = 'equipments';
  } else {
    table = 'blogs';
  }
  deleteOnePostByUser(id, table).then((result) => {
    console.log(result);
  })
})



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
      res.send("user already exists")
    }
  });

  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      console.log(err);
    }
    db.createUser(req.body, hash, (err, result) => {
      if (err) res.send(err);
      res.send({ auth: true, result });
    });
  });
});

const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    res.send("No token")
  } else {
    jwt.verify(token, "jwtSecret", (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "auth failed" });
      } else {
        req.body.userID = decoded.id; // a verifier 
        next()  // a verifier
      }
    })
  }
}

app.post('/signin', (req, res) => {
  db.selectUserByEmail(req.body, (err, result) => {
    if (err) res.send({ err: err });
    if (result.length > 0) {
      bcrypt.compare(req.body.password, result[0].password, (err, response) => {
        if (err) res.send(err);
        if (response) {
          const id = result[0].id;
          const token = jwt.sign({ id }, "jwtSecret", {
            expiresIn: 6000
          })
          res.json({ auth: true, token, id: result[0].userID })
        } else {
          res.send({ message: "Wrong password", auth: false })
        }
      });
    } else {
      res.send({ message: "User doesn't exist", auth: false })
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

app.post("/api/postBlog", (req, res) => {
console.log(req.body);
  db.postBlog(req.body, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  })
});

app.get('/api/blogs', (req, res) => {
  db.blog(function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  })
})



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
  db.deleteBlog(req.params.id, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.status(201).send(result);
    }
  });
});

///// InCart
app.post('/inCart', (req, res) => {
  db.InCart(req.body, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.status(201).send(result);
    }
  })
})

app.delete(`/OutCart/:itemId/:userId`, (req, res) => {
  db.OutCart(req.params.itemId, req.params.userId, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.status(204).send(result);
    }
  })

})

app.delete(`/EmptyCart/:userId`, (req, res) => {
  console.log("user id", req.params.userId)
  db.EmptyCart(req.params.userId, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.sendStatus(result ? 200 : 500);
    }
  })
})







app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});



//for payment 
app.post("/checkout", async (req, res) => {
  console.log("Request:", req.body);
  let totalPrice =  0;
  let name ="";
  let error;
  let status;
  try {
    const { items, token } = req.body;
    items.map((item) => {
      totalPrice+= item.price
      name += ",  name:  " +item.name + " and id:  " + item.id;
    })
    totalPrice += 10;
    console.log(totalPrice)
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    });

    const idempotency_key = uuid();
    const charge = await stripe.charges.create(
      {
        amount: totalPrice* 100,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: `Purchased : ${name}`,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip
          }
        }
      },
      {
        idempotency_key
      }
    );
    console.log("Charge:", { charge });
    status = "success";
  } catch (error) {
    console.error("Error:", error);
    status = "failure";
  }

  res.json({ error, status });
});
