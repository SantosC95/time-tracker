import { InvalidTokenError } from "../errors/error"
import { sendErrorResponse, decodeAccessToken } from "../utils/utils"
import { getAllSessions } from "../services/redis-services"
import __ from "lodash"

export const auth = async ( req, res, next ) => {
    try {
        if (!req.headers.authorization) {
            throw new InvalidTokenError()
        }

        /** Decode token and get access type */
        const token = req.headers.authorization.split(" ")[1];
        const decoded = await decodeAccessToken(token);

        req.user = { _id: decoded.userId };
        req.token = token;
        next();
    } catch (error) {
        sendErrorResponse(res, error)
    }
}

/** Is there a active session? */
export const isActiveSession = async ( req, res, next ) => {
    try {
        const data = await getAllSessions(req.user._id);
        const _session = __.find(data, { token: req.token });
    
        if (!_session) {
            throw new InvalidTokenError()
        }
    
        req.session = _session.key;
        next();
    } catch (error) {
        sendErrorResponse(res, error)
    }
}