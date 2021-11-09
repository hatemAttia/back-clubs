var mongoose = require('mongoose');
// Setup schema
var categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    clubs: [{

        type: mongoose.Schema.Types.ObjectId,
        ref: 'club',

    }],
}, {
    timestamps: true,
});

categorySchema.virtual('id').get(function() {
    return this._id.toHexString();

});
categorySchema.set('toJSON', {
    virtuals: true,
});





module.exports = mongoose.model('category', categorySchema)