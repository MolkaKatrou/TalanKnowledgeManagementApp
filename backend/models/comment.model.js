const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const commentModel = new Schema ({

    user: {
        type:String
    },
    comment:{
        type:String,
    },
 
}, {timestamps: true})

module.exports = mongoose.model('comments', commentModel)
