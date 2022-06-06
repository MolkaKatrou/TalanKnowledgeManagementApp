const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const noteModel = new Schema ({
    createdby:{
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    
    category:{
        type: Schema.Types.ObjectId, 
        ref: 'category'
    },
    
    title: {
        type: String, 
        required: true
    },
    content: {
        type: String, 
        required: true
    },
    comments: [{ 
        type: Schema.Types.ObjectId, 
        ref:'comment'  
    }],

    likes: { 
        type: [String], 
        default: [] 
    }, 

    bookmarks: { 
        type: [String], 
        default: [] 
    },


 }, {timestamps: true})

module.exports = mongoose.model('notes', noteModel)