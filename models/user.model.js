const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: 'A Username is required'
    },
    createDate: {
        type: Date,
        default: Date.now
    },
    email: {
        type: String,
        required: 'An Email is required'
    },
    password: {
        type: String,
        default: undefined,
        required: 'Accounts must have a string password'
    }
});

module.exports = mongoose.model('User', UserSchema);