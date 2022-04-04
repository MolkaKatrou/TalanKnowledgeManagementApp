const UserModel = require("../models/users.model");
const ValidateUser = require("../Validation/users.validation");
const ValidateLogin = require("../Validation/Login.validation");
const ValidateReset = require("../Validation/reset.validation");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require('crypto')
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const usersModel = require("../models/users.model");


const transporter = nodemailer.createTransport(sendgridTransport({
  auth:{
    api_key: "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"
  }
  }))

  const AddUser = async (req, res) => {
  const { errors, isValid } = ValidateUser(req.body);
  try {
    if (!isValid) {
      res.status(404).json(errors);
    } else { 
      await UserModel.findOne({ email: req.body.email })
      .then(async (exist) => {
        if (exist) {
          errors.email = "This user already exists";
          res.status(404).json(errors);
        } else {
          const hash = bcrypt.hashSync(req.body.password, 10); //hashed password
          password = req.body.password
          req.body.password = hash;
          await UserModel.create(req.body);
          transporter.sendMail({
            to: req.body.email,
            from:"molka.katrou@ensi-uma.tn",
            subject:"User Identification",
            html:  `<p>Hello </strong><span style="text-transform:uppercase">${req.body.firstname}</span><strong></strong>, <p/>
            <p>Welcome to to our knowledge management application at TALAN <br/>
            <ul>
            <li>Your Email is : \n<b>${req.body.email} </li> <br/>
            <li>Your password is : \n<b>${password}</li> 
            </ul>
            Best regards.
            </p>` 
          })
         
          res.status(201).json({ message: "User added with success!" });
        }
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const FindAllUsers = async (req, res) => {
  try {
    const data = await UserModel.find();
    res.status(201).json(data);
  } catch (error) {
    console.log(error.message);
  }
};

const FindSingleUser = async (req, res) => {
  try {
    const data = await UserModel.findOne({ _id: req.params.id });
    res.status(201).json(data);
  } catch (error) {
    console.log(error.message);
  }
};

const UpdateUser = async (req, res) => {
  const { errors, isValid } = ValidateUser(req.body);
  try {
    if (!isValid) {
      res.status(404).json(errors);
    } else {
      const data = await UserModel.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );
      res.status(201).json(data);
    }
  } catch (error) {
    console.log(error.message);
  }
};

const DeleteUser = async (req, res) => {
  try {
    await UserModel.findOneAndDelete({ _id: req.params.id });
    res.status(201).json({ message: "User deleted with success!" });
  } catch (error) {
    console.log(error.message);
  }
};

const Login = async(req, res)=>{
  const {errors, isValid} = ValidateLogin(req.body)
 try {
    if(!isValid){
     res.status(404).json(errors)
    }else{
      UserModel.findOne({email: req.body.email})
    .then(user=>{
      if(!user){
        errors.email = "The user does not not exist!"
        res.status(404).json(errors)
      }else{
        bcrypt.compare(req.body.password, user.password)
        .then(isMatch=>{
          if(!isMatch){
            errors.password = "The password is incorrect"
            res.status(404).json(errors)
          }else{
            var token = jwt.sign({ 
              id: user._id,
              username: user.username,
              email: user.email,
              role: user.role,
              occupation: user.occupation,
              lastname: user.lastname,
              firstname: user.firstname,
              phone: user.phone
             }, 
               process.env.PRIVATE_KEY,  { expiresIn: '10d' });
               const {_id,username,email,role,occupation,lastname,firstname,phone} = user
               res.status(200).json({
               message: "success",
               token: "Bearer "+ token 
             })

          }
        })
      }
    })
    }
 } catch (error) {
  res.status(404).json(error.message);
 }
}



const Resetpassword = async (req, res) => {
  crypto.randomBytes(32, (err, buffer)=>{
    if (err){
      console.log(err)
    }
    const token = buffer.toString("hex")
    usersModel.findOne({email:req.body.email})
    .then(user =>{
      if(!user){
        return res.status(422).json({error: "user don't exist "})
      }

      user.resetToken = token
      user.expireToken = Date.now() + 36000
      user.save().then((result) => {
        transporter.sendMail({
          to: user.email,
          from :"molka.katrou@ensi-uma.tn",
          subject: "Password Reset",
          html: `<p>Your requested for password reset</p>
          <h5>Click in this link <a href="http://localhost:3000/resetpassword/${token}">Link<a/>to reset your password</h5>
          ` 

        })
        res.json({message:"check your email"})
      })

    })
  }
)

}
const Newpassword = (req, res) => {
  const newPassword = req.body.password
  const sentToken = req.body.token
  const { errors, isValid } = ValidateReset(req.body);
  UserModel.findOne({resetToken:sentToken})
  .then(user=>{
      if(!user){
          return res.status(422).json({error:"Try again session expired"})
      }
      bcrypt.hash(req.body.password,12).then(hashedpassword=>{
         req.body.password = hashedpassword
         user.resetToken = undefined
         user.expireToken = undefined
         user.save().then((saveduser)=>{
             res.json({message:"password updated success"})
         })
      })
  }).catch(err=>{
      console.log(err)
  })
}

const Test = (req, res) => {
  res.send("user")
};

const Admin =  (req, res) => {
  res.send("admin")
};

module.exports = {
  Admin,
  Test,
  Login,
  AddUser,
  FindAllUsers,
  FindSingleUser,
  UpdateUser,
  DeleteUser,
  Resetpassword,
  Newpassword
};
