import { Router } from "express";
import { uploader } from "../../../../app/pkg/middleware/multer.js";
import { authMiddleware } from "../../../pkg/middleware/auth.jwt.middleware.js";
import { admin, giveRole, securityMiddleware, users } from "../../../pkg/middleware/security.middleware.js";
import Controller from "./controller.js";

const controller = new Controller()
const router = Router();

// http://localhost:8080/v1/users/

router
  // * Public
  .get('/associates', controller.getPublicAssociates)
  .get('/associatesselective', controller.getPublicAssociatesLSelective)
  .get('/associate/:username', controller.getAssociate)

  // * User
  .get('/current', authMiddleware(), securityMiddleware(users), controller.getUserSession)
  .put('/current/update', authMiddleware(), securityMiddleware(users), controller.currentUpdate)
  .put('/current/uploadphoto',
    authMiddleware(), securityMiddleware(users),
    uploader(5, ['image/jpeg', 'image/jpg', 'image/png'], true).single('photo'),
    controller.uploadPhoto)

  // * Admins
  .get('/', authMiddleware(), securityMiddleware(admin), controller.get)


export default router;