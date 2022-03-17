const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    dob: Date,
    // 1:M ref
    blogs: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BlogPost'
    }]
});

module.exports = mongoose.model('User', userSchema)