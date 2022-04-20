const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const noteModel = new Schema ({
    
    category:{
        type: mongoose.Schema.Types.ObjectId, ref: 'category'
    },

    createdby:{
        type: mongoose.Schema.Types.ObjectId, ref: 'users'
    },
    
    Title: {
        type: String, 
        required: true},
    Content: {
        type: String, 
        required: true
    },



 }, {timestamps: true})

module.exports = mongoose.model('notes', noteModel)