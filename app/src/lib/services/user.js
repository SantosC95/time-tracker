import User from "../../mongo/models/user"
import { 
    UserCreationError, 
    InvalidPassword, 
    DuplicateEmailError, 
    UserNotFoundError,
    InvalidCredentialsError
} from "../errors/error"
import { saveImage, deleteImage } from "../services/s3"
import fs from "fs-extra"
import { validatePassword, generateS3Key } from "../utils/utils"
import __ from "lodash"

export const saveNewUser = async ( data, file ) => {
    let user = new User(data)
    /** Validate data */
    if (!validatePassword(data.password)) {
        throw new InvalidPassword()
    }
    
    /** Check duplicates */
    const count = await User.countDocuments({ email: data.email })
    if (count > 0) {
        throw new DuplicateEmailError()
    }

    const data_error = user.validateSync();
    if (data_error) {
        throw new UserCreationError(null, data_error.errors)
    }

    if (!__.isEmpty(file)) {
        const key = generateS3Key(file)
        await saveImage(file.path, key)
        await fs.remove(file.path)
        user.img_key = key
    } 

    await user.generateHash(data.password)
    return user.save()
}

export const validateCredentials = async ( credentials ) => {
    const { email, password } = credentials

    const user = await User.findOne({ email })
    if (!user) {
        throw new UserNotFoundError()
    }

    if (!await user.validatePassword(password)) {
        throw new InvalidCredentialsError()
    }

    return user
}   

export const queryForUsers = async ( options ) => {
    const { 
        sortBy, 
        pagination, 
        query, 
        requestUser: user
    } = options

    let q = {}
    if (query.search) {
        q.$text = {
            $search: query.search
        }
    }

    if (query.users === "me") {
        q._id = user._id
    }

    const [ data, totalMatches ] = await Promise.all([
        User.find(q)
            .skip(pagination.from)
            .limit(pagination.size)
            .select('-__v -password_hash')
            .collation({
                locale: 'en_US',
                strength: 1,
                caseLevel: true
            })
            .sort(sortBy || '-createdAt'),

        User.find(q)
            .countDocuments()
    ])
    
    return {
        data,
        totalMatches
    }
}

export const updateUserData = async ( userId, data, file ) => {
    const user = await User.findById(userId)
    if (!user) {
        throw new UserNotFoundError()
    }

    /** Check duplicates */
    const count = await User.countDocuments({ 
        email: data.email, 
        _id: { $ne: userId }
    })

    if (count > 0) {
        throw new DuplicateEmailError()
    }

    __.merge(user, data)

    const data_error = user.validateSync();
    if (data_error) {
        throw new UserCreationError(null, data_error.errors)
    }

    if (!__.isEmpty(file)) {
        const key = generateS3Key(file)
        await saveImage(file.path, key)
        await fs.remove(file.path)
        if (typeof user.img_key === "string") {
            await deleteImage(user.img_key)
        }
        user.img_key = key
    }     

    return user.save()
}