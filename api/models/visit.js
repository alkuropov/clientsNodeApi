const mongoose = require('mongoose');

const visitSchema = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client'},
    startDate: Date,
    endDate: String,
    status: String,
    amount: Number
},{timestamps: true});

module.exports = mongoose.model('Visit', visitSchema);