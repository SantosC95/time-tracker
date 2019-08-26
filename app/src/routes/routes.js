import { Router } from "express"
import UserRoutes from "./user"
import ProjectRoutes from "./projects"
import TaskRoutes from "./tasks"
const router = Router();

/** Test API v1.0 */
router.get('/ping', ( req, res ) => {
    return res
        .status(200)
        .json({ 
            message: "Pong. API v1.0 está funcionando!",
            requestIp: req.ip 
        })
})

/** Register API routes */
router.use(UserRoutes, ProjectRoutes, TaskRoutes)

export default router