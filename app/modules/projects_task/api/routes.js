import { Router } from "express";
import Controller from "./controller.js";
import validSchema from "./validation.js";
import { celebrate } from "celebrate";
import { authMiddleware } from "../../../pkg/middleware/auth.jwt.middleware.js";
import { users, securityMiddleware } from "../../../pkg/middleware/security.middleware.js";

const router = Router();
const controller = new Controller()

// http://localhost:8080/v1/projects/

// sesions
router
  .get('/task/',
    authMiddleware(), securityMiddleware(users), controller.get)
  .get('/task/:eid',
    authMiddleware(), securityMiddleware(users), controller.getById)
  .get('/:eid/task/',
    authMiddleware(), securityMiddleware(users), controller.getByProjectId)
  .post('/task/',
    authMiddleware(), securityMiddleware(users), celebrate(validSchema.create), controller.create)
  .put('/task/:eid',
    authMiddleware(), securityMiddleware(users), controller.updateId)
  .delete('/task/:eid',
    authMiddleware(), securityMiddleware(users), controller.deleteId)

export default router