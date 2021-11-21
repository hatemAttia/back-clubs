var mongoose = require('mongoose');



const reviewSchema = mongoose.Schema({
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
}, {
    timestamps: true,
})




// Setup schema
var clubSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,

    },
    description: {
        type: String,
        required: true,

    },
    image: {
        type: String,
        required: true,

    },
    adresse: {
        type: String,
        required: true,

    },
    ville: {
        type: String,
        required: true
    },

    longitude: {
        type: Number,
        required: true,

    },
    latitude: {
        type: Number,
        required: true,

    },

    email: {
        type: String,
        required: true,

    },
    num: {
        type: Number,
        required: true,

    },
    status: {
        type: String,
        enum: ['Etatique', 'Privé'],
        // required: true,

    },
    reviews: [reviewSchema],
    rating: {
        type: Number,
        // required: true,
        default: 0,
    },
    numReviews: {
        type: Number,
        // required: true,
        default: 0,
    },




}, {
    timestamps: true,
});
clubSchema.virtual('id').get(function() {
    return this._id.toHexString();

});
clubSchema.set('toJSON', {
    virtuals: true,
});
module.exports = mongoose.model('club', clubSchema);