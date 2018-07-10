const Visit = require('../models/visit');

const mongoose = require('mongoose');

const clientSchema = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    name: String,
    phone: String,
    description: String,
    visits: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Visit' }]
},{timestamps: true});

module.exports = mongoose.model('Client', clientSchema);

// При удалении клиента ищем и удаляем все его посещения
clientSchema.pre('remove', function(next) {

    Visit.deleteMany(
        {clientId: this._id}
    )
    .exec();
    next();

    console.log("Удален клиент " + this._id)
});