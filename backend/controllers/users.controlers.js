const Users = require('../models/users.model')
const ValidateUser = require('../Validation/users.validation')
const ValidateLogin = require('../Validation/Login.validation')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const AddUser = async (req, res) => {
    const { errors, isValid } = ValidateUser(req.body)
    try {
        if (!isValid) {
            res.status(404).json(errors)
        } else {
            await Users.findOne({ Email: req.body.Email })
                .then(async (exist) => {
                    if ((exist)) {
                        errors.Email = "This user already exists"
                        res.status(404).json(errors)
                    } else {
                        const hash = bcrypt.hashSync(req.body.Password, 10) //hashed password
                        req.body.Password = hash
                        await Users.create(req.body)
                        res.status(201).json({ message: 'User added with success!' })
                    }
                })
        }

    } catch (error) {
        console.log(error.message)
    }
};

const FindAllUsers = async (req, res) => {
    try {
        const data = await Users.find()
        res.status(201).json(data)
    } catch (error) {
        console.log(error.message)

    }
}

const FindSingleUser = async (req, res) => {
    try {
        const data = await Users.findOne({ _id: req.params.id })
        res.status(201).json(data)
    } catch (error) {
        console.log(error.message)

    }
}

const UpdateUser = async (req, res) => {
    const { errors, isValid } = ValidateUser(req.body)
    try {
        if (!isValid) {
            res.status(404).json(errors)
        } else {
            await Users.findOne({ Email: req.body.Email })
                .then(async (exist) => {
                  
                        const data = await Users.findOneAndUpdate(
                            { _id: req.params.id },
                            req.body,
                            { new: true }
                        );
                        res.status(201).json(data);
                    
                })
        }

    }



    catch (error) {
        console.log(error.message)

    }
}

const DeleteUser = async (req, res) => {
    try {
        await Users.findOneAndDelete({ _id: req.params.id })
        res.status(201).json({ message: 'User deleted with success!' })
    } catch (error) {
        console.log(error.message)

    }
}

const Login = async(req, res) => {
    const {errors, isValid} = ValidateLogin(req.body)
    try {
        if(!isValid){
            res.status(404).json(errors)

        }else{
            Users.findOne({Email : req.body.Email})
            .then(user =>{
                if(!user){
                    errors.Email ="The User doesn't exist"
                    res.status(404).json({errors})
                }else{
                    bcrypt.compare(req.body.Password, user.Password)
                    .then(isMatch =>{
                        if(!isMatch){
                            errors.Password="incorrect password"
                            res.status(404).json(errors)
                        }else{
                           var token = jwt.sign({
                               id: user._id,
                               username:user.Username,
                               email:user.Email

                            }, process.env.PRIVATE_KEY, {expiresIn :'1h'});
                           res.status(200).json({
                              message:"success",
                              token: token

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

module.exports = {
    Login,
    AddUser,
    FindAllUsers,
    FindSingleUser,
    UpdateUser,
    DeleteUser
}