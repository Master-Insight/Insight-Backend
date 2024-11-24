import { Router } from "express";

import { LANGUAJES, PROFESSIONS, FRAMEWORKS, LINKSAPPS, PROJECT_STATUS, PROJECT_PRORITY } from "./valueList.js";
import { handleAuth, users } from "../../../app/pkg/middleware/handlePolicies.js";

const router = Router();

// http://localhost:8080/v1/values/

router
.get    ('/languajes',   handleAuth(users), (req, res) => res.sendSuccess(LANGUAJES))
.get    ('/professions', handleAuth(users), (req, res) => res.sendSuccess(PROFESSIONS))
.get    ('/frameworks', handleAuth(users), (req, res) => res.sendSuccess(FRAMEWORKS))
.get    ('/applinks', handleAuth(users), (req, res) => res.sendSuccess(LINKSAPPS))

.get    ('/projects/status', handleAuth(users), (req, res) => res.sendSuccess(PROJECT_STATUS))
.get    ('/projects/priority', handleAuth(users), (req, res) => res.sendSuccess(PROJECT_PRORITY))

export default router