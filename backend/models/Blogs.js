const mongoose = require('mongoose')
const { Schema } = mongoose;

const blogSchema = new Schema({

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    title: {
        type: String,
        required: true
    },
    blog: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('blog', blogSchema);