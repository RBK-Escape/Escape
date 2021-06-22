 Already registered <a href="#">sign in?</a> s//ign up 

 Forgot <a href="#">password?</a>  //sign in 

////////////// post callback///////////
 app.post('/signin', (req, res) => {
  
    let {email, password} = req.body
   db.query("SELECT * FROM users WHERE email = ? ;", email, 
   (err,result) => {
     if(err){
       res.send({err:err});
     }
     if(result.length >0){
       bcrypt.compare(password,result[0].password,(error,response) => {
         if(response){
           res.send(result);
         }else {
           res.send({message: "Wrong email/password combination"});
         }
       })
     }else {
       res.send({message: "user doesn't exist"});
     }
   }
   )




   let existingUser = await db.queryAsync("SELECT * FROM users WHERE email = ? ;" , [email] )
    console.log(existingUser)
    if (existingUser) {
      throw "User already exists"
    }
    let newPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
    let user = await db.queryAsync("INSERT INTO users (fullName,password,phoneNumber,adress,email,image,pocket) VALUES (?,?,?,?,?);" ,[fullname,newPassword,phone,adress,email])
    console.log(newPassword)
    console.log(user)
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





  //////////////////////////signin//////////////////////////////////
async (req, res) => {
  try {
    let {email, password} = req.body
    let user = await db.queryAsync(`SELECT * FROM users WHERE email = ${email} ;`)
    console.log(user)
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
  }}




  /////////////////signup////////////////


   async (req, res) => {
  try {
    let { fullname , email, password , phone , adress } = req.body
    let existingUser = await db.queryAsync("SELECT * FROM users WHERE email = ? ;" , [email] )
    console.log(existingUser)
    if (existingUser) {
      throw "User already exists"
    }
    let newPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
    let user = await db.queryAsync("INSERT INTO users (fullName,password,phoneNumber,adress,email,image,pocket) VALUES (?,?,?,?,?);" ,[fullname,newPassword,phone,adress,email])
    console.log(newPassword)
    console.log(user)
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
}

/////////////////////////////////
const getUserByEmail = function (data,callback){
  let query = "SELECT * FROM users WHERE email = ? ;"
  db.query(query,data,callback)
};

/////////////////////////////////////////


db.selectUserByEmail(req.body , (err,result) => {
    if(err) res.send({err:err})
    if(result.length > 0){
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
      
    } else {
      res.send({message : "User doesn't exist"})
    }
  })