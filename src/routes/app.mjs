import { Router } from "express";
import usersRouter from "./users_routes.mjs"

const router = Router()

router.use(usersRouter)

export default router