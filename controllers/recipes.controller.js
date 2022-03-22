const e = require('express');
const Recipe = require('../models/recipe.model');

exports.getAllRecipes = (request, response) => {
    Recipe.find({}, (err, data) => {
        console.log("getting all recipes...");
        if(err){
            response.send(err);
            console.log(err);
        }

        response.json(data);
    });
}

exports.getRecipeById = (request, response) => {
    Recipe.findById(request.params.recipeId, (err, data) =>{
        if(err) response.send(err);

        response.json(data);
    })
}

exports.createRecipe = (request, response) => {
    let newRecipe = new Recipe({
        name: request.body.name,
        createdBy: request.body.author,
        grains: request.body.grains,
        hops: request.body.hops,
        yeast: request.body.yeast,
        process: request.body.process
    });
    newRecipe.save((err,data) =>{
        if(err) response.send(err);
        response.json(data);
    });
}

exports.updateRecipe = (request, response) => {
    Recipe.findOneAndUpdate({_id: request.params.recipeId},
        request.body,
        {new: true},
        (err, data) => {
            if(err) response.send(err);

            response.send(data);
    })
}

exports.deleteRecipe = (request, response) => {
    Recipe.deleteOne({_id: request.params.recipeId}, (err) =>{
        if(err) response.send(err);
        response.json({status: 'success'});
    })
}