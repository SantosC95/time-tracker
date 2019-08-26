import { Router } from "express"
const router = Router();
import { createTask, updateTask, listTasks, createRecord, closeRecord, listRecordsByTask } from "../controllers/tasks"
import { isActiveSession, auth } from "../lib/middlewares/auth"
import { parsePagination, setSorting } from "../lib/middlewares/middlewares"

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
router.put('/tasks/:id', auth, isActiveSession, updateTask)

/** Records services */
router.post('/tasks/record', auth, isActiveSession, createRecord)
router.route('/tasks/record/:taskId')
    /** Close clock */
    .put(auth, isActiveSession, closeRecord)
    /** Get records by task */
    .get(auth, isActiveSession, setSorting, parsePagination, listRecordsByTask)


export default router