const isEmpty = require('./IsEmpty');
const validator = require('validator');

module.exports = function ValidateLogin(data){
    let errors ={};
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password :"";


    if (!validator.isEmail(data.email)){
        errors.email ="The email format is incorrect. Please provide correct one";
    }
    if (validator.isEmpty(data.email)){
        errors.email ="Please enter the email address";
    }
    if (validator.isEmpty(data.password)){
        errors.password ="Please enter the password";
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }
}


