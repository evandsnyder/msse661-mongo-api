const controllers = require('../controllers/recipes.controller');
const express = require('express');

const recipeRoutes = express.Router();

recipeRoutes
    .get('/', controllers.getAllRecipes)
    .post('/', controllers.createRecipe);

let id_route = '/:recipeId';
recipeRoutes
    .get(id_route, controllers.getRecipeById)
    .post(id_route, controllers.updateRecipe)
    .delete(id_route, controllers.deleteRecipe);

module.exports = recipeRoutes;