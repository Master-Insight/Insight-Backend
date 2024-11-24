import { Router } from 'express';

class CustomRouter {
  constructor() {
    this.router = Router();
  }

  // Método para añadir una ruta con middlewares opcionales
  addRoute(method, path, middlewares = [], handler) {
    this.router[method](path, ...middlewares, handler);
  }

  // Obtener el router configurado
  getRouter() {
    return this.router;
  }
}

export default CustomRouter;

// import CustomRouter from '../utils/CustomRouter.js';
// import UserController from '../controllers/UserController.js'; // Controlador de usuarios con la lógica CRUD
// import { authMiddleware, roleMiddleware } from '../middleware/auth.js'; // Ejemplo de middleware de autenticación

// class UserRouter extends CustomRouter {
//   constructor() {
//     super();
//     this.addRoute('get', '/', [authMiddleware], UserController.getAllUsers);
//     this.addRoute('get', '/:id', [authMiddleware], UserController.getUserById);
//     this.addRoute('post', '/', [authMiddleware, roleMiddleware('Admin')], UserController.createUser);
//     this.addRoute('put', '/:id', [authMiddleware, roleMiddleware('Admin')], UserController.updateUser);
//     this.addRoute('delete', '/:id', [authMiddleware, roleMiddleware('Admin')], UserController.deleteUser);
//   }
// }

// export default new UserRouter().getRouter();