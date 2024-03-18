const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: [true, "enter username"]
    },
    admission: {
        type: String,
        // required: [true, "enter email"]
    },
    
    stream: {
        type: String,
    },
    password: {
        type: String,
        minLength: 6,
        select: true,
    },
    
    
    
    createdAt: {
        type: Date,
        default: Date.now(),
    },

});

const User = mongoose.model('user',userSchema);

module.exports = User;