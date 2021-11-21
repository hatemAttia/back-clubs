var mongoose = require('mongoose');
// Setup schema
var subscribeSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },


}, {
    timestamps: true,
});

subscribeSchema.virtual('id').get(function() {
    return this._id.toHexString();

});
subscribeSchema.set('toJSON', {
    virtuals: true,
});








module.exports = mongoose.model('subscribe', subscribeSchema)