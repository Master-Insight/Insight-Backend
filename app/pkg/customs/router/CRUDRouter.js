import CustomRouter from './Router.js';

class CRUDRouter extends CustomRouter {
  constructor(controller, authMiddleware, roleMiddleware) {
    super();
    this.controller = controller;
    this.authMiddleware = authMiddleware;
    this.roleMiddleware = roleMiddleware;
    this.setCrudRoutes();
  }

  // Configurar rutas CRUD básicas
  setCrudRoutes() {
    this.addRoute('get', '/', [this.authMiddleware], this.controller.getAll); // GET all users
    this.addRoute('get', '/:id', [this.authMiddleware], this.controller.getById); // GET user by ID
    this.addRoute('post', '/', [this.authMiddleware, this.roleMiddleware('Admin')], this.controller.create); // POST new user
    this.addRoute('put', '/:id', [this.authMiddleware, this.roleMiddleware('Admin')], this.controller.update); // PUT update user
    this.addRoute('delete', '/:id', [this.authMiddleware, this.roleMiddleware('Admin')], this.controller.delete); // DELETE user
  }
}

export default CRUDRouter;
