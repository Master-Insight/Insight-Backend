import { Router } from "express";
import Controller from "./controller.js";
import { handleAuth, users } from "../../../../app/pkg/middleware/handlePolicies.js";
import validSchema from "./validation.js";
import { celebrate } from "celebrate";

const router = Router();
const controller = new Controller()

// http://localhost:8080/v1/projects/tasks/

// sesions
router
.get   ('/comments',       handleAuth('admin'), controller.get)
.get   ('/:tid/comments',       handleAuth('admin'), controller.get)
.get   ('/:tid/comments/:eid',   handleAuth(users), controller.getById)
.post  ('/:tid/comments/',       handleAuth(users), controller.create)
.put   ('/comments/:eid',   handleAuth(users), controller.updateId)
.delete('/comments/:eid',   handleAuth(users), controller.deleteId)

export default router