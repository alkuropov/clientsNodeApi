const mongoose = require('mongoose');

const visitSchema = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client'},
    startDate: Date,
    endDate: Date,
    duration: Number,
    amount: Number,
    status: Boolean,
},{timestamps: true});

module.exports = mongoose.model('Visit', visitSchema);