const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const UserModel = new Schema ({

    user : {
        type: Schema.Types.ObjectId
    },

    email: {type: String, required: true},
    username : {type: String, required: true},
    password : {type: String, required: true},
    occupation: {type: String, required: true},
    role: {type: String, required: true},
}, {timestamps: true})

module.exports = mongoose.model('users', UserModel)