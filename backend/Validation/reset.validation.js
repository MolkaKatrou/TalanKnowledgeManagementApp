const isEmpty = require('./IsEmpty');
const validator = require('validator');

module.exports = function ValidateLogin(data){
    let errors ={};
    data.password = !isEmpty(data.password) ? data.password :"";
    data.confirm = !isEmpty(data.confirm) ? data.confirm : "";


    if (validator.isEmpty(data.password)){
        errors.password ="Please enter your password";
    }
    if (validator.isEmpty(data.confirm)){
        errors.confirm ="Please enter the password to confirm";
    }
    if(!validator.equals(data.password, data.confirm)){
        errors.confirm = "The passwords don't match";
      }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}


