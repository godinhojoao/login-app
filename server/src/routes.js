const routes = require('express').Router();

const userController = require('./app/Users/controllers/User_controller');
const authMiddleware = require('./app/middlewares/auth');
const validateUrlMiddleware = require('./app/middlewares/validateUrl');

// user routes
routes.post('/users', userController.create);

// user authentication route
routes.post('/users/login', userController.authenticate);

// middleware to create private routes ( must be authenticated to access )
routes.use(authMiddleware);

routes.get('/users', userController.getAll);

routes.use('/users/:id', validateUrlMiddleware); // middleware to validate param 'id'

routes.get('/users/:id', userController.findOne);
routes.put('/users/:id', userController.update);
routes.delete('/users/:id', userController.delete);

routes.use((req, res, next) => {
  return res.status(404).json({ "error": "Resultado não encontrado." });
});

module.exports = routes