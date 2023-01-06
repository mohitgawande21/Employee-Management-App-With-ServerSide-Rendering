const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: Number,
    },
    address: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
    file: {
        type:Object
    }
})

Employee = mongoose.model('employees', Schema)
module.exports = Employee