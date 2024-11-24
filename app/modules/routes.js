import { Router } from "express";
import usersRouter from "../modules/users/api/routes.js";
import authRouter from "../modules/auth/api/routes.js";
import contributionsRouter from "../modules/contributions/api/routes.js";
import projectsRouter from "../modules/projects/api/routes.js";
import projectsCommentsRouter from "../modules/projects_comments/api/routes.js";
import projectsTaskRouter from "../modules/projects_task/api/routes.js";
import experiencesRouter from "../modules/experiences/api/routes.js";
import certificationsRouter from "../modules/certifications/api/routes.js";
import valuesRouter from "../modules/utils/routes.js";
import linkedinRouter from "../modules/linkedin/api/routes.js";

import AppError from "../../app/pkg/errors/AppError.js";

const router = Router()

// http://localhost:8080/

router.use('/v1/users/', usersRouter)
router.use('/v1/auth/', authRouter)
router.use('/v1/contributions/', contributionsRouter)
router.use('/v1/projects/', projectsRouter)
router.use('/v1/projects/comments/', projectsCommentsRouter)
router.use('/v1/projects/task/', projectsTaskRouter)

router.use('/v1/values/', valuesRouter)
router.use('/v1/experiences/', experiencesRouter)
router.use('/v1/certifications/', certificationsRouter)

router.use('/v1/linkedin/', linkedinRouter)
router.get('/v1/pruebas', async (req, res, next) => {res.send("Prueba Pruebas")});
router.all('*', (req, res, next) => { next(new AppError(`No se encuentra la url: ${req.originalUrl} en este servidor`, 404)); });


export default router