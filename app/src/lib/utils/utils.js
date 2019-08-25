/**
 * Some useful functions
 */
import jwt from "jsonwebtoken"
import { token_secret as secret } from '../../config'
import { InvalidTokenError } from '../errors/error'
import uuid from "uuid/v4"
import path from "path"

/** Validate password format */
const validatePassword = ( password ) => {
    const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6,60}$/;
    return passRegex.test(password);
}


/** Generate access tokens */
const generateAccessToken = ( userId, expiresIn ) => {
    return jwt.sign(
        { userId }, 
        secret, 
        { expiresIn }
    )
}

/** Decode access tokens */
const decodeAccessToken = ( token ) => {
    try {
        return jwt.verify(token, secret)
    } catch (error) {
        throw new InvalidTokenError()
    }
}

/** Validate e-mail format */
const validateEmail = ( email ) => {
    const regex = /^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/;
    return regex.test(email);
}

/** Send error response */
const sendErrorResponse = ( response, error ) => {
    response
        .status(error.status || 500)
        .json({
            error: true,
            message: error.message || 'Error. Try again later.',
            details: error.details
        })
}

/** Validate phone */
const validatePhone = ( phone ) => {
    const regex = /^\d{7,10}$/
    return regex.test(phone)
}

/** Generate key for image */
const generateS3Key = ( file ) => {
    return `users/${uuid()}/${path.basename(file.path)}`
}


export {
    validateEmail,
    validatePassword,
    generateAccessToken,
    decodeAccessToken,
    sendErrorResponse,
    validatePhone,
    generateS3Key
}