const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: [true, "enter username"]
    },
    phone: {
        type: String,
        // required: [true, "enter email"]
    },
    
    stream: {
        type: String,
    },
    unit: {
        type: String,
    },

    email: {
        type:String,
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

const Teacher = mongoose.model('teachers',teacherSchema);

module.exports = Teacher;