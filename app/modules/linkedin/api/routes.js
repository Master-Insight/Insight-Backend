import { Router } from "express";
import Controller from "./controller.js";
import { handleAuth, users } from "../../../pkg/middleware/handlePolicies.js";

const router = Router();
const controller = new Controller()

// http://localhost:8080/v1/linkedin/
//http://localhost:8080/v1/linkedin/auth
// sesions
router
.get   ('/auth',          controller.autorize)
.get   ('/auth/callback', controller.redirect)
.get   ('/profile',       handleAuth(users), controller.profile) // no permitido actualmente por linkedin

export default router