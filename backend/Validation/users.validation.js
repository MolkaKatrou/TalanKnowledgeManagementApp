const isEmpty = require('./IsEmpty');
const validator = require('validator');

module.exports = function ValidateUser(data){
    let errors ={};
    data.Email = !isEmpty(data.Email) ? data.Email : "";
    data.Username = !isEmpty(data.Username) ? data.Username : "";
    data.Password = !isEmpty(data.Password) ? data.Password :"";
    data.Role = !isEmpty(data.Role) ? data.Role : "";


    if (!validator.isEmail(data.Email)){
        errors.Email ="The email format is incorrect. Please provide correct one";
    }
    if (validator.isEmpty(data.Email)){
        errors.Email ="Please enter the email adress";
    }
    if (validator.isEmpty(data.Username)){
        errors.Username ="Please enter the username";
    }
    if (validator.isEmpty(data.Password)){
        errors.Password ="Please enter the password";
    }
    if (validator.isEmpty(data.Role)){
        errors.Role ="Please enter the user role at the company";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}


