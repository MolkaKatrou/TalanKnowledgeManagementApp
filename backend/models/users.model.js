const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const UserSchema = new Schema ({
    Email: {type: String, required: true},
    Username : {type: String, required: true},
    Password : {type: String, required: true},
    Role: {type: String, required: true}
}, {timestamps: true})

module.exports = mongoose.model('users', UserSchema)