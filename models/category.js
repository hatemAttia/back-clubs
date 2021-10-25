var mongoose = require('mongoose');
// Setup schema
var categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});







module.exports = mongoose.model('category', categorySchema)