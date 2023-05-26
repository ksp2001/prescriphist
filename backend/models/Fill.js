const mongoose = require('mongoose');

const FillSchema = new mongoose.Schema({
    appointmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment',
        required: true,
    },
    cost: {type: Number},
    dispensary: {type: String},
    notes: {type: String},
    date: {type: Date, default: Date.now, required: true},
});

module.exports = mongoose.model('Fill', FillSchema);