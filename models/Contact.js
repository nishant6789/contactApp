const mongoose = require('mongoose')
const {Schema} = mongoose
const ContactSchema = new Schema({
    firstname : {
        type : String,
        required : true,
    },
    lastname : {
        type : String,
        required : true,
    },
    gender : {
        type : String,
        required : true
    },
    addressLine1 : {
        type : String,
        required : true
    },
    addressLine2 : {
        type : String
    },
    city : {
        type : String,
        required : true
    },
    country : {
        type : String,
        required : true
    },
    zipcode : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    date: {
        type: Date,
        default: Date.now
    } 
}) 
module.exports = mongoose.model('Contacts', ContactSchema)