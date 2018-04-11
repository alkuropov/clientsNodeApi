const mongoose = require('mongoose');

const clientSchema = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    name: String,
    phone: String,
},{timestamps: true});

module.exports = mongoose.model('Client', clientSchema);