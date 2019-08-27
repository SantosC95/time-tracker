import { Router } from "express"
const router = Router();
import { 
    createTask, 
    updateTask, 
    listTasks, 
    createRecord, 
    closeRecord, 
    listRecordsByTask, 
    deleteTaskById, 
    getOpenTasksByUser 
} from "../controllers/tasks"
import { isActiveSession, auth } from "../lib/middlewares/auth"
import { parsePagination, setSorting } from "../lib/middlewares/middlewares"
import { cacheClient as cache } from "../config/redis-config"

/** User routes */
router.route('/tasks')
    /** Create task */
    .post(auth, isActiveSession, createTask)
    /** Get tasks */
    .get(
        auth, 
        isActiveSession, 
        parsePagination, 
        setSorting, 
        listTasks
    )

/**
 * Modify/Update Task data and states
 */
router.route('/tasks/:id')
    .put(auth, isActiveSession, updateTask)
    .delete(auth, isActiveSession, deleteTaskById)

/** Records services */
router.post('/tasks/record', auth, isActiveSession, createRecord)
router.route('/tasks/record/:taskId')
    /** Close clock */
    .put(auth, isActiveSession, closeRecord)
    /** Get records by task */
    .get(auth, isActiveSession, setSorting, parsePagination, cache.route({ expire: 5 }), listRecordsByTask)

router.get('/tasks/open', auth, isActiveSession, getOpenTasksByUser)

export default router