import { Router } from "express";
import Controller from "./controller.js";
import { handleAuth, users } from "../../../../app/pkg/middleware/handlePolicies.js";
import validSchema from "./validation.js";
import { celebrate } from "celebrate";

const router = Router();
const controller = new Controller()

// http://localhost:8080/v1/projects/

// sesions
router
  .get('/task/', handleAuth(users), controller.get)
  .get('/task/:eid', handleAuth(users), controller.getById)
  .get('/:eid/task/', handleAuth(users), controller.getByProjectId)
  .post('/task/', handleAuth(users), celebrate(validSchema.create), controller.create)
  .put('/task/:eid', handleAuth(users), controller.updateId)
  .delete('/task/:eid', handleAuth(users), controller.deleteId)

export default router