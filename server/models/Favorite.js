const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = mongoose.Schema({
    userFrom: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    RecipeId : {
        type: String
    },
    recipeTitle: {
        type: String
    },
    recipePoster: {
        type: String
    },
    recipereadyInMinutes : {
        type: String
    }

}, { timestamps: true })


const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = { Favorite }
