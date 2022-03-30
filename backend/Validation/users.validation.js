const isEmpty = require('./IsEmpty');
const validator = require('validator');

module.exports = function ValidateUser(data){
    let errors ={};
    data.email = !isEmpty(data.email) ? data.email : "";
    data.username = !isEmpty(data.username) ? data.username : "";
    data.password = !isEmpty(data.password) ? data.password :"";
    data.occupation = !isEmpty(data.occupation) ? data.occupation : "";
    data.role = !isEmpty(data.role) ? data.role : "";


    if (!validator.isEmail(data.email)){
        errors.email ="The email format is incorrect. Please provide correct one";
    }
    if (validator.isEmpty(data.email)){
        errors.email ="Please enter the email adress";
    }
    if (validator.isEmpty(data.username)){
        errors.username ="Please enter the username";
    }
    if (validator.isEmpty(data.password)){
        errors.password ="Please enter the password";
    }
    if (validator.isEmpty(data.occupation)){
        errors.occupation ="Please enter the user's occupation at the TALAN";
    }
    if (validator.isEmpty(data.role)){
        errors.role ="Please enter the user's role";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}


