const mongoose = require('mongoose');

const clientSchema = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    name: String,
    phone: String,
    description: String,
    visits: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Visit' }]
},{timestamps: true});

module.exports = mongoose.model('Client', clientSchema);