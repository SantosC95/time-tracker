import __Promise__ from "bluebird"
import { client } from "../../config/redis-config"
import _ from "lodash"
import shortid from "shortid"
import { MaxSessionsError } from "../errors/error"
import moment from "moment"

/** Creates a session in redis | if another session exists, function deletes old sessions */
export const setSession = async ( userId, token, ip ) => {
    const key = `ss:${userId}:${shortid.generate()}`;
    const payload = _.pickBy({
        key,
        token, 
        createdAt: moment().unix(),
        ip 
    }, _.identity);
    await client.hmsetAsync(key, payload);
    return client.expire(key, 60*60*2);
}

/** Delete sessions */
export const deleteSession = ( key ) => client.delAsync(key)

/** Get all sessions by user */
export const getAllSessions = async ( userId ) => {
    const pattern = `ss:${userId}:*`;
    const sessions = await client.keysAsync(pattern);
    return __Promise__.all(sessions.map(key => client.hgetallAsync(key)));
}

/** Check User sessions */
export const checkUserSessions = async ( userId ) => {
    const pattern = `ss:${userId}:*`;
    const sessions = await client.keysAsync(pattern);
    const num_sessions = Object.keys(sessions).length;

    if (num_sessions >= 5) {
        throw new MaxSessionsError(
            null,
            await __Promise__.all(sessions.map(key => client.hgetallAsync(key)))
        )
    }

    return
}