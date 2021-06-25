const routes = require('express').Router();

const userController = require('./app/Users/controllers/User_controller');
const authMiddleware = require('./app/middlewares/auth');

// user routes
routes.get('/users', userController.getAll);
routes.get('/users/:id', userController.findOne);
routes.post('/users', userController.create);


// user authentication route
routes.post('/users/login', userController.authenticate);


routes.use(authMiddleware);
// private routes ( must be authenticated to access )
routes.put('/users/:id', userController.update);
routes.delete('/users/:id', userController.delete);
routes.get('/dashboard', userController.dashboard);

module.exports = routes