import { Router } from "express";
import { handleAuth } from "../../../../app/pkg/middleware/handlePolicies.js";
import { uploader } from "../../../../app/pkg/middleware/multer.js";
import { authMiddleware } from "../../../pkg/middleware/auth.jwt.middleware.js";
import { users } from "../../../pkg/middleware/security.middleware.js";
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
.get('/current', authMiddleware(users), controller.getUserSession)
.put('/current/update', handleAuth(users), controller.currentUpdate)
.put('/current/uploadphoto', 
  handleAuth(users),
  uploader(5, ['image/jpeg', 'image/jpg', 'image/png'], true).single('photo') ,
  controller.uploadPhoto)

    // * Admins
    .get('/', handleAuth(['ADMIN']), controller.get)


export default router;