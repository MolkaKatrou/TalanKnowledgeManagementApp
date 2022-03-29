const isEmpty = require('./IsEmpty');
const validator = require('validator');

module.exports = function ValidateLogin(data){
    let errors ={};
    data.Email = !isEmpty(data.Email) ? data.Email : "";
    data.Password = !isEmpty(data.Password) ? data.Password :"";


    if (!validator.isEmail(data.Email)){
        errors.Email ="The email format is incorrect. Please provide correct one";
    }
    if (validator.isEmpty(data.Email)){
        errors.Email ="Please enter the email adress";
    }
    if (validator.isEmpty(data.Password)){
        errors.Password ="Please enter the password";
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }
}


