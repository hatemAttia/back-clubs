var mongoose = require('mongoose');
// Setup schema
var domaineSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    categories: [{

        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',

    }],

}, {
    timestamps: true,
});

domaineSchema.virtual('id').get(function() {
    return this._id.toHexString();

});
domaineSchema.set('toJSON', {
    virtuals: true,
});








module.exports = mongoose.model('domaine', domaineSchema)