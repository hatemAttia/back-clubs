var mongoose = require('mongoose');
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
    longitude: {
        type: Number,
        required: true,

    },
    latitude: {
        type: Number,
        required: true,

    },
    category: {

        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',

    },
    email: {
        type: String,
        required: true,

    },
    num: {
        type: Number,
        required: true,

    },




});
module.exports = mongoose.model('club', clubSchema);