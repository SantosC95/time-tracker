import mongoose from "../index"
import bcrypt from "bcryptjs"
import { validateEmail, validatePhone } from "../../lib/utils/utils"
import { s3_baseURL } from "../../config/index"
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    email: {
        type: String,
        required: [ true, 'Please provide a valid email address' ],
        unique: true,
        trim: true,
        validate: {
            validator: validateEmail,
            message: () => 'Please provide a valid email address'
        }
    },
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        trim: true
    },
    lastname: {
        type: String,
        required: [true, 'Please provide a lastname'],
        trim: true
    },
    /** Outside validation */
    password_hash: {
        type: String,
        require: [ true, 'Please provide a password' ]
    },
    /** Non-required */
    img_key: {
        type: String,
        trim: true
    },
    phone: {
        type: String,
        trim: true,
        validate: {
            validator: validatePhone,
            message: () => 'Please provide a valid phone number (without spaces or any other special character)'
        }
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
})

UserSchema.methods = {
    validatePassword (password) {
        return bcrypt.compare(password, this.password_hash)
    },
    async generateHash (password) {
        this.password_hash = await bcrypt.hash(password, 10)
    },
    getPublicFields () {
        return {
            name: this.name,
            lastname: this.lastname,
            email: this.email,
            phone: this.phone,
            img_key: this.img_key,
            _id: this._id
        }
    }
}

UserSchema.virtual('full_name').get(function () {
    return this.name + " " + this.lastname
});

UserSchema.virtual('photo_url').get(function () {
    if (this.img_key)
        return this.socialUser ? this.img_key :`${s3_baseURL}${this.img_key}`
});

UserSchema.index({ name: "text", lastname: "text" })

const __Model__ = mongoose.model('User', UserSchema, 'users'); 
export default __Model__