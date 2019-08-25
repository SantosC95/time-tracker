import { saveNewUser, validateCredentials, queryForUsers, updateUserData } from "../lib/services/user"
import { sendErrorResponse, generateAccessToken } from "../lib/utils/utils"
import { checkUserSessions, setSession, getAllSessions, deleteSession } from "../lib/services/redis-services"
import __ from "lodash"

/** User creation handler */
export const createUser = async ( req, res ) => {
    try {
        const data = {...req.body}
        const file = {...req.file}
        /** Save user data */
        const user = await saveNewUser(data, file)
        const token = await generateAccessToken(user._id.toString(), "2 hours")
        await setSession(user._id.toString(), token, req.ip)
        return res.status(200).json({ error: false, user, token })
    } catch (error) {
        sendErrorResponse(res, error)
    }
}

/** Get users */
export const getUsers = async ( req, res ) => {
    try {
        const sortBy = req.sortBy
        const pagination = req.pagination
        const query = req.paramsObj
        const { data, totalMatches } = await queryForUsers(query, pagination, sortBy)
        return res.status(200).json({
            error: false,
            data,
            totalMatches
        })
    } catch (error) {
        sendErrorResponse(res, error)
    }
}

/** Edit user information */
export const updateUser = async ( req, res ) => {
    try {
        const data = {...req.body}
        const file = {...req.file}
        const user = await updateUserData(req.user._id, data, file)
        return res.status(200).json({
            error: false,
            user,
        })
    } catch (error) {
        sendErrorResponse(res, error)
    }
}

/** Get session token */
export const login = async ( req, res ) => {
    try {
        const data = {...req.body}
        const user = await validateCredentials(data)
        const token = await generateAccessToken(String(user._id), "2 hours")
        await checkUserSessions(user._id.toString())
        await setSession(user._id.toString(), token, req.ip)
        return res.status(200).json({
            error: false,
            user,
            token
        })
    } catch (error) {
        sendErrorResponse(res, error)
    }
}

/** Delete session */
export const logout = async ( req, res ) => {
    try {
        const user = req.user;
        const token = req.token;
        const data = await getAllSessions(user._id);
        const _session = __.find(data, { token });
        if (_session) {
            await deleteSession(_session.key);
        }
        return res.status(200).json({ error: false, message: "Successfull logout" })
    } catch (error) {
        sendErrorResponse(res, error)
    }
}