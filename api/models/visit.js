const mongoose = require('mongoose');

const visitSchema = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client'},
    startDate: Date,
    endDate: Date,
    duration: Number,
    description: String,
    amount: Number,
    status: Boolean,
},{timestamps: true});

module.exports = mongoose.model('Visit', visitSchema);

// При удалении посещения обновляем массив посещений у клиента
visitSchema.pre('remove', function(next) {
    
    mongoose.models['Client'].update (
        {_id: this.clientId},
        {$pull: {visits: this._id}}
    )
    .exec();

    next();

    console.log("У клиента " + this.clientId + " удален визит " + this._id)
});