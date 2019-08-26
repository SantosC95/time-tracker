import { Router } from "express"
const router = Router();
import { createUser, login, logout, getUsers, updateUser } from "../controllers/user"
import uploadFile from "../lib/middlewares/multer"
import { isActiveSession, auth } from "../lib/middlewares/auth"
import { parsePagination, setSorting } from "../lib/middlewares/middlewares"

/** User routes */
router.route('/users')
    /** Create/register New User */
    .post(uploadFile.single('image'), createUser)
    /** Get users */
    .get(
        auth, 
        isActiveSession, 
        parsePagination, 
        setSorting, 
        getUsers
    )
    /** Editar información de usuario */
    .put(auth, isActiveSession, uploadFile.single('image'), updateUser)

/** Get token session */
router.route('/login')
    .post(login)

/** Delete session */
router.get('/logout', auth, isActiveSession, logout)

export default router