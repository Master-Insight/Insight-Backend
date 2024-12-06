import { Router } from "express";
import Controller from "./controller.js";
import validSchema from "./validation.js";
import { celebrate } from "celebrate";
import { admin, users, securityMiddleware } from "../../../pkg/middleware/security.middleware.js";
import { authMiddleware } from "../../../pkg/middleware/auth.jwt.middleware.js";

const router = Router();
const controller = new Controller()

// http://localhost:8080/v1/projects/tasks/

// sesions
router
  .get('/comments',
    authMiddleware(), securityMiddleware(admin), controller.get)
  .get('/:tid/comments',
    authMiddleware(), securityMiddleware(users), celebrate(validSchema.get), controller.get)
  .get('/:tid/comments/:eid',
    authMiddleware(), securityMiddleware(users), celebrate(validSchema.getById), controller.getById)
  .post('/:tid/comments/',
    authMiddleware(), securityMiddleware(users), celebrate(validSchema.create), controller.create)
  .put('/comments/:eid',
    authMiddleware(), securityMiddleware(users), celebrate(validSchema.updateId), controller.updateId)
  .delete('/comments/:eid',
    authMiddleware(), securityMiddleware(users), celebrate(validSchema.deleteId), controller.deleteId)

export default router