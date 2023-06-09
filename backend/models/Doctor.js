const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
    name: {type: String, required: true},
    address: {type: String},
    speciality: {type: String},
    notes: {type: String},
    phone: {type: String},
});

module.exports = mongoose.model('Doctor', DoctorSchema);