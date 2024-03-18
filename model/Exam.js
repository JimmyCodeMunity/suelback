const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
    unit: {
        type: String,
        // required: [true, "enter username"]
    },
    admission: {
        type: String,
        // required: [true, "enter email"]
    },
    
    marks: {
        type: String,
    },
    lecturer: {
        type: String,
    },
    
    
    
    createdAt: {
        type: Date,
        default: Date.now(),
    },

});

const Exam = mongoose.model('exams',examSchema);

module.exports = Exam;