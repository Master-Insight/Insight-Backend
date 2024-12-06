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
  .get('/',
    authMiddleware(), securityMiddleware(users), controller.get)
  .get('/id/:eid',
    authMiddleware(), securityMiddleware(users), controller.getById)
  .post('/',
    authMiddleware(), securityMiddleware(users), celebrate(validSchema.create), controller.create)
  .put('/id/:eid',
    authMiddleware(), securityMiddleware(users), controller.updateId)
  .delete('/id/:eid',
    authMiddleware(), securityMiddleware(users), controller.deleteId)

export default router