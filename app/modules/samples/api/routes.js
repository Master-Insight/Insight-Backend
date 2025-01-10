import { Router } from "express";
import Controller from "./controller.js";
import { authMiddleware } from "../../../pkg/middleware/auth.jwt.middleware.js";
import { users, securityMiddleware, admin, isPublic } from "../../../pkg/middleware/security.middleware.js";
import { validateCreateSample } from "./validation.js";
import { validateUpdateSample } from "./validation.js";

const router = Router();
const controller = new Controller()

// http://localhost:8080/v1/samples/

// sesions
router
  .get('/',
    securityMiddleware(isPublic), controller.get)
  .get('/:slug',
    securityMiddleware(isPublic), controller.getBySlug)
  .post('/',
    authMiddleware(), securityMiddleware(admin), validateCreateSample, controller.create)
  .put('/:eid',
    authMiddleware(), securityMiddleware(admin), validateUpdateSample, controller.updateId)
  .delete('/:eid',
    authMiddleware(), securityMiddleware(admin), controller.deleteId)

export default router