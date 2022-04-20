const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const noteModel = new Schema ({

    createdby:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    
    category:{
        type: Schema.Types.ObjectId, 
        ref: 'category'
    },
    
    title: {
        type: String, 
        required: true},
    content: {
        type: String, 
        required: true
    },



 }, {timestamps: true})

module.exports = mongoose.model('notes', noteModel)