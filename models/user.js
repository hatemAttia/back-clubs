var mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// Setup schema
var userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    phonenumber: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    // ville: {
    //     type: String,
    //     required: true
    // },


}, {
    timestamps: true,
})
userSchema.methods.generateTokens = function() {
    const token = jwt.sign({ _id: this._id, email: this.email, role: this.role }, 'privateKey', { expiresIn: "1h" })
    return token;
};

userSchema.virtual('id').get(function() {
    return this._id.toHexString();

});
userSchema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('user', userSchema)