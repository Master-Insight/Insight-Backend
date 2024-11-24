import CustomRouter from './Router.js';

class CRUDRouter extends CustomRouter {
  constructor(controller, authMiddleware, roleMiddleware, roles) {
    super();
    this.controller = controller;
    this.authMiddleware = authMiddleware;
    this.roleMiddleware = roleMiddleware;
    this.setCrudRoutes();
  }

  // Configurar rutas CRUD básicas
  setCrudRoutes() {
    this.addRoute('get', '/', [this.authMiddleware, this.roleMiddleware(roles)], this.controller.getAll); // GET all users
    this.addRoute('get', '/:id', [this.authMiddleware, this.roleMiddleware(roles)], this.controller.getById); // GET user by ID
    this.addRoute('post', '/', [this.authMiddleware, this.roleMiddleware(roles)], this.controller.create); // POST new user
    this.addRoute('put', '/:id', [this.authMiddleware, this.roleMiddleware(roles)], this.controller.update); // PUT update user
    this.addRoute('delete', '/:id', [this.authMiddleware, this.roleMiddleware(roles)], this.controller.delete); // DELETE user
  }
}

export default CRUDRouter;


// import CRUDRouter from '../utils/CRUDRouter.js';
// import UserController from '../controllers/UserController.js';
// import { authMiddleware, roleMiddleware } from '../middleware/auth.js';

// class UserRouter extends CRUDRouter {
//   constructor() {
//     super(UserController, authMiddleware, roleMiddleware, roles);
//   }
// }

// export default new UserRouter().getRouter();
