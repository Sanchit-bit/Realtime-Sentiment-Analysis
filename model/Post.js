const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
})


module.exports =  mongoose.model('Post', PostSchema);