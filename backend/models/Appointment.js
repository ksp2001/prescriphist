const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    doctorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Doctor',
            required: true,
        },
    date: {type: Date, default: Date.now, required: true},
    prescription: {type: String},
    cost: {type: Number},
    notes: {type: String},
})

module.exports = mongoose.model('Appointment', AppointmentSchema);