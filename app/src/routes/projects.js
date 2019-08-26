import { Router } from "express"
const router = Router();
import { createProject, listProjects, updateProject } from "../controllers/projects"
import { isActiveSession, auth } from "../lib/middlewares/auth"
import { parsePagination, setSorting } from "../lib/middlewares/middlewares"

/** User routes */
router.route('/projects')
    /** Create/register New Project */
    .post(auth, isActiveSession, createProject)
    /** Get projects */
    .get(
        auth, 
        isActiveSession, 
        parsePagination, 
        setSorting, 
        listProjects
    )

/** Update/Modify project's data */
router.put('/projects/:id', auth, isActiveSession, updateProject)

export default router