const UserModel = require("../models/users.model");
const ValidateUser = require("../Validation/users.validation");
const ValidateLogin = require("../Validation/Login.validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
          req.body.password = hash;
          await UserModel.create(req.body);
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
      await UserModel.findOne({ email: req.user.email }).then(async (exist) => {
        const data = await UserModel.findOneAndUpdate(
          { _id: req.params.id },
          req.body,
          { new: true }
        );
        res.status(201).json(data);
      });
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
              name: user.name,
              email: user.email,
              role: user.role
             }, 
               process.env.PRIVATE_KEY,  { expiresIn: '1h' });
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
};
