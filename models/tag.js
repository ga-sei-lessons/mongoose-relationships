const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
    name: String,
    blogs: [{type: mongoose.Schema.Types.ObjectId, ref: 'BlogPost'}]
});

module.exports = mongoose.model('Tag', tagSchema)