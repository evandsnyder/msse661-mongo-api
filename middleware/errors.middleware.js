exports.error404 = (request, response, next) => {
    next({message: 'Not Found', status: 404});
};


exports.error500 = (error, request, response, next) => {
    response.status(error.status || 500);
    response.json({
        error: {
            message: error.message
        }
    });
};


exports.logger = (port) => {
    return () => {
        console.log(`API listening on port: ${port}`);
    }
};