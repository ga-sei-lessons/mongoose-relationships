const mongoose = require('mongoose') 
mongoose.connect('mongodb://localhost/f-rel') 

// shortcut to mongoose.connection object
const db = mongoose.connection 

db.once('open', function() {
      console.log(`Connected to MongoDB at ${db.host}:${db.port}`) 
}) 

db.on('error', function(err) {
      console.error(`Database error:\n${err}`) 
})