const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
// import {useNavigate} from "react-router-dom"
const postschema = new mongoose.Schema({
  title: {
    type: String,
    // required : true
  },
  imgurl: {
    type: String,
    // required : true
  },
  description: {
    type: String,
  },
  postid: {
    type: String,
  },
});

const PostModel = mongoose.model("posts", postschema);
// login schema
const registration = new mongoose.Schema({
  name: {
    type: String,
    required : true
  },
  email: {
    type:String,
    required : true
  },
  cnic:{
    type:Number,
    required:true
  },
  password: {
    type: Number,
    required : true
  },
  cpassword: {
    type: Number,
    required : true
  },
  userid: {
    type: String,
  },
});

const registerUser = mongoose.model("users", registration);

// create operation
router.post("/addnewpost", (req, res) => {
  const newStudent = new registerUser({
    name: req.body.name,
    email: req.body.email,
    cnic: req.body.cnic,
    postid: req.body.postid,
  });
  newStudent.save(function (err) {
    if (!err) {
      res.send("your data is stored successfully");
    } else {
      res.send(err);
    }
  });
});
// read operation
router.get("/getpost", (req, res) => {
  registerUser.find({}, function (docs, err) {
    if (!err) {
      res.send(docs);
    } else {
      res.send(err);
    }
  });
});
// update post

router.post("/getpostdata", (req, res) => {
  PostModel.find({ postid: req.body.postid }, (docs, err) => {
    if (!err) {
      res.send(docs.data);
    } else {
      res.send(err);
    }
  });
});

router.post("/updatepost", (req, res) => {
  PostModel.findOneAndUpdate(
    { postid: req.body.postid },
    {
      title: req.body.title,
      imgurl: req.body.imgurl,
      description: req.body.description,
    },
    (err) => {
      if (!err) {
        res.send("post is edit successfully");
      } else {
        res.send(err);
      }
    }
  );
});
router.post("/deletepost", (req, res) => {
  PostModel.findOneAndDelete({ postid: req.body.postid }, (err) => {
    if (!err) {
      res.send("post is delete successfully");
    } else {
      console.log(err);
    }
  });
});
// //users routes
// router.post("/addnewpost", (req, res) => {
//   const newuser = new registerUser({
//     name: req.body.name,
//     email: req.body.email,
//     cnic: req.body.cnic,
//   });
//   newuser.save(function (err) {
//     if (!err) {
//       res.send("new user added successfully");
//     } else {
//       res.send(err);
//     }
//   });
// });

router.post("/registeruser",(req,res)=>{
 
  const {name,email,password} =req.body;
  registerUser.findOne({email:email},(err,user)=>{
      if(user){
          res.send("user already exist")
       
      }else {
          const user = new registerUser({name,email,password})
          user.save(err=>{
              if(err){
                  res.send(err)
              }else{
                  res.send("you register sucessfull")
              }
          })
      }
  })


})

// dummy
// app.post("/Register",(req,res)=>{
//   console.log(req.body) 
//   const {name,email,password} =req.body;
//   User.findOne({email:email},(err,user)=>{
//       if(user){
//           res.send({message:"user already exist"})
//       }else {
//           const user = new User({name,email,password})
//           user.save(err=>{
//               if(err){
//                   res.send(err)
//               }else{
//                   res.send({message:"sucessfull"})
//               }
//           })
//       }
//   })


// })
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  registerUser.findOne({ email: email }, (err, user) => {
      if (user) {
          if (password === user.password) {
              res.send("Logged In!!!");
          } else {
              res.send("Incorrect Password!!!");
          }
      } else {
          res.send( "User not registered" );

      }
  })
});

module.exports = router;
