const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
    name: {
        type: String,
        required: 'A name for the recipe'
    },
    createDate: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: String,
        required: 'An author is needed for the recipe'
    },
    grains: {
        type: [String],
        default: undefined
    },
    hops: {
        type: [String],
        default: undefined
    },

    yeast: {
        type: String,
        required: 'It\'s not beer without yeast!'
    },
    process: {
        type: [String],
        default: undefined
    }
});

module.exports = mongoose.model('Recipe', RecipeSchema);