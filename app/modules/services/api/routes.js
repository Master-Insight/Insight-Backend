import { Router } from "express";
import Controller from "./controller.js";
import { authMiddleware } from "../../../pkg/middleware/auth.jwt.middleware.js";
import { users, securityMiddleware } from "../../../pkg/middleware/security.middleware.js";
import { validateCreateService } from "./validation.js";
import { validateUpdateService } from "./validation.js";

const router = Router();
const controller = new Controller()

// http://localhost:8080/v1/services/

// sesions
router
  .get('/',
    authMiddleware(), securityMiddleware(users), controller.get)
  .get('/:eid',
    authMiddleware(), securityMiddleware(users), controller.getById)
  .post('/',
    authMiddleware(), securityMiddleware(users), validateCreateService, controller.create)
  .put('/:eid',
    authMiddleware(), securityMiddleware(users), validateUpdateService, controller.updateId)
  .delete('/:eid',
    authMiddleware(), securityMiddleware(users), controller.deleteId)

export default router